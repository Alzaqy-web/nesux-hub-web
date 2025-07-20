import { User } from "./user";
import { Ticket } from "./ticket";
import { Tracing } from "trace_events";

export interface Event {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  category: string;
  startDate: string | Date;
  endDate: string | Date;
  location: string;
  userId: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  tickets: Ticket[];

  user?: Omit<User, "password">;
}
