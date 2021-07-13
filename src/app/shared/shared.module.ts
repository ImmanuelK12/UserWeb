import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { SidebarPageComponent } from './sidebar-page/sidebar-page.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    SidebarPageComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [SidebarPageComponent],
  providers: [],
})
export class SharedModule { }
