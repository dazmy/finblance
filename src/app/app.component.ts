import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { DecimalDirective } from './directives/decimal.directive';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

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
  listTypeSaving = new FormArray<FormControl>([]);

  addTypeSaving() {
    if (!this.typeSaving.value || !this.money.value) {
      return;
    }
    const control = new FormControl(this.typeSaving.value);
    this.listTypeSaving.push(control);
    this.typeSaving.setValue('');
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
