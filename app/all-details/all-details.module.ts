import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDetailsPageRoutingModule } from './all-details-routing.module';

import { AllDetailsPage } from './all-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDetailsPageRoutingModule
  ],
  declarations: [AllDetailsPage]
})
export class AllDetailsPageModule {}
