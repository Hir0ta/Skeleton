import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-page-routing.module';

import { SignUpPage } from './sign-up-page.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		SignUpPageRoutingModule
	],
	declarations: [SignUpPage]
})
export class SignUpPageModule { }
