import { Role } from '../enums/role.enum';

export interface User {
  _id: string;
  role: Role;
  email: String;
  firstName: String;
  lastName: string;
  phone: String;
  avatar: string;
  address: {
    libelleVoie: string;
    pays: string;
    codePostal: string;
  };
  billingAddress: {
    libelleVoie: string;
    pays: string;
    codePostal: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
