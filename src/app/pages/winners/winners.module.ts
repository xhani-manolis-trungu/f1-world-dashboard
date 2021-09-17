import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnersComponent } from './winners.component';
import { RouterModule } from '@angular/router';
import { WinnersRoutes } from './winners.routing';



@NgModule({
  declarations: [
    WinnersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WinnersRoutes)
  ],
  exports: [WinnersComponent]
})
export class WinnersModule { }
