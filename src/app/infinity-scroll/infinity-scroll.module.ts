import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {DataService} from '../services/data.service';

import {InfinityScrollComponent} from './infinity-scroll.component';
import {MaterialModalComponent} from '../material-modal/material-modal.component';

import {InfinityScrollRoutingModule} from './infinity-scroll-routing.module';
import {MaterialModule} from '../material-module/material.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    InfinityScrollRoutingModule
  ],
  declarations: [
    InfinityScrollComponent,
    MaterialModalComponent
  ],
  providers: [DataService]
})
export class InfinityScrollModule {
}
