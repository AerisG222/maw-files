import { Component, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
    selector: 'app-home-link',
    templateUrl: './home-link.component.html',
    styleUrls: ['./home-link.component.scss']
})
export class HomeLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
