import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverImageComponent } from './driver-image.component';
import { NgxsModule } from '@ngxs/store';
import { DriverImageState } from './driver-image-state/driver-image.state';



@NgModule({
  declarations: [DriverImageComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([DriverImageState])
  ],
  exports: [DriverImageComponent]
})
export class DriverImageModule { }
