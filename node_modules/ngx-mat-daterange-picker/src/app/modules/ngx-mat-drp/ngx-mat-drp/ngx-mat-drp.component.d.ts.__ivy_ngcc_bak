import { OnInit, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarOverlayService } from '../services/calendar-overlay.service';
import { RangeStoreService } from '../services/range-store.service';
import { Range, NgxDrpOptions } from '../model/model';
import { ConfigStoreService } from '../services/config-store.service';
export declare class NgxMatDrpComponent implements OnInit, OnDestroy {
    private changeDetectionRef;
    private calendarOverlayService;
    rangeStoreService: RangeStoreService;
    configStoreService: ConfigStoreService;
    private datePipe;
    calendarInput: any;
    readonly selectedDateRangeChanged: EventEmitter<Range>;
    options: NgxDrpOptions;
    private rangeUpdate$;
    selectedDateRange: string;
    constructor(changeDetectionRef: ChangeDetectorRef, calendarOverlayService: CalendarOverlayService, rangeStoreService: RangeStoreService, configStoreService: ConfigStoreService, datePipe: DatePipe);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private formatToDateString(date, format);
    openCalendar(event: any): void;
    resetDates(range: Range): void;
}
