import { Component, Input } from '@angular/core';
import { LegacyTooltipPosition as TooltipPosition } from '@angular/material/legacy-tooltip';

@Component({
  selector: 'app-help-link',
  templateUrl: './help-link.component.html',
  styleUrls: ['./help-link.component.scss']
})
export class HelpLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
