import { NavigationGroup } from './';

export class Navigation {
	MainNavigation: NavigationGroup[];
	SubNavigation: NavigationGroup[];

	constructor() {
		this.MainNavigation = new Array<NavigationGroup>();
		this.SubNavigation = new Array<NavigationGroup>();
	}
}