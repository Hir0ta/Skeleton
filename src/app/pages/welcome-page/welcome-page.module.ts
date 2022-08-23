import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePagePageRoutingModule } from './welcome-page-routing.module';

import { WelcomePage } from './welcome-page.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		WelcomePagePageRoutingModule
	],
	declarations: [WelcomePage]
})
export class WelcomePageModule { }
