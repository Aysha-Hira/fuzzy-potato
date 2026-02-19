import React from "react";
import {
  M3Box,
  M3Typography,
  M3Avatar,
  M3Button,
  M3IconButton,
  M3Paper,
} from "m3r";
import {
  Reply as ReplyIcon,
  ReplyAll as ReplyAllIcon,
  Forward as ForwardIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Attachment as AttachmentIcon,
} from "@mui/icons-material";
import type { Email } from "../../types/email";

interface EmailContentProps {
  email: Email | null;
  onReply?: () => void;
  onReplyAll?: () => void;
  onForward?: () => void;
  onStar?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
}

export function EmailContent({
  email,
  onReply,
  onReplyAll,
  onForward,
  onStar,
  onDelete,
  onArchive,
}: EmailContentProps) {
  if (!email) {
    return (
      <M3Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          m: 2,
          boxShadow: 1,
          minHeight: 400,
        }}
      >
        <M3Typography
          variant="bodyLarge"
          color="text.secondary"
          textAlign="center"
        >
          Select an{" "}
          <M3Typography
            component="span"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            email
          </M3Typography>{" "}
          to view its content
        </M3Typography>
      </M3Box>
    );
  }

  return (
    <M3Box
      sx={{
        flexGrow: 1,
        p: 3,
        overflowY: "auto",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        m: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Action Buttons */}
      <M3Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          pb: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <M3Button
          size="small"
          variant="outlined"
          startIcon={<ReplyIcon />}
          onClick={onReply}
        >
          Reply
        </M3Button>
        <M3Button
          size="small"
          variant="outlined"
          startIcon={<ReplyAllIcon />}
          onClick={onReplyAll}
        >
          Reply All
        </M3Button>
        <M3Button
          size="small"
          variant="outlined"
          startIcon={<ForwardIcon />}
          onClick={onForward}
        >
          Forward
        </M3Button>

        <M3Box sx={{ flexGrow: 1 }} />

        <M3IconButton onClick={onStar} size="small">
          {email.isStarred ? <StarIcon color="warning" /> : <StarBorderIcon />}
        </M3IconButton>
        <M3IconButton onClick={onArchive} size="small">
          <ArchiveIcon />
        </M3IconButton>
        <M3IconButton onClick={onDelete} size="small" color="error">
          <DeleteIcon />
        </M3IconButton>
      </M3Box>

      {/* Email Header */}
      <M3Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
        <M3Avatar src={email.avatar} sx={{ width: 56, height: 56 }}>
          {email.sender.replace("\"", "").charAt(0).toUpperCase()}
        </M3Avatar>

        <M3Box sx={{ flexGrow: 1 }}>
          <M3Typography variant="bodySmall" sx={{ fontWeight: 600, mb: 0.5 }}>
            {email.subject}
          </M3Typography>

          <M3Box
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
          >
            <M3Typography variant="bodySmall" sx={{ fontWeight: 500 }}>
              {email.sender}
            </M3Typography>
            {!email.isRead && (
              <M3Box
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  fontSize: "0.75rem",
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                }}
              >
                New
              </M3Box>
            )}
          </M3Box>

          <M3Typography variant="bodyMedium" color="text.secondary">
            To: {email.recipient.join(", ")}
          </M3Typography>

          <M3Typography
            variant="bodySmall"
            color="text.secondary"
            sx={{ mt: 0.5, display: "block" }}
          >
            {new Date(email.time).toLocaleString()}
          </M3Typography>
        </M3Box>
      </M3Box>

      {/* Email Body */}
      <M3Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "grey.50",
          borderRadius: 2,
          flexGrow: 1,
        }}
      >
        <M3Typography
          variant="bodyLarge"
          sx={{
            whiteSpace: "pre-line",
            lineHeight: 1.8,
          }}
        >
          {email.message || "No message content"}
        </M3Typography>
      </M3Paper>

      {/* Attachments */}
      {email.attachments && email.attachments.length > 0 && (
        <M3Box sx={{ mt: 2 }}>
          <M3Typography
            variant="bodyMedium"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AttachmentIcon fontSize="small" />
            Attachments ({email.attachments.length})
          </M3Typography>

          <M3Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {email.attachments.map((att, index) => (
              <M3Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                }}
                onClick={() =>
                  console.log("Download attachment:", att.filename)
                }
              >
                <AttachmentIcon fontSize="small" color="primary" />
                <M3Box>
                  <M3Typography variant="bodyMedium" sx={{ fontWeight: 500 }}>
                    {att.filename}
                  </M3Typography>
                  <M3Typography variant="bodySmall" color="text.secondary">
                    {(att.size / 1024).toFixed(1)} KB
                  </M3Typography>
                </M3Box>
              </M3Paper>
            ))}
          </M3Box>
        </M3Box>
      )}
    </M3Box>
  );
}
