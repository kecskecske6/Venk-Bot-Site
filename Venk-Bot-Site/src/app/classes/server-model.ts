import { CustomCommand } from "../interfaces/custom-command";
import { Infraction } from "../interfaces/infraction";
import { ReactionMessage } from "../interfaces/reaction-message";
import { Server } from "../interfaces/server";
import { TempBan } from "../interfaces/temp-ban";

export class ServerModel implements Server {
  serverId = '';
  features = {
    deleteInvites: false,
    antiSpam: false
  };
  changelog = {
    channelCreate: false,
    channelDelete: false,
    channelUpdate: false,
    emojiCreate: false,
    emojiDelete: false,
    emojiUpdate: false,
    guildUpdate: false,
    inviteCreate: false,
    inviteDelete: false,
    roleCreate: false,
    roleDelete: false,
    roleUpdate: false,
    stickerCreate: false,
    stickerDelete: false,
    stickerUpdate: false
  };
  modLog = {
    guildBanAdd: false,
    guildBanRemove: false,
    guildMemberUpdate: false,
    messageDelete: false,
    messageDeleteBulk: false,
    messageUpdate: false
  };
  leaveLog = false;
  channels = {
    changelog: '',
    modLog: '',
    leaveLog: ''
  };
  reactionMessages: ReactionMessage[] = [];
  customCommands: CustomCommand[] = [];
  prefix = '';
  infractions: Infraction[] = [];
  tempBans: TempBan[] = [];
}
