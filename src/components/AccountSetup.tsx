import {
  M3Alert,
  M3Box,
  M3Button,
  M3MenuItem,
  M3Paper,
  M3TextField,
  M3Typography,
} from "m3r";

import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { useState, useEffect } from "react"; // Add useEffect
import { useEmail } from "../contexts/EmailContext";
import type { Email } from "../types/email";

const providers = {
  gmail: {
    name: "Gmail",
    imapHost: "imap.gmail.com",
    imapPort: 993,
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
  },
  outlook: {
    name: "Outlook/Hotmail",
    imapHost: "outlook.office365.com",
    imapPort: 993,
    smtpHost: "smtp-mail.outlook.com",
    smtpPort: 587,
  },
  yahoo: {
    name: "Yahoo",
    imapHost: "imap.mail.yahoo.com",
    imapPort: 993,
    smtpHost: "smtp.mail.yahoo.com",
    smtpPort: 465,
  },
};

export function AccountSetup() {
  const { connectAccount, loading, error, connectedAccount } = useEmail();
  const [activeStep, setActiveStep] = useState(0);
  const [provider, setProvider] = useState("gmail");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetchedEmails, setFetchedEmails] = useState<Email[]>([]);
  const [connectionSuccess, setConnectionSuccess] = useState(false);

  // Log when connectedAccount changes
  useEffect(() => {
    console.log("🟢 connectedAccount changed:", connectedAccount);
    if (connectedAccount) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConnectionSuccess(true);
    }
  }, [connectedAccount]);

  const handleConnect = async () => {
    console.log("1️⃣ Starting connection process...");
    console.log("2️⃣ Email:", email);
    console.log("3️⃣ Provider:", provider);

    const selectedProvider = providers[provider as keyof typeof providers];
    console.log("4️⃣ Selected provider settings:", selectedProvider);

    try {
      console.log("5️⃣ Calling connectAccount from context...");
      const success = await connectAccount({
        email,
        password,
        imapHost: selectedProvider.imapHost,
        imapPort: selectedProvider.imapPort,
        smtpHost: selectedProvider.smtpHost,
        smtpPort: selectedProvider.smtpPort,
      });

      console.log("6️⃣ connectAccount result:", success);

      if (success) {
        console.log("7️⃣ Connection successful! Moving to step 2...");
        setActiveStep(2);

        // Fetch emails after successful connection
        console.log("8️⃣ Fetching emails...");
        const fetchResult = await window.electron.email.fetch(
          email,
          "INBOX",
          20,
        );

        if (fetchResult.success && fetchResult.emails) {
          console.log(`9️⃣ Fetched ${fetchResult.emails.length} emails`);
          setFetchedEmails(fetchResult.emails);
        }
      } else {
        console.log("❌ Connection failed");
      }
    } catch (err) {
      console.error("❌ Exception:", err);
      alert(`Error: ${(err as Error).message}`);
    }
  };

  // If connected, show success message
  if (connectedAccount || connectionSuccess) {
    return (
      <M3Paper sx={{ p: 3, m: 2, maxWidth: 500, mx: "auto" }}>
        <M3Alert severity="success" sx={{ mb: 2 }}>
          ✅ Successfully connected to {connectedAccount || email}
        </M3Alert>

        {fetchedEmails.length > 0 ? (
          <M3Box>
            <M3Typography variant="bodySmall" gutterBottom>
              Your Inbox ({fetchedEmails.length} emails)
            </M3Typography>
            {/* You can add a simple email list here */}
            {fetchedEmails.slice(0, 5).map((emailItem) => (
              <M3Box
                key={emailItem.id}
                sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}
              >
                <M3Typography variant="bodySmall">
                  {emailItem.subject}
                </M3Typography>
                <M3Typography variant="bodySmall" color="text.secondary">
                  From: {emailItem.sender}
                </M3Typography>
              </M3Box>
            ))}
          </M3Box>
        ) : (
          <CircularProgress size={24} />
        )}
      </M3Paper>
    );
  }

  return (
    <M3Paper sx={{ p: 3, m: 2, maxWidth: 500, mx: "auto" }}>
      <M3Typography variant="bodySmall" gutterBottom>
        Connect Email Account
      </M3Typography>

      <Stepper activeStep={activeStep} sx={{ my: 3 }}>
        <Step>
          <StepLabel>Select Provider</StepLabel>
        </Step>
        <Step>
          <StepLabel>Enter Credentials</StepLabel>
        </Step>
        <Step>
          <StepLabel>Connect</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && (
        <M3Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Email Provider</InputLabel>
            <Select
              value={provider}
              label="Email Provider"
              onChange={(e) => setProvider(e.target.value)}
            >
              {Object.entries(providers).map(([key, value]) => (
                <M3MenuItem key={key} value={key}>
                  {value.name}
                </M3MenuItem>
              ))}
              <M3MenuItem value="custom">Custom IMAP/SMTP</M3MenuItem>
            </Select>
          </FormControl>

          <M3Button variant="filled" onClick={() => setActiveStep(1)} fullWidth>
            Next
          </M3Button>
        </M3Box>
      )}

      {activeStep === 1 && (
        <M3Box>
          <M3TextField
            fullWidth
            label="Email Address"
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
            helperText="Use an app-specific password, not your regular password"
          />

          {provider === "custom" && (
            <M3Box sx={{ mt: 2 }}>
              <M3Typography variant="bodySmall" gutterBottom>
                Custom Server Settings
              </M3Typography>
              <M3TextField
                fullWidth
                label="IMAP Host"
                size="small"
                margin="dense"
              />
              <M3TextField
                fullWidth
                label="IMAP Port"
                size="small"
                margin="dense"
                type="number"
              />
              <M3TextField
                fullWidth
                label="SMTP Host"
                size="small"
                margin="dense"
              />
              <M3TextField
                fullWidth
                label="SMTP Port"
                size="small"
                margin="dense"
                type="number"
              />
            </M3Box>
          )}

          <M3Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <M3Button onClick={() => setActiveStep(0)}>Back</M3Button>
            <M3Button
              variant="filled"
              onClick={handleConnect}
              disabled={!email || !password || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Connect"}
            </M3Button>
          </M3Box>

          {error && (
            <M3Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </M3Alert>
          )}
        </M3Box>
      )}
    </M3Paper>
  );
}
