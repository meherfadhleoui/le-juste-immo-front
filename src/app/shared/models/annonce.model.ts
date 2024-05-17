import { Address } from './address.model';
import { User } from './user.models';

export interface Annonce {
  _id: string;
  superficiePieces: SuperficiePieces;
  caracteristiquesSupplementaires: CaracteristiquesSupplementaires;
  acces: Acces;
  detailsVenteViager: DetailsVenteViager;
  titre: string;
  reference: string;
  typeOffre: string;
  typeBien: string;
  principlePhoto: string;
  photos: string[];
  archived: boolean;
  activated: boolean;
  exported: boolean;
  createdAt: Date;
  updatedAt: Date;
  annonceur: User;
  adresseBien: AdresseBien;
  prix: Prix;
  superficieTotale: number;
  adresseMail: string;
  userName: string;
  telephone: string;
  descriptionDetaillee: string;
}

interface AdresseBien {
  ville: string;
  adresse: string;
  codePostal: string;
}

export interface Acces {
  numeroEtage: number;
  nbrTotalEtages: number;
  ascenseur: boolean;
}

export interface CaracteristiquesSupplementaires {
  terrasse: boolean;
  jardin: boolean;
  piscine: boolean;
  meuble: boolean;
}

export interface DetailsVenteViager {
  informationsVendeur: any[];
}

export interface SuperficiePieces {
  chambres: number;
  sallesDeBain: number;
  sallesDeau: number;
  pieces: number;
  balcon: number;
  garage: number;
}

export interface Prix {
  montant: number;
}
