import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  apply,
  applyEach,
  applyWhen,
  createMetadataKey,
  Field,
  form,
  max,
  metadata,
  min,
  minLength,
  required,
  schema,
} from '@angular/forms/signals';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';
import { FieldErrors } from '../../../ui/field-errors';

interface ShippingFormModel {
  shipmentType: 'document' | 'package';
  sender: AddressContact;
  recipient: AddressContact;
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

export type AddressContact = {
  name: string;
  address: {
    country: string;
    city: string;
    postalCode: string;
    street: string;
  };
};

const addressContactSchema = schema<AddressContact>((addressPath) => {
  required(addressPath.name, { message: 'Name is required' });
  required(addressPath.address.country, { message: 'Country is required' });
  required(addressPath.address.city, { message: 'City is required' });
  required(addressPath.address.postalCode, { message: 'Postal code is required' });
  minLength(addressPath.address.postalCode, 5, {
    message: 'Postal code must be at least 5 characters',
  });
  required(addressPath.address.street, { message: 'Street is required' });
});

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
  selector: 'complex-form',
  templateUrl: './complex-form.html',
  imports: [Field, FormInspectorComponent, DemoLayout, FieldErrors],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexForm {
  protected readonly SAME_COUNTRY = createMetadataKey<boolean>();
  protected readonly shippingForm = form(
    signal<ShippingFormModel>({
      shipmentType: 'package',
      sender: {
        name: '',
        address: { country: '', city: '', postalCode: '', street: '' },
      },
      recipient: {
        name: '',
        address: { country: '', city: '', postalCode: '', street: '' },
      },
      packages: [],
      documents: [],
    }),
    schema<ShippingFormModel>((shippingPath) => {
      apply(shippingPath.sender, addressContactSchema);
      apply(shippingPath.recipient, addressContactSchema);
      metadata(shippingPath, this.SAME_COUNTRY, ({ valueOf }) => {
        const senderCountry = valueOf(shippingPath.sender.address.country);
        const recipientCountry = valueOf(shippingPath.recipient.address.country);
        return senderCountry === recipientCountry && senderCountry !== '';
      });
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
