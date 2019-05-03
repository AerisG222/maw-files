import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RootStoreState, SettingsStoreSelectors } from './core/root-store';
import { Theme } from './core/models/theme.model';
import { LayoutStoreSelectors, LayoutStoreActions } from './core/root-store/layout-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();

    isMobileView = false;

    constructor(
        private _store$: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private _doc
    ) {

    }

    ngOnInit(): void {
        this._store$.dispatch(new LayoutStoreActions.InitializeRequestAction());

        this.destroySub.add(this._store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsMobileView),
                tap(isMobileView => this.isMobileView = isMobileView)
            ).subscribe()
        );

        this.destroySub.add(this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.setTheme(settings.appTheme))
            )
            .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    private setTheme(theme: Theme): void {
        const classList: DOMTokenList = this._doc.documentElement.classList;

        if (!classList.contains('mat-app-background')) {
            classList.add('mat-app-background');
        }

        Theme.allThemes.forEach(x => {
            classList.remove(x.klass);
        });

        classList.add(theme.klass);
    }
}
