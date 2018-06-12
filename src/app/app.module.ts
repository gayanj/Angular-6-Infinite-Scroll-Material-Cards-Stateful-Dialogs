import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material-module/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';

import {environment} from '../environments/environment';
import {InMemoryDataService} from './services/in-memory-data.service';
import {RouterModule, Routes} from '@angular/router';
import {InfinityScrollModule} from './infinity-scroll/infinity-scroll.module';

const appRoutes: Routes = [
  {path: '', redirectTo: '/materials', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    InfinityScrollModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    HttpClientModule,
    environment.production ?
      [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
