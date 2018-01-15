import { NavigationItem } from './';

export class NavigationGroup {
	Active: boolean;
	Name: string;
	Href: string;
	RouteName: string;
	CategoryUrl: string;
	Items: NavigationItem[];

	constructor() {
		this.Items = new Array<NavigationItem>();
	}
}