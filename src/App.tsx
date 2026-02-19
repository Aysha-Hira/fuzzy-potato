// import { FormControl, Select } from "@mui/material";
// import React from "react";

// // Icons

// import RefreshIcon from "@mui/icons-material/AutorenewOutlined";
// import ThreelinesIcon from "@mui/icons-material/MenuOutlined";

// import {
//   M3Avatar,
//   M3Box,
//   M3Button,
//   M3Checkbox,
//   M3FormControlLabel,
//   M3IconButton,
//   M3List,
//   M3MenuItem,
//   M3Typography,
// } from "m3r";
// import { Sidebar } from "./components/sidebar";
// import type { Email } from "./types/email";

// // Sample emails
// import { EmailListItem } from "./components/emailListItem";
// import { Navbar } from "./components/navbar";
// import { emails } from "./data/email";
// import { ElectronTest } from "./components/ElectronTest";

// function App() {
//   const [account, setAccount] = React.useState("Sam Jones");
//   const [selectedEmail, setSelectedEmail] = React.useState<Email | null>(null);
//   const [filter, setFilter] = React.useState("All");

//   return (
//     <M3Box display={"flex"} height={"100vh"} padding={"5px"}>
//       {/* <SideBar /> */}
//       <Sidebar />

//       <M3Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//         <Navbar account={account} setAccount={setAccount} />

//         <M3Box
//           sx={{
//             display: "flex",
//             flexGrow: 1,
//             overflow: "hidden",
//           }}
//         >
//           <M3Box
//             sx={{
//               width: 450,
//               minWidth: 0, // ⭐ THIS IS CRITICAL
//               display: "flex",
//               flexDirection: "column",
//               // borderRight: 1,
//               // borderColor: "divider",
//             }}
//           >
//             <InboxHeader />
//             <EmailFilters filters={filter} setFilters={setFilter} />
//             <EmailList
//               selectedEmail={selectedEmail}
//               onSelectEmail={setSelectedEmail}
//               filter={filter}
//             />
//           </M3Box>

//           {/* Email content column */}
//           <EmailContent email={selectedEmail} />
//         </M3Box>
//       </M3Box>

//       {/* Electron */}
//       <ElectronTest />
//     </M3Box>
//   );
// }

// function InboxHeader() {
//   const [folder, setFolder] = React.useState("Inbox");

//   return (
//     <M3Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <M3IconButton>
//         <ThreelinesIcon />
//       </M3IconButton>

//       <M3Box>
//         <M3IconButton sx={{ color: "black" }}>
//           <RefreshIcon />
//         </M3IconButton>

//         <FormControl
//           size="small"
//           sx={{ mt: 0.5, fontWeight: "bold" }}
//           variant="standard"
//         >
//           <Select
//             value={folder}
//             onChange={(e) => setFolder(e.target.value)}
//             sx={{ height: 32 }}
//           >
//             <M3MenuItem value="Inbox">Inbox</M3MenuItem>
//             <M3MenuItem value="Sent">Sent</M3MenuItem>
//             <M3MenuItem value="Promotions">Promotions</M3MenuItem>
//           </Select>
//         </FormControl>
//       </M3Box>

//       <M3FormControlLabel control={<M3Checkbox />} label="" />
//     </M3Box>
//   );
// }

// function EmailFilters({
//   filters,
//   setFilters,
// }: {
//   filters: string;
//   setFilters: (f: string) => void;
// }) {
//   return (
//     <M3Box
//       sx={{
//         p: 1,
//         borderBottom: 1,
//         borderColor: "divider",
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//       }}
//     >
//       {["All", "Read", "Today", "Unread"].map((f) => (
//         <M3Button
//           key={f}
//           variant={filters === f ? "filled" : "outlined"}
//           size="small"
//           onClick={() => setFilters(f)}
//         >
//           {f}
//         </M3Button>
//       ))}

//       <M3Button
//         size="small"
//         sx={{ ml: "auto" }}
//         onClick={() => setFilters("All")}
//       >
//         Clear
//       </M3Button>
//     </M3Box>
//   );
// }

// function EmailContent({ email }: { email: (typeof emails)[0] | null }) {
//   if (!email) {
//     return (
//       <M3Box
//         sx={{
//           flexGrow: 1,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           p: 4,
//           boxShadow: 1,
//         }}
//       >
//         <M3Typography
//           variant="bodyLarge"
//           color="text.secondary"
//           textAlign="center"
//         >
//           Select an{" "}
//           <M3Typography
//             component="span"
//             color="primary"
//             sx={{ fontWeight: "bold" }}
//           >
//             email
//           </M3Typography>{" "}
//           to view its content
//         </M3Typography>
//       </M3Box>
//     );
//   }

//   return (
//     <M3Box
//       sx={{
//         flexGrow: 1,
//         p: 4,
//         overflowY: "auto",
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 1,
//       }}
//     >
//       {/* HEADER */}
//       <M3Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//         <M3Avatar src={email.avatar} sx={{ width: 48, height: 48 }} />

//         <M3Box sx={{ flexGrow: 1 }}>
//           <M3Typography
//             variant="titleMedium"
//             sx={{ fontWeight: 600, lineHeight: 1.2 }}
//           >
//             {email.subject}
//           </M3Typography>
//           <M3Typography variant="bodySmall" color="text.secondary">
//             {email.sender}
//           </M3Typography>
//         </M3Box>

