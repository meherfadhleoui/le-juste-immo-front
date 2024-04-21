import { Role } from '../enums/role.enum';
import { Address } from './address.model';

export interface Agency {
  _id: string;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  address: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}
