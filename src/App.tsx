import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Toolbar,
  AppBar,
  ListItemIcon,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContactsIcon from "@mui/icons-material/PersonOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ThemeIcon from "@mui/icons-material/WbSunnyOutlined";
import PaletteSelectorIcon from "@mui/icons-material/PaletteOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// tESTING THEM
import EditOne from "@mui/icons-material/ModeEditOutlined"; // Selected

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

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <TopBar account={account} setAccount={setAccount} />

        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* First column containing Filters and Email lists*/}
          <Box
            sx={{
              width: 450,
              display: "flex",
              flexDirection: "column",
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            {/* Email Filters */}
            <EmailFilters />

            {/* Email List */}
            <EmailList />
          </Box>

          {/* Second Column containing Email Content */}
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              display: "flex",
              alignItems: "center", // ← Add this for vertical center
              justifyContent: "center", // horizontal center
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Select an{" "}
              {/* Component="span"  is same as saying <span></span> */}
              <Typography component="span" variant="body2" color="primary">
                email
              </Typography>{" "}
              to view its content
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function SideBar() {
  return (
    <>
      <Box
        sx={{
          width: 72,
          bgcolor: "background.paper" /* Whats paper*/,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <Avatar
          src="https://randomuser.me/api/portraits/men/75.jpg"
          sx={{ width: 48, height: 48, mb: 4 }}
        />
        {/* Edit Button */}
        <IconButton color="primary" sx={{ mb: 3 }}>
          <EditOne />
        </IconButton>
        {/* Inbox Button */}
        <IconButton color="primary" sx={{ mb: 3 }}>
          <EmailIcon />
        </IconButton>
        {/* Calender Button */}
        <IconButton sx={{ mb: 3 }}>
          <CalendarTodayIcon />
        </IconButton>
        {/* Contact Button */}
        {/* Contact Button */}
        <IconButton>
          <ContactsIcon />
        </IconButton>
        {/* For notification */}
        <Box sx={{ flexGrow: 1 }} />
        {/* <Badge badgeContent={25} color="error" sx={{ mb: 3 }}> */}{" "}
        {/* For notification */}
        <NotificationsIcon />
        {/* </Badge> */}
        {/* Theme Button */}
        <IconButton>
          <ThemeIcon />
        </IconButton>
        {/* Palette Button */}
        <IconButton>
          <PaletteSelectorIcon />
        </IconButton>
        {/* Settings Button */}
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <Avatar src="https://randomuser.me/api/portraits/men/75.jpg" />
      </Box>
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
      <AppBar
        position="static"
        elevation={1}
        color="transparent"
        sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
      >
        {/* Logo */}
        <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            nanoVOLTZ
          </Typography>

          {/* User Account */}
          <FormControl sx={{ minWidth: 160 }}>
            <Select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              size="small"
            >
              <MenuItem value="Sam Jones">Sam Jones</MenuItem>
              <MenuItem value="Alice Doe">Alice Doe</MenuItem>
            </Select>
          </FormControl>

          {/* Search Bar */}
          <Paper
            component="form"
            elevation={1}
            sx={{
              p: "2px 8px",
              display: "flex",
              alignItems: "center",
              width: { xs: 200, sm: 300, md: 550 }, // Responsive width for different screen sizes
              borderRadius: 4,
              bgcolor: "background.paper",
              boxShadow: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, height: "20px", }}
              placeholder="Global Search"
              inputProps={{ "aria-label": "search emails" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

function EmailFilters() {
  const [filter, setFilter] = React.useState("All");
  return (
    <>
      <Box
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
          <Button
            key={f}
            variant={filter === f ? "contained" : "outlined"}
            size="small"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}

        {/* Why do we need clear? */}
        <Button size="small" sx={{ ml: "auto" }}>
          Clear
        </Button>
      </Box>
    </>
  );
}

function EmailList() {
  return (
    <List
      sx={{
        overflowY: "auto",
        flexGrow: 1,
        bgcolor: "background.paper",
      }}
    >
      {emails.map(
        ({ id, avatar, sender, subject, message, time, threadCount }) => (
          <ListItem key={id} divider button alignItems="flex-start">
            {/* Avatar */}
            <ListItemAvatar>
              <Avatar alt={sender} src={avatar} />
            </ListItemAvatar>

            {/* Content */}
            <Box sx={{ width: "100%" }}>
              {/* Row 1: Subject + Time + ThreadCount? */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" noWrap>
                  {subject}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexShrink: 0,
                  }}
                >
                  <Typography variant="caption" color="primary.light">
                    {time}
                  </Typography>


                  {threadCount > 0 && (
                    <Badge badgeContent={threadCount} color="primary" />
                  )}
                </Box>
              </Box>

              {/* Row 2: Name */}
              {/* I want darker color here (TT) */}
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "primary.dark" }}
                noWrap
              >
                {sender}
              </Typography>

              {/* Row 3: Message */}
              <Typography variant="body2" color="text.secondary" noWrap>
                {
                  // Checks if the message is empty, if not, then checks if it longer than 100 characters, if it is,  truncates and adds "..."
                  // else just says no preview available
                  message
                    ? message.length > 50
                      ? message.substring(0, 50) + "..."
                      : message
                    : "No preview available"
                }
              </Typography>
            </Box>
          </ListItem>
        ),
      )}
    </List>
  );
}

export default App;
