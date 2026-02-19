// import { Avatar } from "@mui/material";
// import { M3Badge, M3FAB, M3IconButton, M3Stack, M3Typography } from "m3r";
// import React from "react";
// import { FiMoon } from "react-icons/fi";
// import {
//   MdNotifications,
//   MdOutlineEdit,
//   MdOutlinePalette,
//   MdOutlinePerson,
//   MdOutlineSettings,
//   MdOutlineWbSunny,
// } from "react-icons/md";
// import { SlCalender } from "react-icons/sl";

// export function Sidebar() {
//   const adjustGapNum = 5;
//   const [theme, setTheme] = React.useState("Light");
//   return (
//     <M3Stack
//       direction="column"
//       gap={22 / adjustGapNum}
//       textAlign={"center"}
//       position="static"
//       width={65}
//     >
//       <M3Stack>
//         <M3FAB>
//           <MdOutlineEdit />
//         </M3FAB>
//       </M3Stack>

//       {/* <M3Stack justifyContent={"space-between"}> */}
//       <M3Stack gap={12 / adjustGapNum} sx={{ flexGrow: 1 }}>
//         <M3Stack alignItems={"center"}>
//           <MdOutlineEdit size={24} />
//           <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
//             Email
//           </M3Typography>
//         </M3Stack>

//         <M3Stack alignItems={"center"}>
//           <SlCalender size={24} />
//           <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
//             Calender
//           </M3Typography>
//         </M3Stack>

//         <M3Stack alignItems={"center"}>
//           <MdOutlinePerson size={24} />
//           <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
//             Contact
//           </M3Typography>
//         </M3Stack>
//       </M3Stack>

//       <M3Stack gap={16 / adjustGapNum} justifyContent="flex-end">
//         <M3Stack alignItems={"center"}>
//           <M3Badge badgeContent={25} color="error">
//             <MdNotifications size={24} />
//           </M3Badge>
//         </M3Stack>

//         <M3Stack alignItems="center">
//           <M3IconButton
//             value={theme}
//             onClick={() => setTheme(theme === "Light" ? "Dark" : "Light")}
//           >
//             {theme === "Dark" ? (
//               <MdOutlineWbSunny size={24} />
//             ) : (
//               <FiMoon size={24} />
//             )}
//           </M3IconButton>
//         </M3Stack>

//         <M3Stack alignItems={"center"}>
//           <MdOutlinePalette size={24} />
//         </M3Stack>

//         <M3Stack alignItems={"center"}>
//           <MdOutlineSettings size={24} />
//         </M3Stack>

//         <M3Stack alignItems={"center"}>
//           <Avatar
//             src="https://randomuser.me/api/portraits/men/75.jpg"
//             sx={{ width: 56, height: 56 }}
//           ></Avatar>
//         </M3Stack>
//         {/* </M3Stack> */}
//       </M3Stack>
//     </M3Stack>
//   );
// }

import { Avatar } from "@mui/material";
import { M3Badge, M3FAB, M3IconButton, M3Stack, M3Typography } from "m3r";
import React from "react";
import { FiMoon } from "react-icons/fi";
import {
  MdNotifications,
  MdOutlineEdit,
  MdOutlinePalette,
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineWbSunny,
} from "react-icons/md";
import { SlCalender } from "react-icons/sl";

// Add props interface
interface SidebarProps {
  onCompose?: () => void;
  onFolderChange?: (folder: string) => void;
  currentFolder?: string;
}

export function Sidebar({
  onCompose,
  onFolderChange,
  currentFolder = "INBOX",
}: SidebarProps) {
  const adjustGapNum = 5;
  const [theme, setTheme] = React.useState("Light");

  const handleEmailClick = () => {
    onFolderChange?.("INBOX");
  };

  const handleCalendarClick = () => {
    console.log("Calendar clicked");
    // Add calendar navigation logic
  };

  const handleContactClick = () => {
    console.log("Contact clicked");
    // Add contacts navigation logic
  };

  return (
    <M3Stack
      direction="column"
      gap={22 / adjustGapNum}
      textAlign={"center"}
      position="static"
      width={65}
    >
      {/* Compose Button - Now using onCompose prop */}
      <M3Stack>
        <M3FAB onClick={onCompose}>
          <MdOutlineEdit />
        </M3FAB>
      </M3Stack>

      {/* Main Navigation Icons */}
      <M3Stack gap={12 / adjustGapNum} sx={{ flexGrow: 1 }}>
        {/* Email - Clickable */}
        <M3Stack
          alignItems={"center"}
          onClick={handleEmailClick}
          sx={{
            cursor: "pointer",
            opacity: currentFolder === "INBOX" ? 1 : 0.7,
            "&:hover": { opacity: 1 },
          }}
        >
          <MdOutlineEdit size={24} />
          <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
            Email
          </M3Typography>
        </M3Stack>

        {/* Calendar - Clickable */}
        <M3Stack
          alignItems={"center"}
          onClick={handleCalendarClick}
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
        >
          <SlCalender size={24} />
          <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
            Calendar
          </M3Typography>
        </M3Stack>

        {/* Contact - Clickable */}
        <M3Stack
          alignItems={"center"}
          onClick={handleContactClick}
          sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
        >
          <MdOutlinePerson size={24} />
          <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
            Contact
          </M3Typography>
        </M3Stack>
      </M3Stack>

      {/* Bottom Icons */}
      <M3Stack gap={16 / adjustGapNum} justifyContent="flex-end">
        <M3Stack alignItems={"center"}>
          <M3Badge badgeContent={25} color="error">
            <MdNotifications size={24} />
          </M3Badge>
        </M3Stack>

        <M3Stack alignItems="center">
          <M3IconButton
            value={theme}
            onClick={() => setTheme(theme === "Light" ? "Dark" : "Light")}
          >
            {theme === "Dark" ? (
              <MdOutlineWbSunny size={24} />
            ) : (
              <FiMoon size={24} />
            )}
          </M3IconButton>
        </M3Stack>

        <M3Stack alignItems={"center"}>
          <MdOutlinePalette size={24} />
        </M3Stack>

        <M3Stack alignItems={"center"}>
          <MdOutlineSettings size={24} />
        </M3Stack>

        <M3Stack alignItems={"center"}>
          <Avatar
            src="https://randomuser.me/api/portraits/men/75.jpg"
            sx={{ width: 56, height: 56 }}
          />
        </M3Stack>
      </M3Stack>
    </M3Stack>
  );
}
