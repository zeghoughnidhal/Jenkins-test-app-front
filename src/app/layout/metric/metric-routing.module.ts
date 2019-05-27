import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetricComponent } from './metric.component';

const routes: Routes = [
  { path: '', component: MetricComponent},
  { path: ':pathLevel1', component: MetricComponent},
  { path: ':pathLevel1/:pathLevel2', component: MetricComponent},
  { path: ':pathLevel1/:pathLevel2/:pathLevel3', component: MetricComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MetricRoutingModule {}
