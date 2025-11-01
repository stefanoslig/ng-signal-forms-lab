import { NgDocPage } from '@ng-doc/core';
import { FieldTree } from './demos/field-tree';
import { FieldLogic } from './demos/field-logic';

const CoreConceptsPage: NgDocPage = {
  title: 'Core Concepts',
  mdFile: ['./index.md'],
  order: 1,
  demos: { FieldTree, FieldLogic },
  route: {
    children: [
      {
        path: 'field-tree',
        component: FieldTree,
      },
    ],
  },
};

export default CoreConceptsPage;
