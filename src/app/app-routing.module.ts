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

import { ScheduleComponent } from './components/zavkaf/schedule/schedule.component';
import { IpComponent } from './components/zavkaf/ip/ip.component';
import { ReportComponent } from './components/zavkaf/report/report.component';
import { PpComponent } from './components/pps/pp/pp.component';
import { StatisticsComponent } from './components/pps/statistics/statistics.component';
import { WorksDoneComponent } from './components/curator/works-done/works-done.component';
import { WorksComponent } from './components/curator/works/works.component';
import { TypeWorkComponent } from './components/curator/type-work/type-work.component';
import { StaffAddComponent } from './components/zavkaf/staff-add/staff-add.component';
import { AuthGuard } from './classes/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent, children: [
    {path: '', redirectTo:'/login', pathMatch:'full'},
    {path: 'login', component: LoginComponent}
]},


  {path:'dashboard', component:LayoutComponent, canActivate: [AuthGuard], children:[
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
      
    ]},
    {path:'zavkaf', component:SidebarComponent, children:[
      {path: 'staff', component:StaffAddComponent},
      {path: 'schedule', component:ScheduleComponent},
      {path: 'ip', component:IpComponent},
      {path: 'report', component:ReportComponent}
    
    ]},
    {path:'pps', component:SidebarComponent, children:[
      {path: 'pp', component:PpComponent},
      {path: 'statistics', component:StatisticsComponent}
    
    ]},
    {path:'curator', component:SidebarComponent, children:[
      {path: 'type-work', component:TypeWorkComponent},
      {path: 'works', component:WorksComponent},
      {path: 'works-done', component:WorksDoneComponent}

    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
