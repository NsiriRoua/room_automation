import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllDetailsPage } from './all-details.page';

const routes: Routes = [
  {
    path: '',
    component: AllDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDetailsPageRoutingModule {}
