export interface AgencyFilter {
  nomAgence: string;
  address: {
    pays: string;
    codePostal: string;
    city: string;
  };
}
