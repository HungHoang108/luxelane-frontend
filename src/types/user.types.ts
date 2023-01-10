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
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface newUserType {
  file: FileList | null;
  user: newUserInputField;
}
