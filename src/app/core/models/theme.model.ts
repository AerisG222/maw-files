export class Theme {
    static readonly themeDark = new Theme('Dark', 'maw-dark-theme', true);
    static readonly themeLight = new Theme('Light', 'maw-light-theme', false);
    static readonly themeMulledWine = new Theme('Mulled Wine', 'maw-mulled-wine-theme', true);
    static readonly themePaleNight = new Theme('Pale Night', 'maw-pale-night-theme', true);

    static readonly allThemes = [
        Theme.themeDark,
        Theme.themeLight,
        Theme.themeMulledWine,
        Theme.themePaleNight
    ];

    readonly name: string;
    readonly klass: string;
    readonly isDark: boolean;

    constructor(name: string, klass: string, isDark: boolean) {
        this.name = name;
        this.klass = klass;
        this.isDark = isDark;
    }

    static forName(name: string): Theme {
        switch (name) {
            case Theme.themeDark.name:
                return Theme.themeDark;
            case Theme.themeLight.name:
                return Theme.themeLight;
            case Theme.themeMulledWine.name:
                return Theme.themeMulledWine;
            case Theme.themePaleNight.name:
                return Theme.themePaleNight;
            default:
                console.error(`invalid theme requested: ${name}`);
        }

        return null;
    }
}
