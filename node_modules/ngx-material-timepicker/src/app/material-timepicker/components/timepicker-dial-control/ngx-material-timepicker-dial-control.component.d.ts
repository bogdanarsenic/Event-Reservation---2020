import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimeUnit } from '../../models/time-unit.enum';
export declare class NgxMaterialTimepickerDialControlComponent implements OnChanges {
    previousTime: number | string;
    timeList: ClockFaceTime[];
    timeUnit: TimeUnit;
    time: string;
    isActive: boolean;
    isEditable: boolean;
    minutesGap: number;
    timeUnitChanged: EventEmitter<TimeUnit>;
    timeChanged: EventEmitter<ClockFaceTime>;
    focused: EventEmitter<null>;
    unfocused: EventEmitter<null>;
    private readonly selectedTime;
    ngOnChanges(changes: SimpleChanges): void;
    saveTimeAndChangeTimeUnit(event: FocusEvent, unit: TimeUnit): void;
    updateTime(): void;
    formatTime(): void;
    onKeyDown(e: KeyboardEvent): void;
    private changeTimeByArrow;
}
