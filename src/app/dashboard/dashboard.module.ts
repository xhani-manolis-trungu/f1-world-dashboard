import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { DemoMaterialModule } from '../demo-material-module';
import { GeneralTableModule } from '../shared/general-table/general-table.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { DriverStandingsModule } from './driver-standings/driver-standings.module';
import { RoundsState } from './season-rounds/season-rounds-state/season-rounds.state';
import { SeasonRoundsModule } from './season-rounds/season-rounds.module';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes),
    GeneralTableModule,
    SeasonRoundsModule,
    DriverStandingsModule,
    NgxsModule.forFeature([RoundsState])
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
