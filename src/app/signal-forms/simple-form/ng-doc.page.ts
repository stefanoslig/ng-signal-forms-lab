import { NgDocPage } from '@ng-doc/core';
import { SimpleForm } from './simple-form/simple-form';

const SimpleFormPage: NgDocPage = {
  title: 'Simple Form',
  mdFile: ['./index.md'],
  order: 1,
  demos: { SimpleForm },
  route: {
    children: [
      {
        path: 'simple-form',
        component: SimpleForm,
      },
    ],
  },
};

export default SimpleFormPage;
