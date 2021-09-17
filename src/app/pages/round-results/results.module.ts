import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { ResultsRoutes } from './results.routing';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from 'src/app/demo-material-module';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(ResultsRoutes)
  ],
  exports: [ResultsComponent]
})
export class ResultsModule { }
