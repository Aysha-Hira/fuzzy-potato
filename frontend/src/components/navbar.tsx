// import { FormControl, Select, InputBase } from "@mui/material";
// import {
//   M3AppBar,
//   M3IconButton,
//   M3MenuItem,
//   M3Paper,
//   M3Stack,
//   M3Toolbar,
//   M3Typography,
// } from "m3r";
// import { MdOutlineSearch, MdMoreVert } from "react-icons/md";

// export function Navbar({
//   account,
//   setAccount,
// }: {
//   account: string;
//   setAccount: (a: string) => void;
// }) {
//   return (
//     <M3Stack gap={15} style={{ border: "1px solid red"}}>
//       <M3AppBar position="static" color="transparent" style={{ border: "1px solid blue", padding: 0, margin: 0 }}>
//         <M3Toolbar

//           disableGutters
//           style={{ border: "1px solid green",  padding: 0, margin: 0}}
//         >
//           <M3Stack gap={"15px"} direction={"row"} alignItems={"center"} style={{ border: "1px solid red", padding: 0, margin: 0}}>
//             {/* Logo */}

//             <M3Typography variant="titleLarge" sx={{ fontWeight: "bold" }}>
//               nanoVOLTZ
//             </M3Typography>

//             {/* User Account */}
//             <FormControl sx={{ minWidth: 160 }}>
//               <Select
//                 value={account}
//                 onChange={(e) => setAccount(e.target.value)}
//                 size="small"
//               >
//                 <M3MenuItem value="Sam Jones">Sam Jones</M3MenuItem>
//                 <M3MenuItem value="Alice Doe">Alice Doe</M3MenuItem>
//               </Select>
//             </FormControl>
//           </M3Stack>
//         </M3Toolbar>

//         {/* Search Bar */}
//         <M3Paper
//           component="form"
//           elevation={1}
//           sx={{

//             display: "flex",
//             alignItems: "center",
//             width: { xs: 200, sm: 300, md: 550 }, // Responsive width for different screen sizes
//             borderRadius: 4,
//             // bgcolor: "background.paper",
//             boxShadow: 1,
//           }}
//         >
//           <M3IconButton type="submit" aria-label="search">
//             <MdOutlineSearch />
//           </M3IconButton>

//           <InputBase
//             sx={{ ml: 1, flex: 1, height: "20px" }}
//             placeholder="Global Search"
//             inputProps={{ "aria-label": "search emails" }}
//           />
//           <M3IconButton>
//             <MdMoreVert />
//           </M3IconButton>
//         </M3Paper>
//       </M3AppBar>
//     </M3Stack>
//   );
// }

import { FormControl, Select, InputBase } from "@mui/material";
import {
  M3AppBar,
  M3IconButton,
  M3MenuItem,
  M3Paper,
  M3Stack,
  M3Toolbar,
  M3Typography,
} from "m3r";
import { MdOutlineSearch, MdMoreVert } from "react-icons/md";

export function Navbar({
  account,
  setAccount,
}: {
  account: string;
  setAccount: (a: string) => void;
}) {
  return (
    <M3AppBar position="static" color="transparent" elevation={0}>
      <M3Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE */}
        <M3Stack direction="row" alignItems="center" spacing={2}>
          <M3Typography variant="titleLarge" sx={{ fontWeight: "bold" }}>
            nanoVOLTZ
          </M3Typography>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            >
              <M3MenuItem value="Sam Jones">Sam Jones</M3MenuItem>
              <M3MenuItem value="Alice Doe">Alice Doe</M3MenuItem>
            </Select>
          </FormControl>
        </M3Stack>

        {/* RIGHT SIDE - SEARCH */}
        <M3Paper
          component="form"
          elevation={1}
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: 200, sm: 300, md: 450 },
            borderRadius: 4,
          }}
        >
          <M3IconButton type="submit">
            <MdOutlineSearch />
          </M3IconButton>

          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Global Search" />

          <M3IconButton>
            <MdMoreVert />
          </M3IconButton>
        </M3Paper>
      </M3Toolbar>
    </M3AppBar>
  );
}
