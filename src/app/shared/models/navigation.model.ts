import { NavigationGroup } from './';

export class Navigation {
	mainNavigation: NavigationGroup[];
	subNavigation: NavigationGroup[];

	constructor() {
		this.mainNavigation = new Array<NavigationGroup>();
		this.subNavigation = new Array<NavigationGroup>();
	}
}