import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  InputComponent,
  SwitchComponent,
} from '@eagami/ui';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    InputComponent,
    SwitchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly createdCount = signal(0);

  protected onCreate(): void {
    this.createdCount.update(n => n + 1);
  }
}
