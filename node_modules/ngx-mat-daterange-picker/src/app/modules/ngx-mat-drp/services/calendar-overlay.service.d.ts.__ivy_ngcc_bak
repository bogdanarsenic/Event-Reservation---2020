import { ElementRef, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CalendarOverlayConfig } from '../model/model';
export declare class CalendarOverlayService {
    private overlay;
    private injector;
    private hostElemRef;
    constructor(overlay: Overlay, injector: Injector);
    open(config: CalendarOverlayConfig, hostElemRef: ElementRef): OverlayRef;
    private createOverlay(config);
    private getOverlayConfig(config);
    private createInjector(overlayRef);
}
