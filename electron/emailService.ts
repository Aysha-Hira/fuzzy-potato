import { ipcMain } from "electron";
import { ImapFlow, SearchObject } from "imapflow";
import { Attachment, simpleParser } from "mailparser";
import nodemailer from "nodemailer";
import type { Email } from "./types/email";
import type { EmailAttachment } from "./types/emailAttachments";

interface EmailAccount {
  email: string;
  password: string; // App password
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
}

class EmailService {
  private clients: Map<
    string,
    { imap: ImapFlow; smtp: nodemailer.Transporter }
  > = new Map();

  async connectAccount(account: EmailAccount): Promise<boolean> {
    try {
      // Create IMAP client
      const imap = new ImapFlow({
        host: account.imapHost,
        port: account.imapPort,
        secure: true,
        auth: {
          user: account.email,
          pass: account.password,
        },
        logger: false, // Set to true for debugging
      });

      // Create SMTP transporter
      const smtp = nodemailer.createTransport({
        host: account.smtpHost,
        port: account.smtpPort,
        secure: account.smtpPort === 465,
        auth: {
          user: account.email,
          pass: account.password,
        },
      });

      // Connect to IMAP
      await imap.connect();
      console.log(`✅ Connected to ${account.email}`);

      this.clients.set(account.email, { imap, smtp });
      return true;
    } catch (error) {
      console.error(`❌ Failed to connect:`, error);
      throw error;
    }
  }

  async fetchEmails(
    accountEmail: string,
    folder: string = "INBOX",
    limit: number = 50,
  ): Promise<Email[]> {
    console.log();
    console.log(`${accountEmail} \t ${folder} \t ${limit}`);
    console.log();
    console.log(`📧 fetchEmails called for ${accountEmail} in ${folder}`);

    const client = this.clients.get(accountEmail);
    if (!client) {
      console.error(`❌ No client found for ${accountEmail}`);
      console.log("Available clients:", Array.from(this.clients.keys()));
      throw new Error(`Account not connected: ${accountEmail}`);
    }

    const { imap } = client;
    const emails: Email[] = [];

    try {
      console.log(`📧 Getting mailbox lock for ${folder}...`);
      const lock = await imap.getMailboxLock(folder);

      try {
        const mailbox = imap.mailbox;
        console.log(
          `📧 Mailbox exists: ${mailbox ? mailbox.exists : 0} messages`,
        );

        if (!mailbox || mailbox.exists === 0) {
          console.log("📧 No messages in mailbox");
          return [];
        }

        const start = Math.max(1, mailbox.exists - limit + 1);
        const range = `${start}:*` as const;
        console.log(`📧 Fetching range: ${range}`);

        let messageCount = 0;
        for await (const message of imap.fetch(range, {
          uid: true,
          flags: true,
          envelope: true,
          bodyParts: [""],
          source: true,
        })) {
          messageCount++;
          console.log(`📧 Processing message ${messageCount}...`);

          try {
            if (!message.source) {
              console.warn("📧 Message has no source, skipping");
              continue;
            }

            const parsed = await simpleParser(message.source);
            const senderName = parsed.from?.text || "Unknown";
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(senderName)}&background=random&length=2`;
            const flags = message.flags ? Array.from(message.flags) : [];

            const email: Email = {
              id: message.uid,
              avatar: avatarUrl,
              subject: parsed.subject || "(No Subject)",
              sender: senderName,
              recipient: parsed.to
                ? Array.isArray(parsed.to)
                  ? parsed.to.map((v) => v.text || "")
                  : parsed.to.value.map((v) => v.address || "")
                : [],
              message: parsed.text || parsed.html || "",
              time: parsed.date || new Date(),
              threadCount: 1,
              labels: [folder],
              attachments:
                parsed.attachments?.map(
                  (att: Attachment): EmailAttachment => ({
                    filename: att.filename || "unnamed",
                    contentType: att.contentType || "application/octet-stream",
                    size: att.size || 0,
                    partId: att.contentId || "",
                  }),
                ) || [],
              category: folder,
              isRead: !flags.includes("\\Seen"),
              isStarred: flags.includes("\\Flagged"),
              isImportant: flags.includes("\\Important") || false,
              isDraft: folder.toLowerCase().includes("draft"),
              isDeleted:
                folder.toLowerCase().includes("trash") ||
                folder.toLowerCase().includes("bin") ||
                flags.includes("\\Deleted"),
            };

             console.log(email);
            emails.push(email);
           
          } catch (parseError) {
            console.error("📧 Error parsing email:", parseError);
          }
        }

        console.log(`📧 Successfully fetched ${emails.length} emails`);
      } finally {
        await lock.release();
        console.log("📧 Mailbox lock released");
      }
    } catch (error) {
      console.error("📧 Error fetching emails:", error);
      throw error;
    }

    return emails;
  }

  async searchEmails(
    accountEmail: string,
    criteria: SearchObject,
    folder: string = "INBOX",
  ): Promise<Email[]> {
    const client = this.clients.get(accountEmail);
    if (!client) throw new Error("Account (searchEmails) not connected");

    const { imap } = client;
    const emails: Email[] = [];

    const lock = await imap.getMailboxLock(folder);
    try {
      // Search for messages - handle possible false return
      const searchResult = await imap.search(criteria);
      const uids = Array.isArray(searchResult) ? searchResult : [];

      if (uids.length === 0) return [];

      // Fetch found messages
      for await (const message of imap.fetch(uids, {
        uid: true,
        flags: true,
        envelope: true,
        bodyParts: [""],
        source: true,
      })) {
        try {
          if (!message.source) {
            console.warn("Message has no source, skipping");
            continue;
          }

          const parsed = await simpleParser(message.source);

          // Generate avatar
          const senderName = parsed.from?.text || "Unknown";
          const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(senderName)}&background=random&length=2`;

          // Handle flags safely
          const flags = message.flags ? Array.from(message.flags) : [];

          const email: Email = {
            id: message.uid,
            avatar: avatarUrl,
            subject: parsed.subject || "(No Subject)",
            sender: senderName,
            recipient: parsed.to
              ? Array.isArray(parsed.to)
                ? parsed.to.map((v) => v.text || "")
                : parsed.to.value.map((v) => v.address || "")
              : [],
            message: parsed.text || parsed.html || "",
            time: parsed.date || new Date(),
            threadCount: 1,
            labels: [folder],
            attachments:
              parsed.attachments?.map(
                (att: Attachment): EmailAttachment => ({
                  filename: att.filename || "unnamed",
                  contentType: att.contentType || "application/octet-stream",
                  size: att.size || 0,
                  partId: att.contentId || "",
                }),
              ) || [],
            category: folder,
            isRead: !flags.includes("\\Seen"),
            isStarred: flags.includes("\\Flagged"),
            isImportant: flags.includes("\\Important") || false,
            isDraft: folder.toLowerCase().includes("draft"),
            isDeleted:
              folder.toLowerCase().includes("trash") ||
              folder.toLowerCase().includes("bin") ||
              flags.includes("\\Deleted"),
          };

          emails.push(email);
        } catch (parseError) {
          console.error("Error parsing email:", parseError);
        }
      }
    } catch (error) {
      console.error("Error searching emails:", error);
      throw error;
    } finally {
      await lock.release();
    }

    return emails;
  }

