import { Component } from '@angular/core';

import { HelpInfo } from './help-info.model';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {
    info: HelpInfo = { version: '0.1.0' };

    constructor() {

    }
}
