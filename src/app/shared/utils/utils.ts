import { FranceCity } from '../models/address.model';

export const FRANCE_LABEL = 'FRANCE';

export function getFranceCitiesModified(
  franceCities: FranceCity[],
): (FranceCity & { codeAndCity: string })[] {
  return franceCities.map((city) => {
    return {
      ...city,
      codeAndCity: buildCodeAndCity(city.postCode, city.locationLabel),
    };
  });
}

export function buildCodeAndCity(postCode: string, locationLabel: string) {
  return postCode + ' - ' + locationLabel;
}

export function convertToNumber(value: any): number | null {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) ? parsedValue : null;
}
