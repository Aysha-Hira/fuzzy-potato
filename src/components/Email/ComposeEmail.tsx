import { Send } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { useState } from "react";
import { useEmail } from "../../contexts/EmailContext";

interface ComposeEmailProps {
  open: boolean;
  onClose: () => void;
  replyTo?: {
    to: string[];
    subject: string;
    body: string;
  };
}

export function ComposeEmail({ open, onClose, replyTo }: ComposeEmailProps) {
  const { sendEmail, loading } = useEmail();
  const [to, setTo] = useState(replyTo?.to.join(", ") || "");
  const [subject, setSubject] = useState(
    replyTo?.subject ? `Re: ${replyTo.subject}` : "",
  );
  const [body, setBody] = useState(
    replyTo?.body ? `\n\n--- Original Message ---\n${replyTo.body}` : "",
  );
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!to) {
      setError("Please enter at least one recipient");
      return;
    }

    const recipients = to.split(",").map((email) => email.trim());
    const result = await sendEmail(
      recipients,
      subject,
      body,
      body.replace(/\n/g, "<br/>"),
    );

    if (result.success) {
      onClose();
      // Reset form
      setTo("");
      setSubject("");
      setBody("");
      setError(null);
    } else {
      setError(result.error || "Failed to send email");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Compose Email</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="email@example.com, another@example.com"
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            rows={12}
            margin="normal"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="filled"
          onClick={handleSend}
          disabled={loading || !to || !subject}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
