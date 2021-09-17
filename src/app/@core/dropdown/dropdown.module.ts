import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    DropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    NgSelectModule
  ],
  exports: [DropdownComponent]
})
export class DropdownModule { }
