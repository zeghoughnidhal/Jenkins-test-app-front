import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricComponent } from './metric.component';

import { MetricRoutingModule } from './metric-routing.module';


@NgModule({
  imports: [CommonModule, MetricRoutingModule],
  declarations: [MetricComponent]
})
export class MetricModule {}
