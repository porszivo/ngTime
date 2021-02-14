import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FillPipe } from './fill.pipe';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessService } from './services/access.service';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ngx-custom-validators';
import { AlertComponent } from './components/alert/alert.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [
        AppComponent,
        FillPipe,
        LoginComponent,
        ProfileComponent,
        UserPanelComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        CustomFormsModule,
        MatSidenavModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule
    ],
    providers: [
        AccessService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
