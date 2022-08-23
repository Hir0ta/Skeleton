import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-private-frame',
	templateUrl: './private-frame.page.html',
	styleUrls: ['./private-frame.page.scss'],
})
export class PrivateFrame implements OnInit
{

	public appPages = [
		{ title: 'Kezdőlap', url: 'welcome', icon: 'apps' },
	];

	constructor() { }

	ngOnInit()
	{
	}

}
