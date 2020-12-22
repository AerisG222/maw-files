import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { Theme } from '../../core/models/theme.model';
import { Settings } from '../../core/models/settings.model';
import { SettingsStoreActions, SettingsStoreSelectors } from '../../core/root-store';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    themes = Theme.allThemes;

    private destroySub = new Subscription();

    constructor(
        private formBuilder: FormBuilder,
        private store$: Store
    ) {
        this.form = this.formBuilder.group({
            appTheme: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.updateForm(settings))
            )
            .subscribe()
        );

        this.loadSettings();
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onSave(): void {
        const settings = {
            appTheme: Theme.forName(this.form.get('appTheme')?.value)
        };

        this.store$.dispatch(SettingsStoreActions.saveRequest({ settings }));
    }

    onCancel(): void {
        this.loadSettings();
    }

    private loadSettings(): void {
        this.store$.dispatch(SettingsStoreActions.loadRequest());
    }

    private updateForm(settings: Settings): void {
        const themeControl = this.form.get('appTheme');

        if (!!themeControl) {
            themeControl.setValue(settings.appTheme.name);
        }
    }
}
