import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'demo-layout',
  standalone: true,
  templateUrl: 'demo-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoLayout {
  readonly layout = input<'row' | 'column'>('row');
}
