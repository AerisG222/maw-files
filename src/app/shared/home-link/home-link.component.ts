import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-home-link',
    templateUrl: './home-link.component.html',
    styleUrls: ['./home-link.component.scss']
})
export class HomeLinkComponent {
    @Input() tooltipPosition = 'after';
}
