import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colourCode',
  standalone: true
})
export class ColourCodePipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'ATC':
        return 'blue';
      case 'TC':
        return 'green';
      case 'STC':
        return 'orange';
      default:
        return 'red';
    }
  }

}
