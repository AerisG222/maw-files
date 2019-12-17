import { Component, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-help-link',
  templateUrl: './help-link.component.html',
  styleUrls: ['./help-link.component.scss']
})
export class HelpLinkComponent {
    @Input() tooltipPosition: TooltipPosition = 'after';
}
