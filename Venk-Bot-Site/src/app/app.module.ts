import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ModsComponent } from './components/mods/mods.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadModComponent } from './components/upload-mod/upload-mod.component';
import { ValidateComponent } from './components/validate/validate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModsComponent,
    RegisterComponent,
    UploadModComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
