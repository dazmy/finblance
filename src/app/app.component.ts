import { Component, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { DecimalDirective } from './directives/decimal.directive';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaxPercentDirective } from './directives/max-percent.directive';
import { PercentSaving } from './interfaces/PercentSaving';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, DecimalDirective, ReactiveFormsModule, MaxPercentDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  money = new FormControl('');
  typeSaving = new FormControl('');
  listTypeSaving = new FormArray<FormControl<PercentSaving | null>>([]);
  isCalculate = false;
  colors: string[] = ['#90EE90', '#F4D738', '#FFA6F6'];
  lastModified: string = '';
  isErrorMoney: boolean = false;
  isErrorTypeSaving: boolean = false;
  isErrorListTypeSaving: boolean = false;

  constructor() {}

  ngOnInit() {
    const moneyLs = localStorage.getItem('money');
    const listTypeSavingLs = localStorage.getItem('listTypeSaving');
    const lastModifiedLs = localStorage.getItem('lastModified');

    if (moneyLs) this.money.setValue(moneyLs);
    if (listTypeSavingLs) {
      const listJson = JSON.parse(listTypeSavingLs);
      listJson.forEach((data: PercentSaving) => {
        const control = new FormControl(data);
        this.listTypeSaving.push(control);
      });
      this.isCalculate = true;
    }
    if (lastModifiedLs) this.lastModified = lastModifiedLs;
  }

  addTypeSaving() {
    if (!this.typeSaving.value || !this.money.value) {
      this.isErrorTypeSaving = !this.typeSaving.value;
      this.isErrorMoney = !this.money.value;
      return;
    }

    this.isCalculate = false;
    this.isErrorTypeSaving = false;
    this.isErrorMoney = false;
    const data: PercentSaving = {
      name: this.typeSaving.value,
      percent: 0,
      savings: 0,
      color: this.generateColor(this.listTypeSaving.value.length),
    }
    const control = new FormControl(data);
    this.listTypeSaving.push(control);
    this.typeSaving.setValue('');
  }

  generateColor(len: number) {
      return this.colors[len % 3];
  }

  setPercent(event: Event, index: number) {
    this.isCalculate = false;
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

  reset() {
    if (!this.listTypeSaving.length) return;

    Swal.fire({
      icon: 'question',
      title: 'Ingin mereset perubahan?',
      confirmButtonText: 'Ya, reset!',
      confirmButtonColor: '#EF4444',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isCalculate = false;
        this.money.setValue('');
        this.listTypeSaving.clear();
        localStorage.clear();
        Swal.fire({
          title: 'Sukses Reset!',
          text: 'Perubahan telah tereset.',
          icon: 'success',
          timer: 2000
        });
      }
    });
  }

  calculate() {
    if (!this.money.value || !this.listTypeSaving.length) {
      this.isErrorMoney = !this.money.value;
      this.isErrorListTypeSaving = !this.listTypeSaving.length;
      return;
    }

    if (this.checkPercent() > 100) {
      Swal.fire({
        icon: 'error',
        text: 'Persen melebihi 100%',
        timer: 2000
      });
      return;
    }
    
    this.isErrorMoney = false;
    this.isErrorTypeSaving = false;
    this.isErrorListTypeSaving = false;
    this.listTypeSaving.value.forEach(data => {
      if (data && this.money.value) {
        const noComma = this.money.value.replace(/,/g, '');
        data.savings = data.percent / 100 * parseInt(noComma);
      };
    });
    
    // set to localStorage
    localStorage.setItem('money', this.money.value!);
    localStorage.setItem('listTypeSaving', JSON.stringify(this.listTypeSaving.value));
    const dateString = new Date().toString();
    localStorage.setItem('lastModified', dateString);
    this.lastModified = dateString;
    this.isCalculate = true;
  }

  checkPercent() {
    return this.listTypeSaving.value.reduce((total, item) => total + (item?.percent || 0) ,0);
  }
}
