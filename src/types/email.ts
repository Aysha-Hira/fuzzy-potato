import type { EmailAttachment } from "./emailAttachments";

// like Schema 
export interface Email {
    id: number,
    avatar: string,
    subject: string,
    sender: string,
    recipient: string[], // since it could be multiple people
    message?: string,
    time: Date,
    threadCount: number,
    labels: string[],
    attachments: EmailAttachment[],
    category: string,
    isRead: boolean,
    isStarred: boolean,
    isImportant: boolean,
    isDraft: boolean,
    isDeleted: boolean,
}