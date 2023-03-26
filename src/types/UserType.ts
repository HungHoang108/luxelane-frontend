export type Role = "admin" | "customer";

export interface UserType extends newUserInputField {
  id: number;
  role: Role;
}

export interface userReducerType {
  userList: UserType[];
  currentUser?: UserType;
  access_token?: string;
}

export interface newUserInputField {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  avatar: string;
}

export interface newUserType {
  file: File | null;
  user: newUserInputField;
}
