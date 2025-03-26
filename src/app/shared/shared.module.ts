import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from '../pages/register/register.component';
import { InventoryComponent } from '../pages/inventory/inventory.component';
import { HomeComponent } from '../home/home.component';

const Module = [
  CommonModule,
  FormsModule,
  AppRoutingModule,
  ReactiveFormsModule
]

const Components = [
  RegisterComponent,
  InventoryComponent,
  HomeComponent
]

@NgModule({
  declarations: [... Components],
  imports: [
    ... Module
  ],
  exports: [... Components, ... Module]
})
export class SharedModule { }
