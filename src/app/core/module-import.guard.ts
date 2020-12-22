import { NgModule } from '@angular/core';

// https://angular.io/guide/styleguide#core-feature-module
export const throwIfAlreadyLoaded = (parentModule: NgModule, moduleName: string): void => {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
};
