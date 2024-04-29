export interface Address {
  libelleVoie: string;
  pays: string;
  codePostal: string;
  city: string;
}

export interface Country {
  id: string;
  countryLabel: string;
}

export interface FranceCity {
  id: string;
  locationLabel: string;
  postCode: string;
}
