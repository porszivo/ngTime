import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { AccessService } from './services/access.service';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

const routes: Routes = [
    {path: '', component: UserPanelComponent, canActivate: [AccessService]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
