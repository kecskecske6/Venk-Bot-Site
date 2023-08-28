import { ReactionRole } from "./reaction-role";

export interface ReactionMessage {
  id: number;
  channelId: string;
  messageLink?: string;
  roles: ReactionRole[];
}
