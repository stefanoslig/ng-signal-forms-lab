import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FieldNode } from './types';

@Component({
  selector: 'form-node-inspector',
  imports: [JsonPipe],
  template: `
    <details [open]="expandByDefault()">
      <summary class="cursor-pointer">
        <span class="font-medium">{{ label() }}</span>
        <span
          class="ml-2 text-xs text-gray-950 px-1.5 py-0.5 rounded border"
          [class.bg-green-300]="node().valid()"
          [class.bg-red-300]="node().invalid()"
          [class.bg-yellow-300]="node().pending()"
        >
          valid: {{ node().valid() }} | invalid: {{ node().invalid() }} | pending:
          {{ node().pending() }}
        </span>
      </summary>

      <div class="mt-2 grid gap-2 pl-4">
        <div class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1 items-start text-gray-200">
          <div>
            <pre><code>value: {{ node().value() | json }}</code></pre>
          </div>
          <div>touched: {{ node().touched() }}</div>
          <div>dirty: {{ node().dirty() }}</div>
          <div>hidden: {{ node().hidden() }}</div>
          <div>readonly: {{ node().readonly() }}</div>
          <div>disabled: {{ node().disabled() }}</div>
          <details>
            <summary>disabledReasons: ({{ node().disabledReasons().length }})</summary>
            <pre><code>{{ node().disabledReasons() | json }}</code></pre>
          </details>
          <details>
            <summary>errors: ({{ node().errors().length }})</summary>
            <pre><code>{{ node().errors() | json }}</code></pre>
          </details>
          <details>
            <summary>errorSummary: ({{ node().errorSummary().length }})</summary>
            <pre><code>{{ node().errorSummary() | json }}</code></pre>
          </details>
          <div>
            <pre><code>meta: {{
                {
                  min: this.read(node().min),
                  max: this.read(node().max),
                  minLen: this.read(node().minLength),
                  maxLen: this.read(node().maxLength),
                  pattern: this.read(node().pattern),
                  required: this.read(node().required),
                 } | json
              }}
            </code></pre>
          </div>
        </div>

        <div class="mt-2">
          <h4 class="text-sm font-semibold mb-1">Children</h4>

          @for (c of children(); track c.key) {
            <div class="border rounded p-2 mb-2 border-b">
              <form-node-inspector [node]="c.node" [label]="c.key" [expandByDefault]="false">
              </form-node-inspector>
            </div>
          } @empty {
            <p class="text-xs text-gray-200">— none —</p>
          }
        </div>
      </div>
    </details>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormNodeInspectorComponent {
  readonly node = input.required<FieldNode>();
  readonly label = input('(node)');
  readonly expandByDefault = input(false);

  read<T>(meta: (() => T) | undefined): T | undefined {
    return typeof meta === 'function' ? meta() : undefined;
  }

  children = () => {
    const arr: Array<{ key: string; node: FieldNode }> = [];
    const list: FieldNode[] = Array.from(this.node().structure.children() ?? []);
    for (const child of list) {
      const key = child?.keyInParent();
      arr.push({ key: String(key), node: child });
    }
    return arr;
  };
}
