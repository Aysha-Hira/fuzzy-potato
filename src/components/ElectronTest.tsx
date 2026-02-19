import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, Box, Divider } from "@mui/material";

export function ElectronTest() {
  //   const [version, setVersion] = useState<string>('');
  //   const [ping, setPing] = useState<string>('');

  //   useEffect(() => {
  //     // Check if running in Electron
  //     if (window.electron) {
  //       window.electron.getAppVersion().then(setVersion);

  //       // Listen for events
  //       window.electron.on('app-update', (data) => {
  //         console.log('Update available:', data);
  //       });

  //       return () => {
  //         window.electron.removeAllListeners('app-update');
  //       };
  //     }
  //   }, []);

  //   const handlePing = async () => {
  //     if (window.electron) {
  //       const result = await window.electron.ping();
  //       setPing(result);
  //     }
  //   };

  //   if (!window.electron) {
  //     return (
  //       <Paper sx={{ p: 2, m: 2 }}>
  //         <Typography>Running in browser (not Electron)</Typography>
  //       </Paper>
  //     );
  //   }

  //   return (
  //     <Paper sx={{ p: 2, m: 2 }}>
  //       <Typography variant="h6">Electron Info</Typography>
  //       <Typography>App Version: {version}</Typography>
  //       <Typography>Ping result: {ping}</Typography>
  //       <Button variant="contained" onClick={handlePing} sx={{ mt: 2 }}>
  //         Test IPC
  //       </Button>
  //     </Paper>
  //   );
  // }
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.electron) {
      window.electron.getSystemInfo().then(setInfo);
    }
  }, []);

  if (!window.electron) {
    return (
      <Paper sx={{ p: 2, m: 2 }}>
        <Typography>Running in browser (not Electron)</Typography>
      </Paper>
    );
  }

  const handlePing = async () => {
    const result = await window.electron.ping();
    alert(`Ping result: ${result}`);
  };

  const handleFileSelect = async () => {
    const filePath = await window.electron.selectFile();
    if (filePath) {
      alert(`Selected: ${filePath}`);
    }
  };

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography variant="bodyLarge" gutterBottom>
        Electron Info
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Button size="small" variant="filled" onClick={handlePing}>
          Test Ping
        </Button>
        <Button size="small" variant="outlined" onClick={handleFileSelect}>
          Select File
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            window.electron.showNotification("Hello", "This is a test!")
          }
        >
          Notify
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {info && (
        <Box sx={{ fontSize: "0.875rem" }}>
          <Typography>
            <strong>Platform:</strong> {info.platform}
          </Typography>
          <Typography>
            <strong>Electron:</strong> {info.electronVersion}
          </Typography>
          <Typography>
            <strong>Node:</strong> {info.nodeVersion}
          </Typography>
          <Typography>
            <strong>Memory:</strong> {(info.freeMemory / 1e9).toFixed(2)}GB /{" "}
            {(info.totalMemory / 1e9).toFixed(2)}GB
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
