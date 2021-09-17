import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralTableComponent } from './general-table.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [GeneralTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    DemoMaterialModule
  ],
  exports: [GeneralTableComponent]
})
export class GeneralTableModule { }
