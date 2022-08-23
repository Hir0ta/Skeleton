import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateFramePageRoutingModule } from './private-frame-routing.module';

import { PrivateFrame } from './private-frame.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PrivateFramePageRoutingModule
	],
	declarations: [PrivateFrame]
})
export class PrivateFramePageModule { }
