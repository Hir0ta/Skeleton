import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from 'src/app/pages/login-page/login-page.page';
import { SignUpPage } from 'src/app/pages/sign-up-page/sign-up-page.page';

// import { PublicFrame } from './public-frame.page';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		loadChildren: () => import('../../pages/login-page/login-page.module').then(m => m.LoginPageModule)
	},
	{
		path: 'signup',
		loadChildren: () => import('../../pages/sign-up-page/sign-up-page.module').then(m => m.SignUpPageModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PublicFramePageRoutingModule { }
