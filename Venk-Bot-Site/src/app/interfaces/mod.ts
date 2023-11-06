import { Category } from "./category";
import { File } from "./file";
import { User } from "./user";

export interface Mod {
  authors: User[];
  name: string;
  description: string;
  image: string;
  categories: Category[];
  files: File[];
  game: string;
}
