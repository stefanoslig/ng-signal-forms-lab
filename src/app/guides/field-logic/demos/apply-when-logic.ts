import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import {
  applyEach,
  applyWhen,
  Field,
  form,
  max,
  min,
  required,
  schema,
} from '@angular/forms/signals';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';

interface ShippingFormModel {
  shipmentType: 'document' | 'package';
  packages: Package[];
  documents: Document[];
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

export type Document = {
  description: string;
  weight: number;
};

const packageSchema = schema<Package>((packagePath) => {
  required(packagePath.description, { message: 'Description is required' });
  required(packagePath.weight, { message: 'Weight is required' });
  min(packagePath.weight, 0.1, { message: 'Weight must be at least 0.1 kg' });
  max(packagePath.weight, 30, { message: 'Weight must be maximum 30 kg' });
  required(packagePath.dimensions, { message: 'Size is required' });
});

const documentSchema = schema<Document>((documentPath) => {
  required(documentPath.weight, { message: 'Weight is required' });
  min(documentPath.weight, 0.1, { message: 'Weight must be at least 0.1 kg' });
  max(documentPath.weight, 2, { message: 'Weight must be maximum 2 kg' });
});

@Component({
  selector: 'apply-when-logic',
  templateUrl: './apply-when-logic.html',
  imports: [Field, FormInspectorComponent, DemoLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyWhenLogic {
  protected readonly shippingForm = form(
    signal<ShippingFormModel>({
      shipmentType: 'package',
      packages: [],
      documents: [],
    }),
    schema<ShippingFormModel>((shippingPath) => {
      applyWhen(
        shippingPath.packages,
        () => this.shippingForm.shipmentType().value() === 'package',
        (packages) => {
          applyEach(packages, packageSchema);
        },
      );
      applyWhen(
        shippingPath.documents,
        () => this.shippingForm.shipmentType().value() === 'document',
        (documents) => {
          applyEach(documents, documentSchema);
        },
      );
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

  addDocument() {
    this.shippingForm
      .documents()
      .value.update((documents) => [...documents, { description: '', weight: 0 }]);
  }
}
