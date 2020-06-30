# Material range datepicker
Material datepicker with range support
## What is this?

[Issue in material2 repo.](https://github.com/angular/material2/issues/4763)
![Material date range picker](screenshot.png)

## how to use it?

Installation: `yarn add mat-range-datepicker` or `npm install mat-range-datepicker`
Import `MatRangeDatepickerModule`, `MatRangeNativeDateModule` and `MatDatepickerModule`
```angular2html
  <mat-form-field>
    <input matInput [matRangeDatepicker]="resultPicker">
    <mat-range-datepicker
        #resultPicker
        [rangeMode]="true">
    </mat-range-datepicker>
   </mat-form-field>
```

Add styles:
* If you are using CSS: copy-paste or include somehow the file `mat-range-datepicker/bundle.css`
* If you are using SCSS: 
```scss
@import '~mat-range-datepicker/theming';
@include mat-range-datepicker-theme($theme); # material theme data structure https://material.angular.io/guide/theming#defining-a-custom-theme
```

## ngModel/formControl value have this interface:
```typescript
export interface matRangeDatepickerRangeValue<D> {
  begin: D | null;
  end: D | null;
}
```

Licence: MIT

Publish your own package
```shell
yarn build:lib
(cd dist ; npm pack)
npm publish
```
