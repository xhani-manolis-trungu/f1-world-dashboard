import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonRoundsComponent } from './season-rounds.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from '../../demo-material-module';
import { GeneralTableModule } from '../../shared/general-table/general-table.module';



@NgModule({
  declarations: [SeasonRoundsComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    GeneralTableModule,
  ],
  exports: [SeasonRoundsComponent]
})
export class SeasonRoundsModule { }
