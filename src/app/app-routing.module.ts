import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { LayoutComponent } from './components/shared/layout/layout.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';

import { PostTableComponent } from './components/admin/post-table/post-table.component'
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { OfficeTableComponent } from './components/admin/office-table/office-table.component';

import {ActivityTableComponent} from './components/umu/activity-table/activity-table.component'
import {KindActivityTableComponent} from './components/umu/kind-activity-table/kind-activity-table.component'
import {StavkaTableComponent} from './components/umu/stavka-table/stavka-table.component'
import {MaketComponent} from './components/umu/maket/maket.component'


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'dashboard', component:LayoutComponent, children:[
    {path:'admin', component:SidebarComponent, children:[
        {path: 'post', component:PostTableComponent},
        {path: 'office', component:OfficeTableComponent},
        {path: 'user', component:UserTableComponent}
    ]},
    {path:'umu', component:SidebarComponent, children:[
        {path: 'activity', component:ActivityTableComponent},
        {path: 'kind-activity', component:KindActivityTableComponent},
        {path: 'stavka', component:StavkaTableComponent},
        {path: 'maket', component:MaketComponent}
      
    ]}   
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
