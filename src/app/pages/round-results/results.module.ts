import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ResultsComponent]
})
export class ResultsModule { }
