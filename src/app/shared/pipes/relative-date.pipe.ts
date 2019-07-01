import { Pipe, PipeTransform } from '@angular/core';
import { formatRelative, parseISO } from 'date-fns';

@Pipe({
    name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if(typeof value === 'string') {
            value = parseISO(value);
        }

        return formatRelative(value, new Date());
    }
}
