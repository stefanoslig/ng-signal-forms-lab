import { NgDocPage } from '@ng-doc/core';
import ExamplesCategory from '../ng-doc.category';
import { SimpleForm } from './simple-form';

const SimpleFormPage: NgDocPage = {
  title: `Simple Form`,
  mdFile: './index.md',
  demos: { SimpleForm },
  category: ExamplesCategory,
  order: 1,
};

export default SimpleFormPage;
