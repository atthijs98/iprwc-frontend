import { NgModule } from '@angular/core';
import { sharedRoutes } from './shared.routes';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {ApiService} from './services/api.service';
import {HomeComponent} from '../home/home.component';
import {AccountManagementService} from './services/account-management.service';



@NgModule({
  declarations: [
    HomeComponent
  ],

  exports: [
  ],

  imports: [
    RouterModule.forRoot(sharedRoutes),
    CommonModule
  ],

  entryComponents: [

  ],

  providers: [
    CommonModule,
    ApiService,
    AccountManagementService
  ]
})

export class SharedModule {}
