import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxPercent]',
  standalone: true
})
export class MaxPercentDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onEvent($event: any) {
    let valueInput = this.el.nativeElement.value;
    valueInput = valueInput.replace(/[^0-9]/g, '');
    let newVal = '';
    if (valueInput) {
      if (valueInput <= 100) {
        newVal = valueInput;
      }
    }

    this.el.nativeElement.value = newVal;
  }
}
