import { Game } from "../interfaces/game";

export class GameModel implements Game {
  id = 0;
  name = '';
  releaseDate = new Date();
}
