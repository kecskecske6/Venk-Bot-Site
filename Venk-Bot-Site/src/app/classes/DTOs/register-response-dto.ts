import { MessageDTO } from "./message-dto";

export class RegisterResponseDTO {
  success = false;
  messages: MessageDTO[] = [];
}
