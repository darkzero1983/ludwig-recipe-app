import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberFormat' })
export class NumberFormatPipe implements PipeTransform {
	transform(value: number, args: number[]): string {
		return value.toFixed(2).toString().replace(".", ",").replace(",00", "");
	}
} 