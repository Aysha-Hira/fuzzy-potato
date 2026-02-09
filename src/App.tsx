import React from "react";
import { InputBase, Select, FormControl } from "@mui/material";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContactsIcon from "@mui/icons-material/PersonOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ThemeIcon from "@mui/icons-material/WbSunnyOutlined";
import PaletteSelectorIcon from "@mui/icons-material/PaletteOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

import RefreshIcon from "@mui/icons-material/AutorenewOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import EditIcon from "@mui/icons-material/ModeEditOutlined"; // Selected
import {
  M3Box,
  M3IconButton,
  M3AppBar,
  M3Toolbar,
  M3Button,
  M3Avatar,
  M3Badge,
  M3List,
  M3MenuItem,
  M3ListItem,
  M3ListItemAvatar,
  M3Typography,
  M3Paper,
  M3ListItemText,
} from "m3r";

// Sample emails
const emails = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    subject: "New Business Opportunities",
    sender: "Jack Smith",
    message:
      "Dear Sam, Hope this email finds you well. I would like to discuss some new business opportunities with you in the upcoming quarter.",
    time: "Now",
    threadCount: 3,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    subject: "RE: Project Progress",
    sender: "Sarah Pruett",
    message:
      "Reminder on the mentioned deliverables for the project due next week. Please ensure all tasks are updated in the tracker.",
    time: "Yesterday",
    threadCount: 2,
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    subject: "LPO Created",
    sender: "Jasmine Fields",
    message:
      "Hello Sam, Could you please sign the issued LPO for the new purchase order so we can proceed with procurement?",
    time: "Yesterday",
    threadCount: 5,
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    subject: "Insurance Requested Documents",
    sender: "Dan Trovalds",
    message:
      "Dear Sam, I hope my message finds you in good health. Kindly provide the requested insurance documents at your earliest convenience.",
    time: "02/Feb/2026",
    threadCount: 1,
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    subject: "Update Request",
    sender: "Christine Woods",
    message:
      "Dear Sam, I would like you to prepare a detailed project update report for the board meeting next week.",
    time: "22/Dec/2025",
    threadCount: 2,
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    subject: "Team Meeting Schedule",
    sender: "Michael Lee",
    message:
      "Hi Sam, The weekly team meeting has been rescheduled to Friday at 10 AM. Please confirm your availability.",
    time: "21/Dec/2025",
    threadCount: 1,
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    subject: "Invoice Attached",
    sender: "Emily Carter",
    message:
      "Hello Sam, Please find the attached invoice for last month's services. Let me know if any corrections are needed.",
    time: "20/Dec/2025",
    threadCount: 1,
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    subject: "Client Feedback",
    sender: "Robert Johnson",
    message:
      "Sam, The client provided feedback on the recent project. They are satisfied overall but requested minor changes in the design.",
    time: "19/Dec/2025",
    threadCount: 3,
  },
  {
    id: 9,
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    subject: "Holiday Greetings",
    sender: "Sophia Martinez",
    message:
      "Dear Sam, Wishing you and your family a wonderful holiday season and a happy New Year!",
    time: "18/Dec/2025",
    threadCount: 0,
  },
  {
    id: 10,
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    subject: "System Maintenance Notice",
    sender: "David Kim",
    message:
      "Hello Sam, Please note that the system will undergo maintenance this weekend. Save your work and log out before 6 PM Friday.",
    time: "17/Dec/2025",
    threadCount: 1,
  },
];

