import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricComponent } from './metric.component';

import { MetricRoutingModule } from './metric-routing.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [CommonModule, MetricRoutingModule, FormsModule],
  declarations: [MetricComponent]
})
export class MetricModule {}
