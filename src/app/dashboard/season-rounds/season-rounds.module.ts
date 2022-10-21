import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonRoundsComponent } from './season-rounds.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from '../../demo-material-module';
import { GeneralTableModule } from '../../shared/general-table/general-table.module';
import { RoundsState } from './season-rounds-state/season-rounds.state';
import { NgxsModule } from '@ngxs/store';



@NgModule({
  declarations: [SeasonRoundsComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    GeneralTableModule,
    NgxsModule.forFeature([RoundsState])
  ],
  exports: [SeasonRoundsComponent]
})
export class SeasonRoundsModule { }