function App() {
  const [account, setAccount] = React.useState("Sam Jones");
  const [selectedEmail, setSelectedEmail] = React.useState(null);

  return (
    <M3Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <SideBar />

      <M3Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <TopBar account={account} setAccount={setAccount} />

        <M3Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* Email list column */}
          <M3Box
            sx={{
              width: 450,
              display: "flex",
              flexDirection: "column",
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <InboxHeader />
            <EmailFilters />
            <EmailList
              selectedEmail={selectedEmail}
              onSelectEmail={setSelectedEmail}
            />
          </M3Box>

          {/* Email content column */}
          <EmailContent email={selectedEmail} />
        </M3Box>
      </M3Box>
    </M3Box>
  );
}

function SideBar() {
  return (
    <>
      <M3Box
        sx={{
          width: 72,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          borderRight: 1,
          borderColor: "divider",
        }}
      >

        {/* Icons with all colors avaailable */}
        {/* <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>{" "}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton> */}


        
        {/* Edit Button */}
        <M3IconButton color="primary" sx={{ width: 48, height: 48, mt: 3 }}>
          <EditIcon />
        </M3IconButton>
        {/* Inbox Button */}
        <M3IconButton color="primary" sx={{ width: 48, height: 48 }}>
          <EmailIcon color="primary" />
        </M3IconButton>
        {/* Calender Button */}
        <M3IconButton sx={{ color: "black", width: 48, height: 48 }}>
          <CalendarTodayIcon />
        </M3IconButton>
        {/* Contact Button */}
        <M3IconButton sx={{ color: "black", width: 48, height: 48 }}>
          <ContactsIcon />
        </M3IconButton>
        <M3Box sx={{ flexGrow: 1, width: 48, height: 48 }} />
        {/* For notification */}
        <M3IconButton sx={{ color: "black", width: 48, height: 48 }}>
          <NotificationsIcon />
        </M3IconButton>
        {/* Theme Button */}
        <M3IconButton>
          <ThemeIcon />
        </M3IconButton>
        {/* Palette Button */}
        <M3IconButton>
          <PaletteSelectorIcon />
        </M3IconButton>
        {/* Settings Button */}
        <M3IconButton>
          <SettingsIcon />
        </M3IconButton>
        <M3IconButton>
          <M3Avatar src="https://randomuser.me/api/portraits/men/75.jpg" />
        </M3IconButton>
      </M3Box>
    </>
  );
}

function TopBar({
  account,
  setAccount,
}: {
  account: string;
  setAccount: (a: string) => void;
}) {
  return (
    <>
      <M3AppBar
        position="static"
        elevation={1}
        color="transparent"
        sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
      >
        {/* Logo */}
        <M3Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", gap: 2 }}
        >
          <M3Typography variant="titleLarge" sx={{ fontWeight: "bold" }}>
            nanoVOLTZ
          </M3Typography>

          {/* User Account */}
          <FormControl sx={{ minWidth: 160 }}>
            <Select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              size="small"
            >
              <M3MenuItem value="Sam Jones">Sam Jones</M3MenuItem>
              <M3MenuItem value="Alice Doe">Alice Doe</M3MenuItem>
            </Select>
          </FormControl>

          {/* Search Bar */}
          <M3Paper
            component="form"
            elevation={1}
            sx={{
              p: "2px 8px",
              display: "flex",
              alignItems: "center",
              width: { xs: 200, sm: 300, md: 550 }, // Responsive width for different screen sizes
              borderRadius: 4,
              // bgcolor: "background.paper",
              boxShadow: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, height: "20px" }}
              placeholder="Global Search"
              inputProps={{ "aria-label": "search emails" }}
            />
            <M3IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </M3IconButton>
          </M3Paper>

          <M3IconButton>
            <MoreVertIcon />
          </M3IconButton>
        </M3Toolbar>
      </M3AppBar>
    </>
  );
}

function InboxHeader() {
  return (
    <>
      <M3Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <M3IconButton sx={{ mt: 2, ml: 2, mb: 2, color: "black" }}>
          <RefreshIcon />
        </M3IconButton>
        <FormControl size="small" sx={{ mt: 2, mb: 2 }}>
          <Select value="Inbox" sx={{ height: 32 }}>
            <M3MenuItem value="Inbox">Inbox</M3MenuItem>
            <M3MenuItem value="Sent">Sent</M3MenuItem>
            <M3MenuItem value="Promotions">Promotions</M3MenuItem>
          </Select>
        </FormControl>
        {/* <M3Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", py: 2 }}
        >
          Inbox
        </M3Typography> */}
      </M3Box>
    </>
  );
}

function EmailFilters() {
  const [filter, setFilter] = React.useState("All");
  return (
    <>
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
            variant={filter === f ? "contained" : "outlined"}
            size="small"
            onClick={() => setFilter(f)}
          >
            {f}
          </M3Button>
        ))}

        {/* Why do we need clear? */}
        <M3Button size="small" sx={{ ml: "auto" }}>
          Clear
        </M3Button>
      </M3Box>
    </>
  );
}

function EmailList({
  selectedEmail,
  onSelectEmail,
}: {
  selectedEmail: (typeof emails)[0] | null;
  onSelectEmail: (email: (typeof emails)[0]) => void;
}) {
  return (
    <M3List sx={{ overflowY: "auto", flexGrow: 1 }}>
      {emails.map((email) => (
        <M3ListItem
          key={email.id}
          divider
          alignItems="flex-start"
          selected={selectedEmail?.id === email.id}
          onClick={() => onSelectEmail(email)}
        >
          <M3ListItemAvatar>
            <M3Avatar alt={email.sender} src={email.avatar} />
          </M3ListItemAvatar>

          <M3ListItemText>
            <M3Box sx={{ flex: 1, minWidth: 0 }}>
              <M3Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <M3Typography variant="bodySmall" noWrap>
                  {email.subject}
                </M3Typography>

                <M3Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <M3Typography variant="bodySmall" color="primary.light">
                    {email.time}
                  </M3Typography>

                  {email.threadCount > 0 && (
                    <M3Badge badgeContent={email.threadCount} color="primary" />
                  )}
                </M3Box>
              </M3Box>

              <M3Typography
                variant="bodySmall"
                sx={{ fontWeight: "bold", color: "primary.dark" }}
                noWrap
              >
                {email.sender}
              </M3Typography>

              <M3Typography variant="bodySmall" color="text.secondary" noWrap>
                {email.message.length > 50
                  ? email.message.substring(0, 50) + "..."
                  : email.message}
              </M3Typography>
            </M3Box>
          </M3ListItemText>
        </M3ListItem>
      ))}
    </M3List>
  );
}

function EmailContent({ email }: { email: (typeof emails)[0] | null }) {
  if (!email) {
    return (
      <M3Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <M3Typography variant="bodyLarge" color="text.secondary">
          Select an{" "}
          <M3Typography component="span" color="primary">
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
        p: 4,
        overflowY: "auto",
        bgcolor: "background.default",
      }}
    >
      {/* Subject */}
      <M3Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <M3Avatar src={email.avatar} />

        <M3Box sx={{ flexGrow: 1 }}>
          <M3Typography variant="bodySmall" sx={{ fontWeight: "bold" }}>
            {email.subject}
          </M3Typography>
        </M3Box>

        <M3Typography variant="bodySmall" color="text.secondary">
          {email.time}
        </M3Typography>
      </M3Box>

      {/* SENDER & RECIPIENT */}
      <M3Box sx={{ mb: 3 }}>
        <M3Typography variant="bodySmall" color="text.secondary">
          <strong>From:</strong> {email.sender}
        </M3Typography>
        <M3Typography variant="bodySmall" color="text.secondary">
          <strong>To:</strong> Me
        </M3Typography>
      </M3Box>

      {/* BODY */}
      <M3Typography variant="bodySmall" sx={{ whiteSpace: "pre-line" }}>
        {email.message}
      </M3Typography>
    </M3Box>
  );
}

export default App;
