import { DeleteType } from '.';

export interface IUserId {
  userId: string;
}

export interface IUser extends IUserId, DeleteType {
  name: string;
  avatar?: string;
}
