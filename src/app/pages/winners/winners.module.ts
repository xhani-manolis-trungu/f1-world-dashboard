import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinnersComponent } from './winners.component';



@NgModule({
  declarations: [
    WinnersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [WinnersComponent]
})
export class WinnersModule { }
