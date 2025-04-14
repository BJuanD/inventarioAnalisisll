import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from '../pages/register/register.component';
import { InventoryComponent } from '../pages/inventory/inventory.component';
import { HomeComponent } from '../home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DetallesComponent } from '../pages/detalles/detalles.component';
import { ToasComponent } from './components/toast/toas/toas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const Module = [
  CommonModule,
  FormsModule,
  AppRoutingModule,
  ReactiveFormsModule,
  HttpClientModule,
  BrowserAnimationsModule
]

const Components = [
  RegisterComponent,
  InventoryComponent,
  HomeComponent,
  DetallesComponent,
  ToasComponent
]

@NgModule({
  declarations: [... Components, ToasComponent],
  imports: [
    ... Module
  ],
  exports: [... Components, ... Module]
})
export class SharedModule { }
