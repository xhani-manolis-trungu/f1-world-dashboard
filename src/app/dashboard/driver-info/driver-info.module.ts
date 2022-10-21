import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverInfoComponent } from './driver-info.component';
import { NgxsModule } from '@ngxs/store';
import { DriverInfoState } from './driver-info-state/driver-info.state';



@NgModule({
  declarations: [DriverInfoComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([DriverInfoState])
  ],
  exports: [DriverInfoComponent]
})
export class DriverInfoModule { }
