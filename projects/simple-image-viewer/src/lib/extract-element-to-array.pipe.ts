import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractElsToArray'
})

export class ExtractElementToArrayPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any {
    if (!value || !value.length) {
      return value;
    }

    const [key] = args;
    if (!key) {
      return value;
    }

    return value.map(item => item[key]);
  }
}