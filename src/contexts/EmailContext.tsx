import React, { createContext, useCallback, useContext, useState } from "react";
import type { Email } from "../types/email";

// Define proper types
interface EmailAccount {
  email: string;
  password: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
}

type SearchCriteria = Record<string, unknown>;

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface EmailContextType {
  connectedAccount: string | null;
  emails: Email[];
  folders: string[];
  currentFolder: string;
  loading: boolean;
  error: string | null;
  connectAccount: (account: EmailAccount) => Promise<boolean>;
  fetchEmails: (folder?: string) => Promise<void>;
  searchEmails: (criteria: SearchCriteria) => Promise<void>;
  sendEmail: (
    to: string[],
    subject: string,
    body: string,
    html?: string,
  ) => Promise<SendEmailResult>;
  disconnect: () => Promise<void>;
  setCurrentFolder: (folder: string) => void;
  markAsRead: (emailId: number) => void;
  toggleStar: (emailId: number) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

/* eslint-disable react-refresh/only-export-components */
export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) throw new Error("useEmail must be used within EmailProvider");
  return context;
};

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [folders, setFolders] = useState<string[]>([
    "INBOX",
    "Sent",
    "Drafts",
    "Trash",
  ]);
  const [currentFolder, setCurrentFolder] = useState("INBOX");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define fetchEmails first since it's used in connectAccount
  const fetchEmails = useCallback(
    async (folder: string = currentFolder, email?: string) => {
      const account = email || connectedAccount;
      if (!account) return;

      setLoading(true);
      setError(null);
      try {
        const result = await window.electron.email.fetch(account, folder, 50);
        if (result.success) {
          setEmails(result.emails || []);
        } else {
          setError(result.error || "Failed to fetch emails");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [connectedAccount, currentFolder], // Dependencies for fetchEmails
  );

//  Connects the acccount and fetches folders and initial emails
  const connectAccount = useCallback(async (account: EmailAccount) => {
    console.log("📞 connectAccount called with:", account.email);
    setLoading(true);
    setError(null);

    try {
      console.log("📞 Calling electron.email.connect...");
      const result = await window.electron.email.connect(account);
      console.log("📞 connectAccount result:", result);

      if (result.success) {
        console.log("📞 Setting connectedAccount to:", account.email);
        setConnectedAccount(account.email); // Make sure this is being called!

        // Fetch folders
        console.log("📞 Fetching folders...");
        const foldersResult = await window.electron.email.folders(
          account.email,
        );
        if (foldersResult.success && foldersResult.folders) {
          console.log("📞 Folders received:", foldersResult.folders);
          setFolders(foldersResult.folders);
        }

        // Fetch initial emails
        console.log("📞 Fetching initial emails...");
        const emailsResult = await window.electron.email.fetch(
          account.email,
          "INBOX",
          50,
        );
        if (emailsResult.success && emailsResult.emails) {
          console.log(`📞 Received ${emailsResult.emails.length} emails`);
          setEmails(emailsResult.emails);
        }

        return true;
      } else {
        console.log("📞 Connection failed:", result.error);
        setError(result.error || "Failed to connect");
        return false;
      }
    } catch (err) {
      console.error("📞 Error:", err);
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []); // Remove dependencies if any

  const searchEmails = useCallback(
    async (criteria: SearchCriteria) => {
      if (!connectedAccount) return;

      setLoading(true);
      setError(null);
      try {
        const result = await window.electron.email.search(
          connectedAccount,
          criteria,
          currentFolder,
        );
        if (result.success) {
          setEmails(result.emails || []);
        } else {
          setError(result.error || "Search failed");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [connectedAccount, currentFolder],
  );

  const sendEmail = useCallback(
    async (to: string[], subject: string, body: string, html?: string) => {
      if (!connectedAccount) throw new Error("No account connected");

      setLoading(true);
      setError(null);
      try {
        const result = await window.electron.email.send(
          connectedAccount,
          to,
          subject,
          body,
          html,
        );
        if (result.success) {
          // Refresh sent folder
          await fetchEmails("Sent");
          return { success: true, messageId: result.messageId };
        } else {
          setError(result.error || "Failed to send email");
          return { success: false, error: result.error };
        }
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [connectedAccount, fetchEmails],
  );

  const disconnect = useCallback(async () => {
    if (!connectedAccount) return;

    setLoading(true);
    try {
      await window.electron.email.disconnect(connectedAccount);
      setConnectedAccount(null);
      setEmails([]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [connectedAccount]);

  const markAsRead = useCallback((emailId: number) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === emailId ? { ...email, isRead: true } : email,
      ),
    );
    // TODO: Sync with server
  }, []);

  const toggleStar = useCallback((emailId: number) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === emailId
          ? { ...email, isStarred: !email.isStarred }
          : email,
      ),
    );
    // TODO: Sync with server
  }, []);

  return (
    <EmailContext.Provider
      value={{
        connectedAccount,
        emails,
        folders,
        currentFolder,
        loading,
        error,
        connectAccount,
        fetchEmails,
        searchEmails,
        sendEmail,
        disconnect,
        setCurrentFolder,
        markAsRead,
        toggleStar,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
