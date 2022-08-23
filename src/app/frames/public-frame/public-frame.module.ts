import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicFramePageRoutingModule } from './public-frame-routing.module';

import { PublicFrame } from './public-frame.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PublicFramePageRoutingModule
	],
	declarations: [PublicFrame]
})
export class PublicFramePageModule { }
