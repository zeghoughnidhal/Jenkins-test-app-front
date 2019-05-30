import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricRoutingModule } from './metric-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// component
import {MetricComponent, NgbdSortableHeader} from './metric.component';

@NgModule({
  imports: [CommonModule, FormsModule, MetricRoutingModule, NgbModule],
  declarations: [MetricComponent, NgbdSortableHeader]
})
export class MetricModule {}
