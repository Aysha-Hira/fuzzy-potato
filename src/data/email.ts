import type { Email } from "../types/email";

export const emails: Email[] = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    subject: "New Business Opportunities",
    sender: "Jack Smith",
    recipient: ["Sam Jones"],
    message: `Hi Sam,

Hope this email finds you well. I wanted to discuss some new business opportunities in the upcoming quarter. Here are the points I have in mind:

- Expanding our marketing efforts in Q2
- Exploring partnerships with local vendors
- Optimizing our supply chain for faster delivery

Please let me know your thoughts and availability for a quick call.

Best regards,
Jack`,
    time: new Date(),
    threadCount: 3,
    labels: ["Work", "Important"],
    attachments: [],
    category: "Inbox",
    isRead: false,
    isStarred: true,
    isImportant: true,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    subject: "RE: Project Progress",
    sender: "Sarah Pruett",
    recipient: ["Sam Jones"],
    message: `Hi Sam,

This is a friendly reminder regarding the deliverables for the project due next week. Kindly ensure the following:

1. All tasks are updated in the tracker
2. Any pending approvals are completed
3. The team is aligned on deadlines

Let me know if you need any clarification.

Thanks,
Sarah`,
    time: new Date("2026-02-12T10:00:00Z"),
    threadCount: 2,
    labels: ["Work"],
    attachments: [
      {
        filename: "ProjectTracker.xlsx",
        contentType: "excel",
        size: 42000,
        partId: "",
      },
    ],
    category: "Inbox",
    isRead: true,
    isStarred: false,
    isImportant: false,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    subject: "LPO Created",
    sender: "Jasmine Fields",
    recipient: ["Sam Jones"],
    message: `Hello Sam,

The issued LPO for the new purchase order has been created. Could you please review and sign it so we can proceed with procurement?

Attachment: LPO.pdf

Kind regards,
Jasmine`,
    time: new Date("2026-02-12T08:30:00Z"),
    threadCount: 5,
    labels: ["Finance", "Urgent"],
    attachments: [
      { filename: "LPO.pdf", contentType: "pdf", size: 120000, partId: "" },
    ],
    category: "Inbox",
    isRead: false,
    isStarred: true,
    isImportant: true,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    subject: "Insurance Requested Documents",
    sender: "Dan Trovalds",
    recipient: ["Sam Jones"],
    message: `Dear Sam,

I hope you are doing well. Could you kindly provide the requested insurance documents at your earliest convenience? This will help us process the claim faster.

Thank you,
Dan`,
    time: new Date("2026-02-02T12:00:00Z"),
    threadCount: 1,
    labels: ["Personal"],
    attachments: [],
    category: "Inbox",
    isRead: true,
    isStarred: false,
    isImportant: false,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    subject: "Update Request",
    sender: "Christine Woods",
    recipient: ["Sam Jones"],
    message: `Hi Sam,

Could you please prepare a detailed project update report for the board meeting next week? Make sure to include:

- Current progress on milestones
- Risks or blockers
- Resource allocation

Appreciate your efforts on this.

Best,
Christine`,
    time: new Date("2025-12-22T09:00:00Z"),
    threadCount: 2,
    labels: ["Work"],
    attachments: [],
    category: "Inbox",
    isRead: false,
    isStarred: false,
    isImportant: true,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    subject: "Team Meeting Schedule",
    sender: "Michael Lee",
    recipient: ["Sam Jones"],
    message: `Hi Sam,

The weekly team meeting has been rescheduled to Friday at 10 AM. Please confirm your availability.

Thanks,
Michael`,
    time: new Date("2025-12-21T10:00:00Z"),
    threadCount: 1,
    labels: ["Work", "Meetings"],
    attachments: [],
    category: "Inbox",
    isRead: true,
    isStarred: false,
    isImportant: false,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    subject: "Invoice Attached",
    sender: "Emily Carter",
    recipient: ["Sam Jones"],
    message: `Hello Sam,

Please find attached the invoice for last month's services. Let me know if any corrections are needed.

Attachment: Invoice_Dec.pdf

Thanks,
Emily`,
    time: new Date("2025-12-20T15:30:00Z"),
    threadCount: 1,
    labels: ["Finance"],
    attachments: [
      {
        filename: "Invoice_Dec.pdf",
        contentType: "pdf",
        size: 95000,
        partId: "",
      },
    ],
    category: "Inbox",
    isRead: false,
    isStarred: false,
    isImportant: false,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    subject: "Client Feedback",
    sender: "Robert Johnson",
    recipient: ["Sam Jones"],
    message: `Hi Sam,

The client provided feedback on the recent project. Overall, they are satisfied but requested minor changes in the design:

- Adjust color palette as per branding
- Update homepage layout
- Review mobile responsiveness

Please make the necessary updates.

Regards,
Robert`,
    time: new Date("2025-12-19T11:00:00Z"),
    threadCount: 3,
    labels: ["Work", "Client"],
    attachments: [],
    category: "Inbox",
    isRead: false,
    isStarred: true,
    isImportant: true,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 9,
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    subject: "Holiday Greetings",
    sender: "Sophia Martinez",
    recipient: ["Sam Jones"],
    message: `Dear Sam,

Wishing you and your family a wonderful holiday season and a very happy New Year! 🎉

Enjoy the festivities and stay safe.

Best wishes,
Sophia`,
    time: new Date("2025-12-18T08:00:00Z"),
    threadCount: 0,
    labels: ["Personal", "Holiday"],
    attachments: [],
    category: "Inbox",
    isRead: true,
    isStarred: false,
    isImportant: false,
    isDraft: false,
    isDeleted: false,
  },
  {
    id: 10,
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    subject: "System Maintenance Notice",
    sender: "David Kim",
    recipient: ["Sam Jones"],
    message: `Hello Sam,

Please note that the system will undergo maintenance this weekend. Save your work and log out before 6 PM Friday to avoid data loss.

Thank you for your cooperation.

Regards,
David`,
    time: new Date("2025-12-17T09:00:00Z"),
    threadCount: 1,
    labels: ["Work", "IT"],
    attachments: [],
    category: "Inbox",
    isRead: true,
    isStarred: false,
    isImportant: false,
    isDraft: false,
    isDeleted: false,
  },
];