  async sendEmail(
    accountEmail: string,
    to: string[],
    subject: string,
    body: string,
    html?: string,
  ) {
    const client = this.clients.get(accountEmail);
    if (!client) throw new Error("Account (sendEmail) not connected");

    const { smtp } = client;
    return await smtp.sendMail({
      from: accountEmail,
      to: to.join(", "),
      subject,
      text: body,
      html: html || body,
    });
  }

  async disconnectAccount(accountEmail: string) {
    const client = this.clients.get(accountEmail);
    if (client) {
      await client.imap.logout();
      client.smtp.close();
      this.clients.delete(accountEmail);
    }
  }

  async listFolders(accountEmail: string): Promise<string[]> {
    const client = this.clients.get(accountEmail);
    if (!client) throw new Error("Account (listFolders) not connected");

    const { imap } = client;
    const folders = await imap.list();
    return folders.map((f) => f.path);
  }
}

const emailService = new EmailService();

// IPC Handlers
ipcMain.handle("email:connect", async (event, account) => {
  console.log("🔵 email:connect handler started");
  console.log("🔵 Account received:", account);

  try {
    console.log("🔵 Attempting to connect to:", account.email);
    console.log("🔵 IMAP Host:", account.imapHost);
    console.log("🔵 IMAP Port:", account.imapPort);

    const result = await emailService.connectAccount(account);
    console.log(result);

    console.log("✅ Connection successful for:", account.email);
    return { success: true };
  } catch (error) {
    console.error("❌ Connection failed:", error);
    console.error("❌ Error details:", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: (error as Error).message || "Unknown error occurred",
    };
  }
});

ipcMain.handle("email:fetch", async (event, accountEmail, folder, limit) => {
  try {
    const emails = await emailService.fetchEmails(accountEmail, folder, limit);
    return { success: true, emails };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle(
  "email:search",
  async (event, accountEmail, criteria, folder) => {
    try {
      const emails = await emailService.searchEmails(
        accountEmail,
        criteria,
        folder,
      );
      return { success: true, emails };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  },
);

ipcMain.handle(
  "email:send",
  async (event, accountEmail, to, subject, body, html) => {
    try {
      const result = await emailService.sendEmail(
        accountEmail,
        to,
        subject,
        body,
        html,
      );
      return { success: true, messageId: result.messageId };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  },
);

ipcMain.handle("email:disconnect", async (event, accountEmail) => {
  try {
    await emailService.disconnectAccount(accountEmail);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle("email:folders", async (event, accountEmail) => {
  try {
    const folders = await emailService.listFolders(accountEmail);
    return { success: true, folders };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

export { emailService };
