import { Component, Input } from '@angular/core';
import { LegacyTooltipPosition as TooltipPosition } from '@angular/material/legacy-tooltip';

@Component({
    selector: 'app-home-link',
    templateUrl: './home-link.component.html',
    styleUrls: ['./home-link.component.scss']
})
export class HomeLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
