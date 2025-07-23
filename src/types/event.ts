export interface Event {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  category: string;
  location: string;
  startDate: Date;
  endDate: Date;
  userId: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
