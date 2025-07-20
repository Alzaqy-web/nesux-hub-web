export interface User {
  id: number;
  name: String;
  email: String;
  password: String;
  profilePic: String | null;
  createdAt: Date;
  updatedAt: Date;
}
