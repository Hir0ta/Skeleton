import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'public',
		pathMatch: 'full'
	},
	{
		path: 'public',
		loadChildren: () => import('./frames/public-frame/public-frame.module').then(m => m.PublicFramePageModule)
	},
	{
		path: 'private',
		loadChildren: () => import('./frames/private-frame/private-frame.module').then(m => m.PrivateFramePageModule)
	}




];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
