export interface IMessage{
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    isRead: Boolean;
}