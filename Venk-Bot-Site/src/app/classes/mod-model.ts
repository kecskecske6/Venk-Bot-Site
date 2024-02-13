import { Mod } from "../interfaces/mod";

export class ModModel implements Mod {
  authorId = 0;
  name = '';
  description = '';
  image = '';
  fileUrl = '';
  gameId = 0;
  uploadDate = new Date();
}
