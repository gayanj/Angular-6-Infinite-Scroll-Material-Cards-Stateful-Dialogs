import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MaterialModalComponent} from '../material-modal/material-modal.component'; // CrisisDetailComponent
import {InfinityScrollComponent} from './infinity-scroll.component'; // CrisisListComponent

const infinityScrollRoutes: Routes = [
  {
    path: 'materials',
    component: InfinityScrollComponent,
    children: [
      {
        path: ':id',
        component: MaterialModalComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(infinityScrollRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InfinityScrollRoutingModule {
}
