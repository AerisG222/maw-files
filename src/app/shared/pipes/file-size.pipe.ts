import { Pipe, PipeTransform } from '@angular/core';
import * as PrettyBytes from 'pretty-bytes';

@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
    transform(value: number): string {
        return PrettyBytes(value);
    }
}
