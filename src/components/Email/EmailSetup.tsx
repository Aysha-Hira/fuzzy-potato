import {
  M3Box,
  M3Button,
  M3List,
  M3ListItem,
  M3ListItemText,
  M3Paper,
  M3TextField,
  M3Typography,
} from "m3r";
import { useState } from "react";
import type { Email } from "../../types/email";

export function EmailSetup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connected, setConnected] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);

  const handleConnect = async () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim().replace(/\s+/g, ""); // Remove all whitespace from password
    // For Gmail:
    // imapHost: 'imap.gmail.com', imapPort: 993
    // smtpHost: 'smtp.gmail.com', smtpPort: 465 or 587
    const result = await window.electron.email.connect({
      email: cleanEmail,
      password: cleanPassword,
      imapHost: "imap.gmail.com",
      imapPort: 993,
      smtpHost: "smtp.gmail.com",
      smtpPort: 465,
    });

    if (result.success) {
      setConnected(true);
      // Fetch emails
      const fetchResult = await window.electron.email.fetch(
        cleanEmail,
        "INBOX",
        20,
      );
      if (fetchResult.success) {
        setEmails(fetchResult.emails || []);
      }
    }
  };

  return (
    <M3Paper sx={{ p: 3, m: 2 }}>
      <M3Typography variant="headlineSmall">Email Account Setup</M3Typography>

      {!connected ? (
        <M3Box sx={{ mt: 2 }}>
          <M3TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <M3TextField
            fullWidth
            label="App Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <M3Button variant="filled" onClick={handleConnect}>
            Connect
          </M3Button>
        </M3Box>
      ) : (
        <M3Box sx={{ mt: 2 }}>
          <M3Typography>✅ Connected to {email}</M3Typography>
          <M3List>
            {emails.map((email) => (
              <M3ListItem key={email.id}>
                <M3ListItemText
                  primary={email.subject}
                  secondary={`From: ${email.sender} - ${new Date(email.time).toLocaleString()}`}
                />
              </M3ListItem>
            ))}
          </M3List>
        </M3Box>
      )}
    </M3Paper>
  );
}
