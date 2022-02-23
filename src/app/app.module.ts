import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { LayoutComponent } from './components/shared/layout/layout.component';

import { LoginComponent } from './components/login/login.component';

import { PostTableComponent } from './components/admin/post-table/post-table.component';
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { OfficeTableComponent } from './components/admin/office-table/office-table.component';
import { ModalAddUserComponent } from './components/admin/modal-add-user/modal-add-user.component';

import { MaketComponent } from './components/umu/maket/maket.component';
import { StavkaTableComponent } from './components/umu/stavka-table/stavka-table.component';
import { KindActivityTableComponent } from './components/umu/kind-activity-table/kind-activity-table.component';
import { ActivityTableComponent } from './components/umu/activity-table/activity-table.component';
import { ModalAddKindActivityTableComponent } from './components/umu/modal-add-kind-activity-table/modal-add-kind-activity-table.component';
import { ModalAddActivityTableComponent } from './components/umu/modal-add-activity-table/modal-add-activity-table.component';
import { ModalSurveyActivityTableComponent } from './components/umu/modal-survey-activity-table/modal-survey-activity-table.component';

import { ModalAddStavkaTableComponent } from './components/umu/modal-add-stavka-table/modal-add-stavka-table.component';
import { ModalAddOfficeTableComponent } from './components/admin/modal-add-office-table/modal-add-office-table.component';
import { ModalAddPostTableComponent } from './components/admin/modal-add-post-table/modal-add-post-table.component';
import { ScheduleComponent } from './components/zavkaf/schedule/schedule.component';
import { IpComponent } from './components/zavkaf/ip/ip.component';
import { ReportComponent } from './components/zavkaf/report/report.component';
import { PpComponent } from './components/pps/pp/pp.component';
import { StatisticsComponent } from './components/pps/statistics/statistics.component';
import { WorksComponent } from './components/curator/works/works.component';
import { WorksDoneComponent } from './components/curator/works-done/works-done.component';
import { TypeWorkComponent } from './components/curator/type-work/type-work.component';
import { StaffAddComponent } from './components/zavkaf/staff-add/staff-add.component';
import { ModalStaffEditComponent } from './components/zavkaf/modal-staff-edit/modal-staff-edit.component';
import { ModalSurveyScheduleComponent } from './components/zavkaf/modal-survey-schedule/modal-survey-schedule.component';
import { ModalSurveyUserComponent } from './components/admin/modal-survey-user/modal-survey-user.component';
import { ModalIpEditComponent } from './components/zavkaf/modal-ip-edit/modal-ip-edit.component';
import { ModalRoleComponent } from './components/shared/modal-role/modal-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './classes/token.interceptor';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StavkaSharedComponent } from './components/umu/stavka-shared/stavka-shared.component';
import { ModalAddStavkaSharedComponent } from './components/umu/modal-add-stavka-shared/modal-add-stavka-shared.component';
import { NormaKindActivityComponent } from './components/umu/norma-kind-activity/norma-kind-activity.component';
import { ModalAddNormaKindActivityComponent } from './components/umu/modal-add-norma-kind-activity/modal-add-norma-kind-activity.component';
import { ModalAddUnitComponent } from './components/umu/modal-add-unit/modal-add-unit.component';
import { UnitTableComponent } from './components/umu/unit-table/unit-table.component';
import { ModalEditStavkaComponent } from './components/umu/modal-edit-stavka/modal-edit-stavka.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    PostTableComponent,
    LoginComponent,
    UserTableComponent,
    OfficeTableComponent,
    ModalAddUserComponent,
    MaketComponent,
    StavkaTableComponent,
    KindActivityTableComponent,
    ActivityTableComponent,
    ModalAddKindActivityTableComponent,
    ModalAddActivityTableComponent,
    ModalSurveyActivityTableComponent,
    ModalAddStavkaTableComponent,
    ModalAddOfficeTableComponent,
    ModalAddPostTableComponent,
    ScheduleComponent,
    IpComponent,
    ReportComponent,
    PpComponent,
    StatisticsComponent,
    WorksComponent,
    WorksDoneComponent,
    TypeWorkComponent,
    StaffAddComponent,
    ModalStaffEditComponent,
    ModalSurveyScheduleComponent,
    ModalSurveyUserComponent,
    ModalIpEditComponent,
    ModalRoleComponent,
    PageNotFoundComponent,
    StavkaSharedComponent,
    ModalAddStavkaSharedComponent,
    NormaKindActivityComponent,
    ModalAddNormaKindActivityComponent,
    ModalAddUnitComponent,
    UnitTableComponent,
    ModalEditStavkaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
