import { User } from "./user";

export interface LoginPayload extends Omit<User, "password"> {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: LoginPayload;
  }
}
