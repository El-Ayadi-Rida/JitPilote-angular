import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'icon-litecoin',
    template: `
        <ng-template #template>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0.847 0.876 329.254 329.256" [ngClass]="class">
                <title>Litecoin</title>
                <path
                    d="M330.102 165.503c0 90.922-73.705 164.629-164.626 164.629C74.554 330.132.848 256.425.848 165.503.848 74.582 74.554.876 165.476.876c90.92 0 164.626 73.706 164.626 164.627"
                    fill="#345d9d"
                />
                <path
                    d="M295.15 165.505c0 71.613-58.057 129.675-129.674 129.675-71.616 0-129.677-58.062-129.677-129.675 0-71.619 58.061-129.677 129.677-129.677 71.618 0 129.674 58.057 129.674 129.677"
                    fill="#345d9d"
                />
                <path
                    d="M155.854 209.482l10.693-40.264 25.316-9.249 6.297-23.663-.215-.587-24.92 9.104 17.955-67.608h-50.921l-23.481 88.23-19.605 7.162-6.478 24.395 19.59-7.156-13.839 51.998h135.521l8.688-32.362h-84.601"
                    fill="#fff"
                />
            </svg>
        </ng-template>
    `,
})
export class IconLitecoinComponent {
    @Input() class: any = '';
    @ViewChild('template', { static: true }) template: any;
    constructor(private viewContainerRef: ViewContainerRef) {}
    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.template);
        this.viewContainerRef.element.nativeElement.remove();
    }
}
