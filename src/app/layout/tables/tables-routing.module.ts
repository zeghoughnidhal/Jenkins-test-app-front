import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';

const routes: Routes = [
    // default folder
    { path: '', component: TablesComponent},
    { path: ':pathFolder1', component: TablesComponent},
    { path: ':pathFolder1/:pathFolder2', component: TablesComponent},
    { path: ':pathFolder1/:pathFolder2/:pathFolder3', component: TablesComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablesRoutingModule {
}
