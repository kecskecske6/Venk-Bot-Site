import { ReactionRole } from ".";

export interface ReactionMessage {
    id: number;
    channelId: string;
    messageLink?: string;
    roles: ReactionRole[];
}