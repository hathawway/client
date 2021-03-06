import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';

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
import { StaffAddComponent } from './components/zavkaf/staff-add/staff-add.component';
import { AuthGuard } from './guards/auth.guard';

import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

import { Role } from './guards/roles';

import { UnitTableComponent } from './components/umu/unit-table/unit-table.component';
import { NormaKindActivityComponent } from './components/umu/norma-kind-activity/norma-kind-activity.component';
import { EditPpComponent } from './components/pps/edit-pp/edit-pp.component';
import { IpSurveyComponent } from './components/zavkaf/ip-survey/ip-survey.component';

const routes: Routes = [
  {path: '', component: LoginComponent, children: [
    {path: '', redirectTo:'/login', pathMatch:'full'},
    {path: 'login', component: LoginComponent}
  ]},
  {path:'dashboard', component:LayoutComponent,
    canActivateChild: [AuthGuard],
    children:[
      {
        path:'admin',
        component:SidebarComponent,
        data: {
          roles: [Role.ADMIN]
        },
        children:[
          {path: 'post', component:PostTableComponent},
          {path: 'office', component:OfficeTableComponent},
          {path: 'user', component:UserTableComponent}
        ]
      },
    {path:'umu', component:SidebarComponent, /*canActivateChild: [RoleGuard], data: { roles : ['ROLE_UMU'] }, */children:[
        {path: 'activity', component:ActivityTableComponent},
        {path: 'kind-activity', component:KindActivityTableComponent},
        {path: 'norma-kind-activity', component:NormaKindActivityComponent},
        {path: 'stavka', component:StavkaTableComponent},
        {path: 'unit', component:UnitTableComponent},
        {path: 'maket', component:MaketComponent}

    ]},
    {path:'zavkaf', component:SidebarComponent, /*canActivateChild: [RoleGuard], data: { roles : ['ROLE_ZAVKAF'] }, */children:[
      {path: 'staff', component:StaffAddComponent},
      {path: 'schedule', component:ScheduleComponent},
      {path: 'ip', component:IpComponent},
      {path: 'ip-survey', component:IpSurveyComponent},
      {path: 'report', component:ReportComponent}

    ]},
    {path:'pps', component:SidebarComponent, /*canActivateChild: [RoleGuard], data: { roles : ['ROLE_PPS'] }, */children:[
      {path: 'pp', component:PpComponent},
      {path: 'edit-pp', component:EditPpComponent},
      {path: 'statistics', component:StatisticsComponent}

    ]},
  ]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
