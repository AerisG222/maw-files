import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-settings-link',
    templateUrl: './settings-link.component.html',
    styleUrls: ['./settings-link.component.scss']
})
export class SettingsLinkComponent {
    @Input() tooltipPosition = 'after';
}
