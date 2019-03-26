import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-mobile-view',
    templateUrl: './mobile-view.component.html',
    styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent {
    @Input() routerTemplate: TemplateRef<any>;
}
