import { Role } from '../enums/role.enum';
import { Address } from './address.model';

export interface User {
  _id: string;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}
