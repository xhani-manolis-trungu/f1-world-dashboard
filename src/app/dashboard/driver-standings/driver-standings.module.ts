import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverStandingsComponent } from './driver-standings.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { GeneralTableComponent } from '../../shared/general-table/general-table.component';
import { GeneralTableModule } from '../../shared/general-table/general-table.module';
import { DemoMaterialModule } from '../../demo-material-module';



@NgModule({
  declarations: [DriverStandingsComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    GeneralTableModule,
  ],
  exports: [DriverStandingsComponent]
})
export class DriverStandingsModule { }
