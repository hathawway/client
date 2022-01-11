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
    ModalAddPostTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
