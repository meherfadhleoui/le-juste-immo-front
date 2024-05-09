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

export function appendObjectToFormData(formData: FormData, data: any, parentKey?: string) {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof value === 'object' && value !== null) {
        appendObjectToFormData(formData, value, fullKey); // Recursively append nested object
      } else {
        formData.append(fullKey, value); // Append value
      }
    }
  }
}
