import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ErrorDialogService } from './errors/error-dialog.service';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ErrorDialogComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ErrorDialogComponent
  ],
  imports: [CommonModule],
  providers: [MenuItems, ErrorDialogService]
})
export class SharedModule { }
