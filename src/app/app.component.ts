import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { DecimalDirective } from './directives/decimal.directive';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

interface PercentSaving {
  name?: string;
  percent?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, DecimalDirective, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  money = new FormControl('');
  typeSaving = new FormControl('');
  listTypeSaving = new FormArray<FormControl<PercentSaving | null>>([]);

  addTypeSaving() {
    if (!this.typeSaving.value || !this.money.value) {
      return;
    }

    const data: PercentSaving = {
      name: this.typeSaving.value,
      percent: 0,
    }
    const control = new FormControl(data);
    this.listTypeSaving.push(control);
    this.typeSaving.setValue('');
  }

  setPercent(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const control = this.listTypeSaving.at(index);
    if (control && control.value) {
      control.value.percent = parseInt(inputElement.value);
    }
  }

  deleteTypeSaving(index: number) {
    this.listTypeSaving.removeAt(index);
  }

  calculate() {
    console.clear();
    console.log(this.money.value);
    console.log(this.typeSaving.value);
    console.log(this.listTypeSaving.value.length)
  }
}
