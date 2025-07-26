export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePic: string | null;
  createdAt: Date;
  updatedAt: Date;
  referralCode: string;
  points: number;
  role: "customer" | "EO";
}
