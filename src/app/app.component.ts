import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { RootStoreState, SettingsStoreSelectors } from './core/root-store';
import { tap } from 'rxjs/operators';
import { Theme } from './core/models/theme.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    themeSubscription: Subscription;

    constructor(
        private _store$: Store<RootStoreState.State>,
        @Inject(DOCUMENT) private _doc
    ) {

    }

    ngOnInit(): void {
        this.themeSubscription = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.setTheme(settings.appTheme))
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
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
