import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Theme } from '../../core/models/theme.model';
import { Settings } from '../../core/models/settings.model';



@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    form: FormGroup;
    themes = Theme.allThemes;
    constructor(
        private _formBuilder: FormBuilder,
    ) {

    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            appTheme: ['', Validators.required],
        });

        this.loadSettings();
    }

    onSave(): void {
        const settings = {
            appTheme: Theme.forName(this.form.get('appTheme').value)
        };

        // this._store$.dispatch(
        //     new SettingsStoreActions.SaveRequestAction({ settings: settings })
        // );
    }

    onCancel(): void {
        this.loadSettings();
    }

    private loadSettings(): void {
        // this._store$.dispatch(
        //     new SettingsStoreActions.LoadRequestAction()
        // );
    }

    private updateForm(settings: Settings): void {
        this.form.get('appTheme').setValue(settings.appTheme.name);
    }
}
