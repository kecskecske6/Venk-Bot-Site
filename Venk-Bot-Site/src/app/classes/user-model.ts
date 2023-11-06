import { User } from "../interfaces/user";

export class UserModel implements User {
  email = '';
  username = '';
  password = '';
  avatar = '';
  role = '';
  token = '';
  validated = false;
}
