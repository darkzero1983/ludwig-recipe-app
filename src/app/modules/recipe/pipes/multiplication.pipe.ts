import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'multiplication' })
export class MultiplicationPipe implements PipeTransform {
	transform(value: number, args: number): any {
		return value * args;
	}
}