import { User } from "../interfaces/user";

export class UserModel implements User {
  userId = '';
  username = '';
  avatar = '';
  guilds = [];
}
