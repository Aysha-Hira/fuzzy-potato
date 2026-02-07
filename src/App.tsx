import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
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

const emails = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    subject: "New Business Opportunities",
    sender: "Jack Smith",
    snippet: "Dear Sam, Hope this email finds you well. I would like t...",
    time: "Now",
    unreadCount: 3,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    subject: "RE: Project Progress",
    sender: "Sarah Pruett",
    snippet: "Reminder on the mentioned bell...",
    time: "Yesterday",
    unreadCount: 2,
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    subject: "LPO Created",
    sender: "Jasmine Fields",
    snippet:
      "Hello Sam, Cloud you please sign the issued LPO for the new pur...",
    time: "Yesterday",
    unreadCount: 5,
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    subject: "Insurance Requested Documents",
    sender: "Dan Trovalds",
    snippet: "Dear Sam, I hope my message finds you in your best health ...",
    time: "02/Feb/2026",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    subject: "Update Request",
    sender: "Christine Woods",
    snippet: "Dear Sam, I would like you to prepare a detailed project up...",
    time: "22/Dec/2025",
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

        {/* Second column? */}
        <Box sx={{ width: 450 }}>
          {/* Email Filters */}
          <EmailFilters />

          {/* Email List */}
          <EmailList />
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
        {/* Edit Button */}
        <IconButton
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.light",
            borderRadius: 3,
            color: "primary.dark",
            "&:hover": {
              bgcolor: "primary.dark",
              color: "white",
            },
          }}
        >
          <EditOne />
        </IconButton>

        {/* Inbox Button */}
        <IconButton color="primary">
          <EmailIcon />
        </IconButton>

        {/* Calender Button */}
        <IconButton>
          <CalendarTodayIcon />
        </IconButton>

        {/* Contact Button */}
        <IconButton>
          <ContactsIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {/* For notification */}
        <Badge badgeContent={25} color="error">
          {" "}
          <NotificationsIcon />
        </Badge>

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
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
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
            sx={{
              p: "2px 8px",
              display: "flex",
              alignItems: "center",
              width: 300,
              borderRadius: 4,
              bgcolor: "background.paper",
              boxShadow: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
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
        <Checkbox />
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
        <Button size="small" sx={{ ml: "auto" }}>
          Clear
        </Button>
      </Box>
    </>
  );
}

function EmailList() {
  return (
    <>
      <List
        sx={{ overflowY: "auto", flexGrow: 1, bgcolor: "background.paper" }}
      >
        {emails.map(
          ({ id, avatar, sender, subject, snippet, time, unreadCount }) => (
            <ListItem
              key={id}
              alignItems="flex-start"
              secondaryAction={
                <Box sx={{ textAlign: "right", minWidth: 70 }}>
                  <Typography variant="caption" color="text.secondary">
                    {time}
                  </Typography>
                  {unreadCount && (
                    <Badge
                      badgeContent={unreadCount}
                      color="primary"
                      sx={{ mt: 0.5 }}
                    />
                  )}
                </Box>
              }
              divider
              button
            >
              <ListItemAvatar>
                <Avatar alt={sender} src={avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold" }}>{sender}</Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                      {subject}
                    </Typography>
                    {" — " + snippet}
                  </>
                }
              />
            </ListItem>
          ),
        )}
      </List>
    </>
  );
}

export default App;
