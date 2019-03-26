import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.scss']
})
export class DesktopViewComponent {
    @Input() routerTemplate: TemplateRef<any>;
}
