import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetricRoutingModule } from './metric-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';

// component
import { MetricComponent } from './metric.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MetricRoutingModule,
    NgbModule,
    Ng2Charts,
    NgxSpinnerModule
  ],
  declarations: [MetricComponent]
})
export class MetricModule {}
