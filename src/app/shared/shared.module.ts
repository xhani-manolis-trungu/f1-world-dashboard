import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ErrorDialogService } from './errors/error-dialog.service';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog/error-dialog.component';

const SharedComponents = [ErrorDialogComponent];

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SharedComponents
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SharedComponents
  ],
  imports: [CommonModule],
  providers: [MenuItems, ErrorDialogService]
})
export class SharedModule { }
