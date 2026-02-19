import {
  M3ListItem,
  M3ListItemAvatar,
  M3Avatar,
  M3ListItemText,
  M3Box,
  M3Typography,
  M3Badge,
} from "m3r";

import type { Email } from "../types/email";

type Props = {
  email: Email;
  selected?: boolean;
  onClick?: () => void;
};

export function EmailListItem({ email, selected, onClick }: Props) {
  return (
    <M3ListItem
      key={email.id}
      divider
      alignItems="flex-start"
      selected={selected}
      onClick={onClick}
      clickable
      component={"li"}
      sx={{
        width: "100%",
        display: "flex !important",
        flexGrow: 1,
      }}
    >
      <M3ListItemAvatar>
        <M3Avatar src={email.avatar} alt={email.sender} />
      </M3ListItemAvatar>

      <M3ListItemText
        primary={
          <M3Box
            sx={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "space-between",
              // width: "100%",
              // gap: 1,
            }}
          >
            {/* Subject - flex 1 to take remaining space, truncate */}
            <M3Typography
              variant="bodySmall"
              noWrap
              // sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {email.subject}
            </M3Typography>

            {/* Time + Badge fixed width */}
            <M3Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                // flexShrink: 0,
                // minWidth: 80, // ensure consistent width for right side
                // justifyContent: "flex-end",
              }}
            >
              <M3Typography variant="bodySmall" color="primary.light" noWrap>
                {email.time instanceof Date
                  ? email.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : email.time}
              </M3Typography>
              {email.threadCount > 0 && (
                <M3Badge badgeContent={email.threadCount} color="primary" />
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
              variant="bodySmall"
              noWrap
              sx={{ fontWeight: "bold", color: "primary.dark" }}
              // sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {email.sender}
            </M3Typography>

            <M3Typography
              variant="bodySmall"
              color="text.secondary"
              noWrap
              // sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {email.message
                ? email.message.length > 50
                  ? email.message.substring(0, 50) + "..."
                  : email.message
                : "No preview available"}
            </M3Typography>
          </M3Box>
        }
      />
    </M3ListItem>
  );
}
