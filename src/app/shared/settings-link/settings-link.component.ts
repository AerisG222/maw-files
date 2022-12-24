import { Component, Input } from '@angular/core';
import { LegacyTooltipPosition as TooltipPosition } from '@angular/material/legacy-tooltip';

@Component({
    selector: 'app-settings-link',
    templateUrl: './settings-link.component.html',
    styleUrls: ['./settings-link.component.scss']
})
export class SettingsLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
