import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateFrame } from './private-frame.page';

const routes: Routes = [
	{
		path: '',
		component: PrivateFrame,
		children:
			[
				{
					path: 'welcome',
					loadChildren: () => import('../../pages/welcome-page/welcome-page.module').then(m => m.WelcomePageModule)
				}
			]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PrivateFramePageRoutingModule { }
