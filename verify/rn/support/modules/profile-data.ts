import type { Profile, ProfileReader } from "./profile-contract";
export declare class HttpProfileReader implements ProfileReader {
  constructor(client: object);
  load(id: string): Promise<Profile>;
}
