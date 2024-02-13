import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { UploadModComponent } from './components/upload-mod/upload-mod.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateComponent } from './components/validate/validate.component';
import { ModsComponent } from './components/mods/mods.component';

const routes: Routes = [
  { path: 'mods/upload', component: UploadModComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'validate/:token', component: ValidateComponent },
  { path: 'mods', component: ModsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
