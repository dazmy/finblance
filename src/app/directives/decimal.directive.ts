import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDecimal]',
  standalone: true,
})
export class DecimalDirective {
  @Input('limitDecimal') decimalLength = 2; // Default to 2 decimal places

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onEvent($event: any) {
    const valArray = this.el.nativeElement.value.split('.');
    for (let i = 0; i < valArray.length; ++i) {
      valArray[i] = valArray[i].replace(/\D/g, '');
    }

    let newVal = '';

    if (valArray.length === 0) {
      newVal = '';
    } else {
      const matches = valArray[0].match(/[0-9]{3}/mig);

      if (matches !== null && valArray[0].length > 3) {
        // @ts-ignore
        const commaGroups = Array.from(Array.from(valArray[0]).reverse().join('').match(/[0-9]{3}/mig).join()).reverse().join('');
        const replacement = valArray[0].slice(0, valArray[0].length - commaGroups.replace(/\D/g, '').length);

        newVal = (replacement.length > 0 ? replacement + ',' : '') + commaGroups;
      } else {
        newVal = valArray[0];
      }

      if (valArray.length > 1) {
        newVal += '.' + valArray[1].substring(0, this.decimalLength);
      }
    }
    this.el.nativeElement.value = newVal;
  }

}