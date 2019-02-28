import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FillPipe } from './fill.pipe';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessService } from './service/access.service';
import { CustomFormsModule } from 'ng2-validation';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './service/user.service';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FillPipe,
    LoginComponent,
    ProfileComponent,
    UserPanelComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CustomFormsModule
  ],
  providers: [
    AccessService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
