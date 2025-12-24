import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { apply, Field, form, minLength, required, schema } from '@angular/forms/signals';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';

interface ShippingFormModel {
  sender: AddressContact;
  recipient: AddressContact;
}

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

@Component({
  selector: 'apply-logic',
  templateUrl: './apply-logic.html',
  imports: [Field, FormInspectorComponent, DemoLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyLogic {
  protected readonly shippingForm = form(
    signal<ShippingFormModel>({
      sender: {
        name: '',
        address: { country: '', city: '', postalCode: '', street: '' },
      },
      recipient: {
        name: '',
        address: { country: '', city: '', postalCode: '', street: '' },
      },
    }),
    schema<ShippingFormModel>((shippingPath) => {
      apply(shippingPath.sender, addressContactSchema);
      apply(shippingPath.recipient, addressContactSchema);
    }),
  );
}
