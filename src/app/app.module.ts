import { NgModule } from '@angular/core';
import {
    TuiButtonModule,
    TuiAlertModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiErrorModule,
    TuiLoaderModule,
    TuiRootModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule, TuiNotificationsModule, TuiHintControllerModule,
} from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { LayoutComponent } from './components/shared/layout/layout.component';

import { LoginComponent } from './components/shared/login/login.component';

import { PostTableComponent } from './components/admin/post-table/post-table.component';
import { UserTableComponent } from './components/admin/user-table/user-table.component';
import { OfficeTableComponent } from './components/admin/office-table/office-table.component';

import { MaketComponent } from './components/umu/maket/maket.component';
import { StavkaTableComponent } from './components/umu/stavka-table/stavka-table.component';
import { KindActivityTableComponent } from './components/umu/kind-activity-table/kind-activity-table.component';
import { ActivityTableComponent } from './components/umu/activity-table/activity-table.component';
import { ScheduleComponent } from './components/zavkaf/schedule/schedule.component';
import { IpComponent } from './components/zavkaf/ip/ip.component';
import { ReportComponent } from './components/zavkaf/report/report.component';
import { PpComponent } from './components/pps/pp/pp.component';
import { StatisticsComponent } from './components/pps/statistics/statistics.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NormaKindActivityComponent } from './components/umu/norma-kind-activity/norma-kind-activity.component';
import { UnitTableComponent } from './components/umu/unit-table/unit-table.component';
import { ModalPpEditComponent } from './components/pps/modal-pp-edit/modal-pp-edit.component';
import { EditPpComponent } from './components/pps/edit-pp/edit-pp.component';
import {
    TuiBadgeModule,
    TuiCheckboxBlockModule,
    TuiCheckboxModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiInputPhoneModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiStepperModule,
    TuiTabsModule
} from '@taiga-ui/kit';
import { StaffAddComponent } from './components/zavkaf/staff-add/staff-add.component';
import { RouterModule } from '@angular/router';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TuiTableBarsHostModule } from '@taiga-ui/addon-tablebars';
import {TuiAutoFocusModule, TuiLetModule} from "@taiga-ui/cdk";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    PostTableComponent,
    LoginComponent,
    UserTableComponent,
    OfficeTableComponent,
    MaketComponent,
    StavkaTableComponent,
    KindActivityTableComponent,
    ActivityTableComponent,
    ScheduleComponent,
    IpComponent,
    ReportComponent,
    PpComponent,
    StatisticsComponent,
    StaffAddComponent,
    PageNotFoundComponent,
    NormaKindActivityComponent,
    UnitTableComponent,
    ModalPpEditComponent,
    EditPpComponent,
    ToNumberPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    RouterModule,
    TuiAlertModule,
    TuiRootModule,
    TuiBadgeModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiInputPasswordModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiTextfieldControllerModule,
    TuiTabsModule,
    TuiStepperModule,
    TuiSvgModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiDialogModule,
    TuiCheckboxBlockModule,
    TuiSelectModule,
    TuiLoaderModule,
    TuiScrollbarModule,
    TuiInputPhoneModule,
    TuiCheckboxModule,
    TuiTableBarsHostModule,
    TuiInputDateModule,
    TuiHintControllerModule,
    TuiAutoFocusModule,
    TuiMultiSelectModule,
    TuiLetModule,
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
