// import { AccessTime, Attachment, Star, StarBorder } from "@mui/icons-material";
// import {
//   M3Alert,
//   M3Avatar,
//   M3Box,
//   M3Chip,
//   M3Divider,
//   M3IconButton,
//   M3List,
//   M3ListItem,
//   M3ListItemAvatar,
//   M3ListItemText,
//   M3Paper,
//   M3Typography,
// } from "m3r";
// import React, { useEffect } from "react";
// import { useEmail } from "../../contexts/EmailContext";
// import type { Email } from "../../types/email";
// import { CircularProgress } from "@mui/material";

// interface EmailListProps {
//   onSelectEmail: (email: Email) => void;
//   selectedEmailId?: number | null;
// }

// export function EmailList({ onSelectEmail, selectedEmailId }: EmailListProps) {
//   const {
//     emails,
//     loading,
//     error,
//     fetchEmails,
//     currentFolder,
//     markAsRead,
//     toggleStar,
//   } = useEmail();

//   useEffect(() => {
//     fetchEmails();
//   }, [currentFolder, fetchEmails]);

//   if (loading && emails.length === 0) {
//     return (
//       <M3Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </M3Box>
//     );
//   }

//   if (error) {
//     return (
//       <M3Alert severity="error" sx={{ m: 2 }}>
//         {error}
//       </M3Alert>
//     );
//   }

//   if (emails.length === 0) {
//     return (
//       <M3Paper sx={{ p: 4, textAlign: "center", m: 2 }}>
//         <M3Typography color="text.secondary">
//           No emails in {currentFolder}
//         </M3Typography>
//       </M3Paper>
//     );
//   }

//   return (
//     <M3Box
//       sx={{
//         width: "100%",
//         bgcolor: "background.paper",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <M3List
//         sx={{
//           width: "100%",
//           bgcolor: "background.paper",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {emails.map((email) => (
//           <React.Fragment key={email.id}>
//             <M3ListItem
//               alignItems="flex-start"
//               sx={{
//                 cursor: "pointer",
//                 bgcolor: email.isRead ? "inherit" : "action.hover",
//                 "&:hover": { bgcolor: "action.selected" },
//                 borderLeft: selectedEmailId === email.id ? 3 : 0,
//                 borderLeftColor: "primary.main",
//                 // Ensure content stays within bounds
//                 overflow: "hidden",
//               }}
//               clickable
//               onClick={() => {
//                 onSelectEmail(email);
//                 if (!email.isRead) markAsRead(email.id);
//               }}
//               secondaryAction={
//                 <M3IconButton
//                   edge="end"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleStar(email.id);
//                   }}
//                 >
//                   {email.isStarred ? <Star color="warning" /> : <StarBorder />}
//                 </M3IconButton>
//               }
//             >
//               <M3ListItemAvatar>
//                 <M3Avatar src={email.avatar} alt={email.sender}>
//                  {email.sender.replace("\"", "").charAt(0).toUpperCase()}
//                 </M3Avatar>
//               </M3ListItemAvatar>
//               <M3ListItemText
//                 sx={{
//                   // Allow text to truncate properly
//                   minWidth: 0,
//                   flex: "1 1 auto",
//                 }}
//                 primary={
//                   <M3Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 0,
//                       overflow: "hidden",
//                       flexWrap: "nowrap", // Prevent wrapping
//                     }}
//                   >
//                     <M3Typography
//                       component="span"
//                       variant="bodyLarge"
//                       fontWeight={email.isRead ? 400 : 600}
//                       sx={{
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         maxWidth: "120px", // Adjust as needed
//                       }}
//                     >
//                       {email.sender.replaceAll("\"", "")}
//                     </M3Typography>
//                     {!email.isRead && (
//                       <M3Chip
//                         label="New"
//                         size="small"
//                         color="primary"
//                         sx={{ height: 20, flexShrink: 0 }}
//                       />
//                     )}
//                     {email.attachments.length > 0 && (
//                       <Attachment
//                         fontSize="small"
//                         color="action"
//                         sx={{ flexShrink: 0 }}
//                       />
//                     )}
//                   </M3Box>
//                 }
//                 secondary={
//                   <M3Box sx={{ overflow: "hidden" }}>
//                     <M3Typography
//                       component="span"
//                       variant="bodyMedium"
//                       color="text.primary"
//                       fontWeight={email.isRead ? 400 : 500}
//                       sx={{
//                         display: "block",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {email.subject?.substring(0, 45)}
//                       {email.subject && email.subject.length > 45 ? "..." : ""}
//                     </M3Typography>
//                     <M3Typography
//                       component="span"
//                       variant="bodyMedium"
//                       color="text.secondary"
//                       sx={{
//                         display: "block",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         whiteSpace: "nowrap",
//                         maxWidth: "100%",
//                       }}
//                     >
//                       {email.message?.substring(0, 45)}
//                       {email.message && email.message.length > 45 ? "..." : ""}
//                     </M3Typography>
//                     <M3Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         mt: 0.5,
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       <AccessTime
//                         sx={{ fontSize: 14, flexShrink: 0 }}
//                         color="disabled"
//                       />
//                       <M3Typography
//                         variant="bodySmall"
//                         color="text.secondary"
//                         sx={{ flexShrink: 0 }}
//                       >
//                         {new Date(email.time).toLocaleString()}
//                       </M3Typography>
//                       {email.labels.map((label) => (
//                         <M3Chip
//                           key={label}
//                           label={label}
//                           size="small"
//                           variant="outlined"
//                           sx={{ height: 20, fontSize: "0.7rem", flexShrink: 0 }}
//                         />
//                       ))}
//                     </M3Box>
//                   </M3Box>
//                 }
//               />
//             </M3ListItem>
//             <M3Divider component="li" />
//           </React.Fragment>
//         ))}
//       </M3List>
//     </M3Box>
//   );
// }

