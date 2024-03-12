import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { workspace } from '../jitPilot/models/workspace';
import { WorkspaceService } from '../jitPilot/services/workspace.service';
import { AppService } from '../service/app.service';
import { slideDownUp } from '../shared/animations';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent {
    @Input() item = '';
    active = false;
    store: any;
    workspaceId!:any
    workspace!: workspace;
    activeDropdown: string[] = [];
    parentDropdown: string = '';
    constructor(
        public translate: TranslateService, 
        public storeData: Store<any>, 
        public router: Router,
        private route: ActivatedRoute,
        private workspaceService:WorkspaceService,
        private appService:AppService
        ) {
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }
    isJitPilotWorkspacesRoute(): boolean {
        return this.router.url === '/';
      }

    ngOnInit() {
         this.route.params.subscribe(params => {
             this.workspaceId = params['workspaceId'];     
             console.log(params);
                    
           });
        this.setActiveDropdown();

            this.workspace=JSON.parse(sessionStorage.getItem("workspaceItem")!);
            console.log(this.workspace);


        // this.appService.currentWorspace.subscribe(workspacef =>
        //     {
        //         this.workspace = workspacef
        //         console.log(this.workspace);
                
        //     }
        //     ); 

        
        
        
        
    }
    initWorkspace(){ 
        this.workspaceService.getWorkspaceById(this.workspaceId).subscribe((data) =>{
            this.workspace = data;
        });
    }
    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }
}
