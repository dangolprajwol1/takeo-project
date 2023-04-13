export interface UserResponse {
  _id: string;
  username: string;
  password: string;
  email: string;
  phone: number;
  activated: boolean;
  created: Date;
  __v: number;
}

export interface TokenInput {
  username: string;
  id: string;
}
