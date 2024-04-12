import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToObject',
})
export class StringToObjectPipe implements PipeTransform {
  transform(array: any): { value: string }[] {
    if (!Array.isArray(array)) return [];

    return array.map((value) => ({ value }));
  }
}
