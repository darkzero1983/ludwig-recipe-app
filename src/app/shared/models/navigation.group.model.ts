import { NavigationItem } from './';

export class NavigationGroup {
	active: boolean;
	name: string;
	href: string;
	routeName: string;
	categoryUrl: string;
	items: NavigationItem[];

	constructor() {
		this.items = new Array<NavigationItem>();
	}
}