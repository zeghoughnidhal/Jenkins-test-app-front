import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TablesRoutingModule, PageHeaderModule, NgbPopoverModule],
    declarations: [TablesComponent]
})
export class TablesModule {}
