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
  annonceur?: User;
  adresseBien: AdresseBien;
  superficieTotale: number;
  adresseMail: string;
  userName: string;
  telephone: string;
  descriptionDetaillee: string;
  informationsFinanciers: InformationsFinanciers;
  honorairesAgence: HonorairesAgence;
  dpe: DPE;
  etat: string;
}

export interface AdresseBien {
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

export interface InformationsFinanciers {
  montant: number;
  mention: string;
  chargesCopropriete?: number;
  taxeFonciere?: number;
  depotDeGarantie?: number;
}

export interface HonorairesAgence {
  montant: number;
  Acquéreur: number;
  Vendeur: number;
  fraisEtatLieu?: number;
}

export interface DPE {
  consommationEnergetique: number;
  emissionsGaz: number;
  dateRealisation: Date;
  state: number;
  empty: boolean;
}