import { AccessTime, Attachment, Star, StarBorder } from "@mui/icons-material";
import {
  M3Alert,
  M3Avatar,
  M3Box,
  M3Badge,
  M3Chip,
  M3Divider,
  M3IconButton,
  M3List,
  M3ListItem,
  M3ListItemAvatar,
  M3ListItemText,
  M3Paper,
  M3Typography,
} from "m3r";
import React, { useEffect } from "react";
import { useEmail } from "../../contexts/EmailContext";
import type { Email } from "../../types/email";
import { CircularProgress } from "@mui/material";

interface EmailListProps {
  onSelectEmail: (email: Email) => void;
  selectedEmailId?: number | null;
}

export function EmailList({ onSelectEmail, selectedEmailId }: EmailListProps) {
  const {
    emails,
    loading,
    error,
    fetchEmails,
    currentFolder,
    markAsRead,
    toggleStar,
  } = useEmail();

  useEffect(() => {
    fetchEmails();
  }, [currentFolder, fetchEmails]);

  if (loading && emails.length === 0) {
    return (
      <M3Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </M3Box>
    );
  }

  if (error) {
    return (
      <M3Alert severity="error" sx={{ m: 2 }}>
        {error}
      </M3Alert>
    );
  }

  if (emails.length === 0) {
    return (
      <M3Paper sx={{ p: 4, textAlign: "center", m: 2 }}>
        <M3Typography color="text.secondary">
          No emails in {currentFolder}
        </M3Typography>
      </M3Paper>
    );
  }

  return (
    <M3List
      sx={{
        width: "100%",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {emails.map((email) => {
        const selected = selectedEmailId === email.id;

        return (
          <M3ListItem
            key={email.id}
            divider
            alignItems="flex-start"
            selected={selected}
            onClick={() => {
              onSelectEmail(email);
              if (!email.isRead) markAsRead(email.id);
            }}
            clickable
            component={"li"}
            sx={{
              width: "100%",
              display: "flex ",
              flexGrow: 1,
              bgcolor: email.isRead ? "inherit" : "action.hover",
            }}
            secondaryAction={
              <M3IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(email.id);
                }}
              >
                {email.isStarred ? <Star color="warning" /> : <StarBorder />}
              </M3IconButton>
            }
          >
            <M3ListItemAvatar>
              <M3Avatar
                src={email.avatar}
                alt={email.sender.replaceAll('\"', "")}
              />
            </M3ListItemAvatar>

            <M3ListItemText
              primary={
                <M3Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Subject */}
                  <M3Typography variant="bodySmall" noWrap>
                    {email.subject}
                  </M3Typography>

                  {/* Time + Badge */}
                  <M3Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <M3Typography
                      variant="bodySmall"
                      color="primary.light"
                      noWrap
                    >
                      {email.time instanceof Date
                        ? email.time.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : email.time}
                    </M3Typography>
                    {email.threadCount > 0 && (
                      <M3Badge
                        badgeContent={email.threadCount}
                        color="primary"
                      />
                    )}
                    {email.attachments.length > 0 && (
                      <Attachment fontSize="small" color="action" />
                    )}
                  </M3Box>
                </M3Box>
              }
              secondary={
                <M3Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <M3Typography
                    variant="bodyMedium"
                    noWrap
                    sx={{ fontWeight: "bold", color: "primary.dark" }}
                  >
                    {email.sender
                      .replaceAll('\"', "")
                      .substring(0, email.sender.indexOf("<") - 2)}{" "}
                    {/** reduced by 2 because there is a space after the username and before the email address */}
                  </M3Typography>

                  <M3Typography
                    variant="bodySmall"
                    color="text.secondary"
                    noWrap
                  >
                    {email.message
                      ? email.message.length > 50
                        ? email.message.substring(0, 50) + "..."
                        : email.message
                      : "No preview available"}
                  </M3Typography>

                  {/* Labels */}
                  {/* {email.labels && email.labels.length > 0 && (
                    <M3Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                      {email.labels.slice(0, 2).map((label) => (
                        <M3Chip
                          key={label}
                          label={label}
                          size="small"
                          variant="outlined"
                          sx={{ height: 18, fontSize: "0.6rem" }}
                        />
                      ))}
                      {email.labels.length > 2 && (
                        <M3Typography
                          variant="bodyMedium"
                          color="text.secondary"
                        >
                          +{email.labels.length - 2}
                        </M3Typography>
                      )}
                    </M3Box>
                  )} */}
                </M3Box>
              }
            />
          </M3ListItem>
        );
      })}
    </M3List>
  );
}
