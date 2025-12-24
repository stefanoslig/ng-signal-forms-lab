import { NgDocPage } from '@ng-doc/core';
import { FieldLogic } from './demos/field-logic';
import { ApplyLogic } from './demos/apply-logic';

const FieldLogicPage: NgDocPage = {
  title: 'Field Logic',
  mdFile: ['./index.md'],
  demos: { FieldLogic, ApplyLogic },
  order: 2,
};

export default FieldLogicPage;
