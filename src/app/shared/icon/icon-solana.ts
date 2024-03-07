import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'icon-solana',
    template: `
        <ng-template #template>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="100%"
                height="100%"
                viewBox="0 0 508.07 398.17"
                [ngClass]="class"
            >
                <defs>
                    <linearGradient
                        id="linear-gradient"
                        x1="463"
                        y1="205.16"
                        x2="182.39"
                        y2="742.62"
                        gradientTransform="translate(0 -198)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#00ffa3" />
                        <stop offset="1" stop-color="#dc1fff" />
                    </linearGradient>
                    <linearGradient id="linear-gradient-2" x1="340.31" y1="141.1" x2="59.71" y2="678.57" xlink:href="#linear-gradient" />
                    <linearGradient id="linear-gradient-3" x1="401.26" y1="172.92" x2="120.66" y2="710.39" xlink:href="#linear-gradient" />
                </defs>
                <path
                    class="cls-1 fill-[url(#linear-gradient)]"
                    d="M84.53,358.89A16.63,16.63,0,0,1,96.28,354H501.73a8.3,8.3,0,0,1,5.87,14.18l-80.09,80.09a16.61,16.61,0,0,1-11.75,4.86H10.31A8.31,8.31,0,0,1,4.43,439Z"
                    transform="translate(-1.98 -55)"
                />
                <path
                    class="cls-2 fill-[url(#linear-gradient)]"
                    d="M84.53,59.85A17.08,17.08,0,0,1,96.28,55H501.73a8.3,8.3,0,0,1,5.87,14.18l-80.09,80.09a16.61,16.61,0,0,1-11.75,4.86H10.31A8.31,8.31,0,0,1,4.43,140Z"
                    transform="translate(-1.98 -55)"
                />
                <path
                    class="cls-3 fill-[url(#linear-gradient)]"
                    d="M427.51,208.42a16.61,16.61,0,0,0-11.75-4.86H10.31a8.31,8.31,0,0,0-5.88,14.18l80.1,80.09a16.6,16.6,0,0,0,11.75,4.86H501.73a8.3,8.3,0,0,0,5.87-14.18Z"
                    transform="translate(-1.98 -55)"
                />
            </svg>
        </ng-template>
    `,
})
export class IconSolanaComponent {
    @Input() class: any = '';
    @ViewChild('template', { static: true }) template: any;
    constructor(private viewContainerRef: ViewContainerRef) {}
    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.template);
        this.viewContainerRef.element.nativeElement.remove();
    }
}
