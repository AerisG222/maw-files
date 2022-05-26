import { Pipe, PipeTransform } from '@angular/core';
import prettyBytes from 'pretty-bytes';

@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
    transform(value: number): string {
        return prettyBytes(value);
    }
}
