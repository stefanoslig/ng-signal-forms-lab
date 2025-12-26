import { NgDocPage } from '@ng-doc/core';
import { FieldLogic } from './demos/field-logic';
import { ApplyLogic } from './demos/apply-logic';
import { ApplyEachLogic } from './demos/apply-each-logic';
import { ApplyWhenLogic } from './demos/apply-when-logic';

const FieldLogicPage: NgDocPage = {
  title: 'Field Logic',
  mdFile: ['./index.md'],
  demos: { FieldLogic, ApplyLogic, ApplyEachLogic, ApplyWhenLogic },
  order: 2,
};

export default FieldLogicPage;
