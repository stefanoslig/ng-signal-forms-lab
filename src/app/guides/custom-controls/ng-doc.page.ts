import { NgDocPage } from '@ng-doc/core';
import { Slider } from './demos/slider';
import { CustomControlDemo } from './demos/custom-control-demo';

const CustomControlsPage: NgDocPage = {
  title: 'Custom Controls',
  mdFile: ['./index.md'],
  demos: { Slider, CustomControlDemo },
  order: 3,
};

export default CustomControlsPage;
