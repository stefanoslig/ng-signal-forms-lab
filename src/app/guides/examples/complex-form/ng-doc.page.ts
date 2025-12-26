import { NgDocPage } from '@ng-doc/core';
import ExamplesCategory from '../ng-doc.category';
import { ComplexForm } from './complex-form';

const ComplexFormPage: NgDocPage = {
  title: `Complex Form`,
  mdFile: './index.md',
  demos: { ComplexForm },
  category: ExamplesCategory,
  order: 2,
};

export default ComplexFormPage;
