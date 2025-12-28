import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { applyEach, Field, form, max, min, required, schema } from '@angular/forms/signals';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';
import { FieldErrors } from '../../../ui/field-errors';

interface ShippingFormModel {
  packages: Package[];
}

export type Package = {
  description: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
};

const packageSchema = schema<Package>((packagePath) => {
  required(packagePath.description, { message: 'Description is required' });
  required(packagePath.weight, { message: 'Weight is required' });
  min(packagePath.weight, 0.1, { message: 'Weight must be at least 0.1 kg' });
  max(packagePath.weight, 30, { message: 'Weight must be maximum 30 kg' });
  required(packagePath.dimensions, { message: 'Size is required' });
});

@Component({
  selector: 'apply-each-logic',
  templateUrl: './apply-each-logic.html',
  imports: [Field, FormInspectorComponent, DemoLayout, FieldErrors],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyEachLogic {
  protected readonly shippingForm = form(
    signal<ShippingFormModel>({
      packages: [],
    }),
    schema<ShippingFormModel>((shippingPath) => {
      applyEach(shippingPath.packages, packageSchema);
    }),
  );

  addPackage() {
    this.shippingForm
      .packages()
      .value.update((packages) => [
        ...packages,
        { description: '', weight: 0, dimensions: { length: 0, width: 0, height: 0 } },
      ]);
  }
}
