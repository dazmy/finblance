import { Component, Input } from '@angular/core';
import { PercentSaving } from '../../interfaces/PercentSaving';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() datas!: PercentSaving;
}
