import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
import { TodolistComponent } from './components/TododList/todolist';
import { CalendarComponent } from './components/Calendar/calendar';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ModalModule } from 'angular-custom-modal';
import { MembersComponent } from './components/Members/members';
import { WorkspaceDetailsComponent } from './components/workspace/workspaceDetails';
import { TicketDetailsComponent } from './components/Board/ticket-details/ticket-details.component';

const routes: Routes = [
    { path: 'jitPilot/scrumboard/:boardId', component: BoardDetailsComponent, title: 'Scrumboard | JitPilot' },
    { path: 'jitPilot/members/:workspaceId/members', component: MembersComponent, title: 'Members | JitPilot' },
    { path: 'jitPilot/board/:workspaceId/boards', component: BoardsComponent, title: 'Boards | JitPilot' },
    { path: 'jitPilot/todolist', component: TodolistComponent, title: 'Todolist | JitPilot' },
    { path: 'jitPilot/calendar', component: CalendarComponent, title: 'Calendar | JitPilot' },
    { path: 'jitPilot/workspace/:workspaceId/boards', component: WorkspaceDetailsComponent, title: 'Boards | JitPilot' },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        SortablejsModule,
        DragDropModule,
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
        WorkspaceDetailsComponent,
        TicketDetailsComponent

    ],
})
export class JitPilotModule {}