//         <M3Typography variant="bodySmall" color="text.secondary">
//           {email.time instanceof Date
//             ? email.time.toLocaleString()
//             : email.time}
//         </M3Typography>
//       </M3Box>

//       {/* RECIPIENT INFO */}
//       <M3Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider", pb: 2 }}>
//         <M3Typography variant="bodySmall" color="text.secondary">
//           <strong>From:</strong> {email.sender}
//         </M3Typography>
//         <M3Typography variant="bodySmall" color="text.secondary">
//           <strong>To:</strong> Me
//         </M3Typography>
//       </M3Box>

//       {/* BODY */}
//       <M3Typography
//         variant="bodyMedium"
//         sx={{
//           whiteSpace: "pre-line",
//           lineHeight: 1.6,
//           color: "text.primary",
//         }}
//       >
//         {email.message}
//       </M3Typography>
//     </M3Box>
//   );
// }

// // Almost correct version: Problem, clickable causes issues with uniform width
// function EmailList({
//   selectedEmail,
//   onSelectEmail,
//   filter,
// }: {
//   selectedEmail: Email | null;
//   onSelectEmail: (email: Email) => void;
//   filter: string;
// }) {
//   const filteredEmails = emails.filter((email) => {
//     if (filter === "All") return true;
//     if (filter === "Read") return email.isRead;
//     if (filter === "Unread") return !email.isRead;
//     if (filter === "Today") {
//       const today = new Date().toDateString();
//       return email.time instanceof Date && email.time.toDateString() === today;
//     }
//     return true;
//   });
//   return (
//     <>
//       <M3List
//         sx={{
//           overflowY: "auto",
//           flexGrow: 1,
//           display: "flex", // ⭐ make list flex
//           flexDirection: "column", // ⭐ vertical
//         }}
//       >
//         {filteredEmails.map((email) => (
//           <EmailListItem
//             key={email.id}
//             email={email}
//             selected={selectedEmail?.id === email.id}
//             onClick={() => onSelectEmail(email)}
//           />
//         ))}
//       </M3List>
//     </>
//   );
// }

// export default App;

// // import React, { useState } from 'react';
// // import { M3Box } from 'm3r';
// // import { Sidebar } from './components/sidebar';
// // import { Navbar } from './components/navbar';
// // import { EmailList } from './components/EmailList';
// // import { EmailContent } from './components/EmailContent';
// // import { AccountSetup } from './components/AccountSetup';
// // import { ComposeEmail } from './components/ComposeEmail';
// // import { EmailProvider, useEmail } from './contexts/EmailContext';
// // import type { Email } from './types/email';

// // function AppContent() {
// //   const { connectedAccount } = useEmail();
// //   const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
// //   const [composeOpen, setComposeOpen] = useState(false);

// //   if (!connectedAccount) {
// //     return <AccountSetup />;
// //   }

// //   return (
// //     <M3Box display="flex" height="100vh">
// //       <Sidebar onCompose={() => setComposeOpen(true)} />

// //       <M3Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
// //         <Navbar account={''} setAccount={function (a: string): void {
// //           throw new Error('Function not implemented.');
// //         } } />

// //         <M3Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
// //           <M3Box sx={{ width: 400, borderRight: 1, borderColor: 'divider' }}>
// //             <EmailList
// //               onSelectEmail={setSelectedEmail}
// //               selectedEmailId={selectedEmail?.id}
// //             />
// //           </M3Box>

// //           <M3Box sx={{ flexGrow: 1 }}>
// //             <EmailContent email={selectedEmail} />
// //           </M3Box>
// //         </M3Box>
// //       </M3Box>

// //       <ComposeEmail
// //         open={composeOpen}
// //         onClose={() => setComposeOpen(false)}
// //       />
// //     </M3Box>
// //   );
// // }

// // function App() {
// //   return (
// //     <EmailProvider>
// //       <AppContent />
// //     </EmailProvider>
// //   );
// // }

// // export default App;

import React, { useState } from "react";
import { M3Box } from "m3r";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";
import { EmailList } from "./components/Email/EmailList";
import { EmailContent } from "./components/Email/EmailContent";
import { AccountSetup } from "./components/AccountSetup";
import { ComposeEmail } from "./components/Email/ComposeEmail";
import { EmailProvider, useEmail } from "./contexts/EmailContext";
import type { Email } from "./types/email";

function AppContent() {
  const { connectedAccount, currentFolder, setCurrentFolder } = useEmail();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [account, setAccount] = useState("Sam Jones");

  if (!connectedAccount) {
    return <AccountSetup />;
  }

  return (
    <M3Box display="flex" height="100vh">
      <Sidebar
        onCompose={() => setComposeOpen(true)}
        onFolderChange={setCurrentFolder}
        currentFolder={currentFolder}
      />

      <M3Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar account={account} setAccount={setAccount} />

        <M3Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          <M3Box sx={{ width: 400, borderRight: 1, borderColor: "divider" }}>
            <EmailList
              onSelectEmail={setSelectedEmail}
              selectedEmailId={selectedEmail?.id}
            />
          </M3Box>

          <M3Box sx={{ flexGrow: 1 }}>
            <EmailContent email={selectedEmail} />
          </M3Box>
        </M3Box>
      </M3Box>

      <ComposeEmail open={composeOpen} onClose={() => setComposeOpen(false)} />
    </M3Box>
  );
}

function App() {
  return (
    <EmailProvider>
      <AppContent />
    </EmailProvider>
  );
}

export default App;
