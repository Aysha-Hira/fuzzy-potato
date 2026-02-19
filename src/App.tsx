// import React, { useState } from "react";
// import { M3Box } from "m3r";
// import { Sidebar } from "./components/sidebar";
// import { Navbar } from "./components/navbar";
// import { EmailList } from "./components/Email/EmailList";
// import { EmailContent } from "./components/Email/EmailContent";
// import { AccountSetup } from "./components/AccountSetup";
// import { ComposeEmail } from "./components/Email/ComposeEmail";
// import { EmailProvider, useEmail } from "./contexts/EmailContext";
// import type { Email } from "./types/email";

// function AppContent() {
//   const { connectedAccount, currentFolder, setCurrentFolder } = useEmail();
//   const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
//   const [composeOpen, setComposeOpen] = useState(false);
//   const [account, setAccount] = useState("Sam Jones");

//   if (!connectedAccount) {
//     return <AccountSetup />;
//   }

//   return (
//     <M3Box display="flex" height="100vh">
//       <Sidebar
//         onCompose={() => setComposeOpen(true)}
//         onFolderChange={setCurrentFolder}
//         currentFolder={currentFolder}
//       />

//       <M3Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//         <Navbar account={account} setAccount={setAccount} />

//         <M3Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
//           <M3Box sx={{ width: 400, borderRight: 1, borderColor: "divider" }}>
//             <EmailList
//               onSelectEmail={setSelectedEmail}
//               selectedEmailId={selectedEmail?.id}
//             />
//           </M3Box>

//           <M3Box sx={{ flexGrow: 1 }}>
//             <EmailContent email={selectedEmail} />
//           </M3Box>
//         </M3Box>
//       </M3Box>

//       <ComposeEmail open={composeOpen} onClose={() => setComposeOpen(false)} />
//     </M3Box>
//   );
// }

// function App() {
//   return (
//     <EmailProvider>
//       <AppContent />
//     </EmailProvider>
//   );
// }

// export default App;




import React, { useState } from 'react';
import { M3Box } from 'm3r';
import { Sidebar } from './components/sidebar';
import { Navbar } from './components/navbar';
import { EmailList } from './components/Email/EmailList';
import { EmailContent } from './components/Email/EmailContent';
import { AccountSetup } from './components/AccountSetup';
import { ComposeEmail } from './components/Email/ComposeEmail';
import { EmailProvider, useEmail } from './contexts/EmailContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import type { Email } from './types/email';

// Import the header components from your original App.tsx
import { FormControl, Select } from "@mui/material";
import RefreshIcon from "@mui/icons-material/AutorenewOutlined";
import ThreelinesIcon from "@mui/icons-material/MenuOutlined";
import {
  M3IconButton,
  M3FormControlLabel,
  M3Checkbox,
  M3MenuItem,
  M3Button
} from "m3r";

function InboxHeader({ 
  folder, 
  onFolderChange,
  onRefresh 
}: { 
  folder: string; 
  onFolderChange: (folder: string) => void;
  onRefresh: () => void;
}) {
  return (
    <M3Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <M3IconButton>
        <ThreelinesIcon />
      </M3IconButton>

      <M3Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <M3IconButton onClick={onRefresh} sx={{ color: "black" }}>
          <RefreshIcon />
        </M3IconButton>

        <FormControl size="small" variant="standard">
          <Select
            value={folder}
            onChange={(e) => onFolderChange(e.target.value)}
            sx={{ height: 32, minWidth: 120 }}
          >
            <M3MenuItem value="INBOX">Inbox</M3MenuItem>
            <M3MenuItem value="Sent">Sent</M3MenuItem>
            <M3MenuItem value="Drafts">Drafts</M3MenuItem>
            <M3MenuItem value="Trash">Trash</M3MenuItem>
            <M3MenuItem value="Promotions">Promotions</M3MenuItem>
          </Select>
        </FormControl>
      </M3Box>

      <M3FormControlLabel control={<M3Checkbox />} label="" />
    </M3Box>
  );
}

function EmailFilters({
  filters,
  setFilters,
}: {
  filters: string;
  setFilters: (f: string) => void;
}) {
  return (
    <M3Box
      sx={{
        p: 1,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {["All", "Read", "Today", "Unread"].map((f) => (
        <M3Button
          key={f}
          variant={filters === f ? "filled" : "outlined"}
          size="small"
          onClick={() => setFilters(f)}
        >
          {f}
        </M3Button>
      ))}

      <M3Button
        size="small"
        sx={{ ml: "auto" }}
        onClick={() => setFilters("All")}
      >
        Clear
      </M3Button>
    </M3Box>
  );
}

function AppContent() {
  const { connectedAccount, currentFolder, setCurrentFolder } = useEmail();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [account, setAccount] = useState("Sam Jones");
  const [filter, setFilter] = useState("All");

  const handleRefresh = () => {
    // Refresh current folder
    window.electron.email.fetch(connectedAccount!, currentFolder, 50);
  };

  if (!connectedAccount) {
    return <AccountSetup />;
  }

  return (
    <M3Box display="flex" height="100vh">
      <Sidebar 
        onCompose={() => setComposeOpen(true)}
      />
      
      <M3Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar account={account} setAccount={setAccount} />
        
        <M3Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          <M3Box sx={{ width: 400, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <InboxHeader 
              folder={currentFolder}
              onFolderChange={setCurrentFolder}
              onRefresh={handleRefresh}
            />
            <EmailFilters filters={filter} setFilters={setFilter} />
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

      <ComposeEmail 
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
      />
    </M3Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <EmailProvider>
        <AppContent />
      </EmailProvider>
    </ThemeProvider>
  );
}

export default App;