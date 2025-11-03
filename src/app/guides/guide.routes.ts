import { Routes } from '@angular/router';
import { NG_DOC_ROUTING } from '@ng-doc/generated';

import { GuideComponent } from './guide.component';

const routes: Routes = [
  { path: '', redirectTo: 'core-concepts', pathMatch: 'full' },
  { path: '', component: GuideComponent, children: NG_DOC_ROUTING },
];

export default routes;
