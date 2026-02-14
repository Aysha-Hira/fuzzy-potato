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

export function Sidebar() {
  const adjustGapNum = 5;
  const [theme, setTheme] = React.useState("Light");
  return (
    <M3Stack
      direction="column"
      gap={22 / adjustGapNum}
      textAlign={"center"}
      position="static"
    >
      <M3Stack>
        <M3FAB>
          <MdOutlineEdit />
        </M3FAB>
      </M3Stack>

      {/* <M3Stack justifyContent={"space-between"}> */}
      <M3Stack gap={12 / adjustGapNum} sx={{ flexGrow: 1 }}>
        <M3Stack alignItems={"center"}>
          <MdOutlineEdit size={24} />
          <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
            Email
          </M3Typography>
        </M3Stack>

        <M3Stack alignItems={"center"}>
          <SlCalender size={24} />
          <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
            Calender
          </M3Typography>
        </M3Stack>

        <M3Stack alignItems={"center"}>
          <MdOutlinePerson size={24} />
          <M3Typography variant="labelSmall" style={{ marginTop: 4 }}>
            Contact
          </M3Typography>
        </M3Stack>
      </M3Stack>

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
          ></Avatar>
        </M3Stack>
        {/* </M3Stack> */}
      </M3Stack>
    </M3Stack>
  );
}
