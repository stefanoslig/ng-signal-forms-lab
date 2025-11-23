import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'demo-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'demo-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoLayout {
  readonly layout = input<'row' | 'column'>('row');
}
