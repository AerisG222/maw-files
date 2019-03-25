import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, startWith } from 'rxjs/operators';

import { RootStoreState, SettingsStoreSelectors } from './core/root-store';
import { Theme } from './core/models/theme.model';
import { LayoutStoreSelectors, LayoutStoreActions } from './core/root-store/layout-store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<boolean>();

    isMobileView = false;

    constructor(
        private _store$: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private _doc
    ) {

    }

    ngOnInit(): void {
        this._store$.dispatch(new LayoutStoreActions.InitializeRequestAction());

        this._store$
            .pipe(
                select(LayoutStoreSelectors.selectLayoutIsMobileView),
                tap(isMobileView => this.isMobileView = isMobileView),
                takeUntil(this.destroy$)
            ).subscribe();

        this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.setTheme(settings.appTheme)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
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
