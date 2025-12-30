import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldNode } from './types';
import { FormNodeInspectorComponent } from './form-node-inspector';

@Component({
  selector: 'form-inspector',
  standalone: true,
  imports: [FormNodeInspectorComponent],
  template: `
    <section class="p-1 rounded-lg border bg-gray-950 text-gray-200">
      <header class="flex items-center justify-between gap-2 mb-3">
        <h2 class="m-0 text-lg font-semibold">Form Inspector</h2>
        <h2 class="m-0 text-lg font-semibold text-right">Field Tree</h2>
      </header>
      <form-node-inspector [node]="rootNode()" label="(root)" [expandByDefault]="true" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInspectorComponent {
  readonly root = input.required<any>();
  readonly rootNode = computed<FieldNode>(() => this.root()() as unknown as FieldNode);
}
