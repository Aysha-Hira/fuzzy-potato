// // export {};

// // declare global {
// //   interface Window {
// //     electron: {
// //       // ... existing methods ...
// //       email: {
// //         connect: (account: EmailAccount) => Promise<{ success: boolean; error?: string }>;
// //         fetch: (accountEmail: string, folder?: string, limit?: number) =>
// //           Promise<{ success: boolean; emails?: EmailMessage[]; error?: string }>;
// //         search: (accountEmail: string, criteria: any[], folder?: string) =>
// //           Promise<{ success: boolean; emails?: EmailMessage[]; error?: string }>;
// //         send: (accountEmail: string, to: string[], subject: string, body: string, html?: string) =>
// //           Promise<{ success: boolean; messageId?: string; error?: string }>;
// //         disconnect: (accountEmail: string) => Promise<{ success: boolean }>;
// //       };
// //     };
// //   }
// // }

// // interface EmailAccount {
// //   email: string;
// //   password: string;
// //   imapHost: string;
// //   imapPort: number;
// //   smtpHost: string;
// //   smtpPort: number;
// // }

// // interface EmailMessage {
// //   id: string;
// //   from: string;
// //   to: string[];
// //   subject: string;
// //   date: Date;
// //   text?: string;
// //   html?: string;
// //   attachments?: any[];
// //   flags: string[];
// //   uid: number;
// // }

// // src/electron.d.ts
// export {};

// interface EmailAccount {
//   email: string;
//   password: string;
//   imapHost: string;
//   imapPort: number;
//   smtpHost: string;
//   smtpPort: number;
// }

// type SearchCriteria = Record<string, unknown>;

// declare global {
//   interface Window {
//     electron: {
//       ping: () => Promise<string>;
//       getAppVersion: () => Promise<string>;
//       getPlatform: () => string;
//       minimizeWindow: () => void;
//       maximizeWindow: () => void;
//       closeWindow: () => void;
//       selectFile: () => Promise<string | null>;
//       readFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>;
//       saveFile: (content: string, filename: string) => Promise<{ success: boolean; path?: string; error?: string }>;
//       showNotification: (title: string, body: string) => void;
//       getSystemInfo: () => Promise<any>;

//       email: {
//         connect: (account: EmailAccount) => Promise<{ success: boolean; error?: string }>;
//         fetch: (accountEmail: string, folder?: string, limit?: number) =>
//           Promise<{ success: boolean; emails?: any[]; error?: string }>;
//         search: (accountEmail: string, criteria: SearchCriteria, folder?: string) =>
//           Promise<{ success: boolean; emails?: any[]; error?: string }>;
//         send: (accountEmail: string, to: string[], subject: string, body: string, html?: string) =>
//           Promise<{ success: boolean; messageId?: string; error?: string }>;
//         disconnect: (accountEmail: string) => Promise<{ success: boolean }>;
//         folders: (accountEmail: string) => Promise<{ success: boolean; folders?: string[]; error?: string }>;
//       };

//       on: (channel: string, callback: (...args: unknown[]) => void) => (() => void) | undefined;
//       removeAllListeners: (channel: string) => void;
//       send: (channel: string, ...args: unknown[]) => void;
//     };
//   }
// }

// src/electron.d.ts
import type { Email } from "./types/email";

export { };

interface EmailAccount {
  email: string;
  password: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
}

type SearchCriteria = Record<string, unknown>;

interface SystemInfo {
  platform: string;
  arch: string;
  version: string;
  electronVersion: string;
  chromeVersion: string;
  nodeVersion: string;
  cpus: number;
  totalMemory: number;
  freeMemory: number;
  homedir: string;
  hostname: string;
}

declare global {
  interface Window {
    electron: {
      // Basic test
      ping: () => Promise<string>;

      // App information
      getAppVersion: () => Promise<string>;
      getPlatform: () => string;

      // Window controls
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      closeWindow: () => void;

      // File system
      selectFile: () => Promise<string | null>;
      readFile: (
        filePath: string,
      ) => Promise<{ success: boolean; content?: string; error?: string }>;
      saveFile: (
        content: string,
        filename: string,
      ) => Promise<{ success: boolean; path?: string; error?: string }>;

      // Notifications
      showNotification: (title: string, body: string) => void;

      // System info
      getSystemInfo: () => Promise<SystemInfo>;

      // Email methods - now using proper Email type!
      email: {
        connect: (
          account: EmailAccount,
        ) => Promise<{ success: boolean; error?: string }>;
        fetch: (
          accountEmail: string,
          folder?: string,
          limit?: number,
        ) => Promise<{ success: boolean; emails?: Email[]; error?: string }>; // 👈 Email[] not any[]
        search: (
          accountEmail: string,
          criteria: SearchCriteria,
          folder?: string,
        ) => Promise<{ success: boolean; emails?: Email[]; error?: string }>; // 👈 Email[] not any[]
        send: (
          accountEmail: string,
          to: string[],
          subject: string,
          body: string,
          html?: string,
        ) => Promise<{ success: boolean; messageId?: string; error?: string }>;
        disconnect: (accountEmail: string) => Promise<{ success: boolean }>;
        folders: (
          accountEmail: string,
        ) => Promise<{ success: boolean; folders?: string[]; error?: string }>;
      };

      // Event listeners
      on: (
        channel: string,
        callback: (...args: unknown[]) => void,
      ) => (() => void) | undefined;
      removeAllListeners: (channel: string) => void;

      // Send message to main process
      send: (channel: string, ...args: unknown[]) => void;
    };
  }
}
