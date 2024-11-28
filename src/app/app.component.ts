import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { DecimalDirective } from './directives/decimal.directive';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaxPercentDirective } from './directives/max-percent.directive';
import { PercentSaving } from './interfaces/PercentSaving';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, DecimalDirective, ReactiveFormsModule, MaxPercentDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  money = new FormControl('');
  typeSaving = new FormControl('');
  listTypeSaving = new FormArray<FormControl<PercentSaving | null>>([]);
  isCalculate = false;

  addTypeSaving() {
    if (!this.typeSaving.value || !this.money.value) {
      return;
    }

    this.isCalculate = false;
    const data: PercentSaving = {
      name: this.typeSaving.value,
      percent: 0,
      savings: 0,
    }
    const control = new FormControl(data);
    this.listTypeSaving.push(control);
    this.typeSaving.setValue('');
  }

  setPercent(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const control = this.listTypeSaving.at(index);
    if (control && control.value) {
      control.value.percent = parseInt(inputElement.value) || 0;
    }
  }

  deleteTypeSaving(index: number) {
    this.isCalculate = false;
    this.listTypeSaving.removeAt(index);
  }

  calculate() {
    this.listTypeSaving.value.forEach(data => {
      if (data && this.money.value) {
        const noComma = this.money.value.replace(/,/g, '');
        data.savings = data.percent / 100 * parseInt(noComma);
      };
    });
    this.isCalculate = true;
  }
}
