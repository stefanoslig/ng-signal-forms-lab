import { NgDocPage } from '@ng-doc/core';
import { SimpleForm } from './simple-form/simple-form';
import { FieldTree } from './simple-form/field-tree';
import { FieldLogic } from './simple-form/field-logic';

const SimpleFormPage: NgDocPage = {
  title: 'Simple Form',
  mdFile: ['./index.md'],
  order: 1,
  demos: { SimpleForm, FieldTree, FieldLogic },
  route: {
    children: [
      {
        path: 'simple-form',
        component: SimpleForm,
      },
      {
        path: 'field-tree',
        component: FieldTree,
      },
    ],
  },
};

export default SimpleFormPage;
