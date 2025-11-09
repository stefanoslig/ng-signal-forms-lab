import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { FieldNode } from './types';
import { FormNodeInspectorComponent } from './form-node-inspector';

@Component({
  selector: 'form-inspector',
  standalone: true,
  imports: [CommonModule, FormNodeInspectorComponent],
  template: `
    <section class="p-3 rounded-lg border">
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
  readonly root = input.required<FieldTree<any>>();
  readonly rootNode = computed<FieldNode>(() => this.root()() as unknown as FieldNode);
}
