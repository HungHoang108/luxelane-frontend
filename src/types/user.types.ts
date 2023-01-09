export type Role = "admin" | "customer";

export interface UserType {
  id: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: Role;
}

export interface userReducerType {
  userList: UserType[]
  currentUser?: UserType
  access_token?: string
}