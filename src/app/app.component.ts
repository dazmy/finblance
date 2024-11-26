import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { DecimalDirective } from './directives/decimal.directive';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, DecimalDirective, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
