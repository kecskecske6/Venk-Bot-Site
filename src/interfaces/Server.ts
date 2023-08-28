import { CustomCommand, Infraction, ReactionMessage, TempBan } from ".";

export interface Server {
    serverId: string;
    features: {
        deleteInvites: boolean;
        antiSpam: boolean;
    };
    changelog: {
        channelCreate: boolean;
        channelDelete: boolean;
        channelUpdate: boolean;
        emojiCreate: boolean;
        emojiDelete: boolean;
        emojiUpdate: boolean;
        guildUpdate: boolean;
        inviteCreate: boolean;
        inviteDelete: boolean;
        roleCreate: boolean;
        roleDelete: boolean;
        roleUpdate: boolean;
        stickerCreate: boolean;
        stickerDelete: boolean;
        stickerUpdate: boolean;
    };
    modLog: {
        guildBanAdd: boolean;
        guildBanRemove: boolean;
        guildMemberUpdate: boolean;
        messageDelete: boolean;
        messageDeleteBulk: boolean;
        messageUpdate: boolean;
    };
    leaveLog: boolean;
    channels: {
        changelog: string;
        modLog: string;
        leaveLog: string;
    }
    reactionMessages: ReactionMessage[];
    customCommands: CustomCommand[];
    prefix: string;
    infractions: Infraction[];
    tempBans: TempBan[];
}