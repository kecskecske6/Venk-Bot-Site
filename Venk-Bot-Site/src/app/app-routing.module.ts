import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { GuildComponent } from './components/guild/guild.component';
import { guildGuard } from './guards/guild.guard';
import { UploadModComponent } from './components/upload-mod/upload-mod.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'dashboard/:id', component: GuildComponent, canActivate: [authGuard, guildGuard] },
  { path: 'mods/upload', component: UploadModComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
