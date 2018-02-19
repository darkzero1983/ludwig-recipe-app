import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'division' })
export class DivisionPipe implements PipeTransform {
	transform(value: number, args: number): any {
		return value / args;
	}
}