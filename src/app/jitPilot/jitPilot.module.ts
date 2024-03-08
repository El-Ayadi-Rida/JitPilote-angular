import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modal

// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';

// headlessui
import { MenuModule } from 'headlessui-angular';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// quill editor
import { QuillModule } from 'ngx-quill';

// fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// datatable
import { DataTableModule } from '@bhplugin/ng-datatable';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { BoardDetailsComponent } from './components/Board/boardDetails';
import { BoardsComponent } from './components/Board/boards';
import { MembersComponent } from './components/Members/members';
import { TodolistComponent } from './components/TododList/todolist';
import { CalendarComponent } from './components/Calendar/calendar';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ModalModule } from 'angular-custom-modal';

const routes: Routes = [
    { path: 'jitPilot/scrumboard/:boardId', component: BoardDetailsComponent, title: 'Scrumboard | JitPilot' },
    { path: 'jitPilot/members', component: MembersComponent, title: 'Members | JitPilot' },
    { path: 'jitPilot/boards', component: BoardsComponent, title: 'Boards | JitPilot' },
    { path: 'jitPilot/todolist', component: TodolistComponent, title: 'Todolist | JitPilot' },
    { path: 'jitPilot/calendar', component: CalendarComponent, title: 'Calendar | JitPilot' },
    { path: 'jitPilot/workspaces', component: WorkspaceComponent, title: 'WorkSpace | JitPilot' },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        SortablejsModule,
        MenuModule,
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard',
        }),
        QuillModule.forRoot(),
        FullCalendarModule,
        NgxTippyModule,
        DataTableModule,
        IconModule,
    ],
    declarations: [
        BoardDetailsComponent,
        MembersComponent,
        BoardsComponent,
        TodolistComponent,
        CalendarComponent,
        WorkspaceComponent,

    ],
})
export class JitPilotModule {}
