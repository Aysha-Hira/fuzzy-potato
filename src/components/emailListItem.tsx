// import React from "react";
// import {
//   M3Box,
//   M3Avatar,
//   M3Typography,
//   M3Badge,
//   M3ListItem,
//   M3ListItemAvatar,
//   M3ListItemText,
// } from "m3r";

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

// export function EmailListItem({ email, selected, onClick }: Props) {
//   return (
//     <M3ListItem
//       clickable
//       onClick={onClick}
//       sx={{
//         margin: 0,
//         padding: 0,

//         cursor: "pointer",
//         bgcolor: selected ? "action.selected" : "transparent",
//         "&:hover": { bgcolor: "action.hover" },
//         alignItems: "flex-start",
//         border: "1px solid blue",

//       }}
//     >
//       <M3ListItemAvatar>
//         <M3Avatar
//           src={email.avatar}
//           alt={email.sender}
//           sx={{ width: 48, height: 48 }}
//         />
//       </M3ListItemAvatar>

//       <M3ListItemText
//         primary={
//           <M3Box
//             sx={{
//               display: "flex",
//               // justifyContent: "space-between",
//               alignItems: "center",
//               border: "1px solid green",
//             }}
//           >
//             <M3Typography
//               variant="bodySmall"
//               noWrap
//               sx={{ border: "1px solid yellow" }}
//             >
//               {email.subject}
//             </M3Typography>

//             <M3Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 border: "1px solid green",
//               }}
//             >
//               <M3Typography variant="bodySmall" color="text.secondary">
//                 {email.time instanceof Date
//                   ? email.time.toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })
//                   : email.time}
//               </M3Typography>

//               {email.threadCount > 0 && (
//                 <M3Badge
//                   badgeContent={email.threadCount}
//                   color="primary"
//                   sx={{ border: "1px solid green" }}
//                 />
//               )}
//             </M3Box>
//           </M3Box>
//         }
//         secondary={
//           <>
//             <M3Typography variant="bodySmall" noWrap>
//               {email.sender}
//             </M3Typography>

//             <M3Typography variant="bodySmall" color="text.secondary" noWrap>
//               {email.message?.slice(0, 50)}...
//             </M3Typography>
//           </>
//         }
//       />
//     </M3ListItem>
//   );
// }

// EmailListItem.tsx
export function EmailListItem({ email, selected, onClick }: Props) {
  return (
    <M3ListItem
      clickable
      onClick={onClick}
      sx={{
        padding: 1,
        cursor: "pointer",
        bgcolor: selected ? "action.selected" : "transparent",
        "&:hover": { bgcolor: "action.hover" },
        alignItems: "flex-start",
      }}
    >
      <M3ListItemAvatar>
        <M3Avatar
          src={email.avatar}
          alt={email.sender}
          sx={{ width: 48, height: 48 }}
        />
      </M3ListItemAvatar>

      <M3ListItemText
        primary={
          <M3Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 1,
            }}
          >
            {/* Subject - flex 1 to take remaining space, truncate */}
            <M3Typography
              variant="bodySmall"
              noWrap
              sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {email.subject}
            </M3Typography>

            {/* Time + Badge fixed width */}
            <M3Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                flexShrink: 0,
                minWidth: 80, // ensure consistent width for right side
                justifyContent: "flex-end",
              }}
            >
              <M3Typography variant="bodySmall" color="text.secondary" noWrap>
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
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {email.sender}
            </M3Typography>

            <M3Typography
              variant="bodySmall"
              color="text.secondary"
              noWrap
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {email.message?.slice(0, 50)}...
            </M3Typography>
          </M3Box>
        }
      />
    </M3ListItem>
  );
}
