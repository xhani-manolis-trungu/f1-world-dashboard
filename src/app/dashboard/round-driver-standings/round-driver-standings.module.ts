import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { GeneralTableModule } from 'src/app/shared/general-table/general-table.module';
import { RoundDriverStandingsState } from './round-driver-standings-state/round-driver-standings.state';
import { RoundDriverStandingsComponent } from './round-driver-standings.component';



@NgModule({
  declarations: [
    RoundDriverStandingsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    GeneralTableModule,
    NgxsModule.forFeature([RoundDriverStandingsState])
  ]
})
export class RoundDriverStandingsModule { }
