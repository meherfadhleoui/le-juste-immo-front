export interface Country {
  name: string;
  code: string;
  states: string[] | null;
  official_language: string[];
  capital: string;
  region: string;
  coordinates: string[];
}
