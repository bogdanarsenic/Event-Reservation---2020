import { InjectionToken } from '@angular/core';
import { Range } from '../model/model';
import { Subject } from 'rxjs';
export declare const DATE: InjectionToken<Date>;
export declare class RangeStoreService {
    private _fromDate;
    private _toDate;
    rangeUpdate$: Subject<Range>;
    constructor(_fromDate: Date, _toDate: Date);
    readonly fromDate: Date;
    readonly toDate: Date;
    updateRange(fromDate?: Date, toDate?: Date): void;
}
