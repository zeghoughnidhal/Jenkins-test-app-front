import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricRoutingModule } from './metric-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

// component
import {MetricComponent, NgbdSortableHeader} from './metric.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [CommonModule, FormsModule, MetricRoutingModule, NgbModule,  Ng2Charts, NgxSpinnerModule],
  declarations: [MetricComponent, NgbdSortableHeader]
})
export class MetricModule {}
