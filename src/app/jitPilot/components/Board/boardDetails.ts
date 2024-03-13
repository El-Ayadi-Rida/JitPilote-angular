import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { FormBuilder } from '@angular/forms';
import { Board } from '../../models/board';
import { Section } from '../../models/section';
import { SectionService } from '../../services/section.service';
import { TicketPriority } from '../../models/ticket-priority';
import { TicketStatus } from '../../models/ticket-status';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';

@Component({
    moduleId: module.id,
    templateUrl: './boardDetails.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class BoardDetailsComponent implements OnInit{
    constructor(
        private route: ActivatedRoute,
        public fb: FormBuilder , 
        private boardService:BoardService,
        private sectionService:SectionService,
        private ticketService:TicketService
        ) {}
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.boardId = params['boardId'];            
          });
          this.getBoardById();
          this.workspaceId=JSON.parse(sessionStorage.getItem("workspaceItem")!).workspaceId;
          console.log(this.workspaceId);
    }
    boardId:number=0;
    currentBoard!: Board;
    boardName!:string;
    sectionList!: Section[];
    workspaceId!:number;
    currentSectionId!:number;
    ticketToDelete!:Ticket;
    params = {
        sectionId: null,
        sectionTitle: '',
        tickets:[],
    };
    paramsTicket = {
        ticketId: null,
        title: '',
        description: '',
        priority: TicketPriority.HIGH,
        status: TicketStatus.IN_PROGRESS,
    
    };
    selectedTask: any = null;
    @ViewChild('isAddProjectModal') isAddProjectModal!: ModalComponent;
    @ViewChild('isAddTaskModal') isAddTaskModal!: ModalComponent;
    @ViewChild('isDeleteModal') isDeleteModal!: ModalComponent;
    projectList: any = [
        {
            id: 1,
            title: 'In Progress',
            tasks: [
                {
                    projectId: 1,
                    id: 1.1,
                    title: 'Creating a new Portfolio on Dribble',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    image: true,
                    date: ' 08 Aug, 2020',
                    tags: ['designing'],
                },
                {
                    projectId: 1,
                    id: 1.2,
                    title: 'Singapore Team Meet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    date: ' 09 Aug, 2020',
                    tags: ['meeting'],
                },
            ],
        },
        {
            id: 2,
            title: 'Pending',
            tasks: [
                {
                    projectId: 2,
                    id: 2.1,
                    title: 'Plan a trip to another country',
                    description: '',
                    date: ' 10 Sep, 2020',
                },
            ],
        },
        {
            id: 3,
            title: 'Complete',
            tasks: [
                {
                    projectId: 3,
                    id: 3.1,
                    title: 'Dinner with Kelly Young',
                    description: '',
                    date: ' 08 Aug, 2020',
                },
                {
                    projectId: 3,
                    id: 3.2,
                    title: 'Launch New SEO Wordpress Theme ',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    date: ' 09 Aug, 2020',
                },
            ],
        },
        {
            id: 4,
            title: 'Working',
            tasks: [],
        },
    ];
    getBoardById(){
        this.boardService.getBoardById(this.boardId)
                        .subscribe(
                            response => {
                                this.currentBoard = response;
                                this.sectionList = this.currentBoard.sections;
                                this.boardName =this.currentBoard.boardName;                                
                            },
                            error => {console.error('Error geting board:', error);}
                        );
    }
    addEditProject(section: any = null) {
        setTimeout(() => {
            this.params = {
                sectionId: null,
                sectionTitle: '',
                tickets:[],
            };
            if (section) {
                this.params = JSON.parse(JSON.stringify(section));
            }
            this.isAddProjectModal.open();
        });
    }

    saveSection() {
        if (!this.params.sectionTitle) {
            this.showMessage('Title is required.', 'error');
            return;
        }

        if (this.params.sectionId) {
            //update section
            const sectionToUpdate: Section = {
                sectionId: this.params.sectionId,
                sectionTitle: this.params.sectionTitle,
                description: this.params.sectionTitle,
                tickets: this.params.tickets
            };
            this.sectionService.updateSection(
                this.params.sectionId,
                sectionToUpdate
                )
            .subscribe(
                response => {
                    console.log('section updated successfully:', response);
                    this.getBoardById();
                },
                error => {console.error('Error updating section:', error);}
                
            );
        } else {
            //add section
            const newSection:any ={
                sectionId:null,
                sectionTitle: this.params.sectionTitle,
                description: this.params.sectionTitle,
                tickets:[]
            }
            this.sectionService.newSection(
                this.boardId,
                newSection
            )
            .subscribe(
                response => {
                    console.log('section added successfully:', response);
                    this.getBoardById();
                },
                error => {console.error('Error adding section:', error);}
                
            );
        }

        this.showMessage('section has been saved successfully.');
        this.isAddProjectModal.close();
    }

    deleteSection(section: Section) {
        this.sectionService.deleteSection(section.sectionId).subscribe({
            next: () => {
                console.log('Section after next');
                this.getBoardById();
                this.showMessage('Section has been deleted successfully.');
            },
            error: (err) => {
                console.error('Error deleting Section:', err);
            },
        });
    }

    clearProjects(project: any) {
        project.tasks = [];
    }

    // task
    addEditTicket(ticket: any = null , sectionId: number) {
        this.paramsTicket = {
            ticketId: null,
            title: '',
            description: '',
            priority: TicketPriority.HIGH,
            status: TicketStatus.IN_PROGRESS,
        };
        if (ticket) {
            this.paramsTicket = JSON.parse(JSON.stringify(ticket));
        }
        this.currentSectionId = sectionId;
        this.isAddTaskModal.open();
    }

    saveTicket() {
        if (!this.paramsTicket.title) {
            this.showMessage('Title is required.', 'error');
            return;
        }

        if (this.paramsTicket.ticketId) {
            //update task
            const ticketToUpdate: any = {
                ticketId: this.paramsTicket.ticketId,
                title: this.paramsTicket.title,
                description: this.paramsTicket.description,
                priority: this.paramsTicket.priority,
                status: this.paramsTicket.status,
            };
            this.ticketService.updateTicket(
                this.paramsTicket.ticketId,
                ticketToUpdate
                )
            .subscribe(
                response => {
                    console.log('ticket updated successfully:', response);
                    this.getBoardById();
                },
                error => {console.error('Error updating ticket:', error);}
                
            );
        } else {
            //add task
            const newTicket:any ={
                ticketId: null,
                title: this.paramsTicket.title,
                description: this.paramsTicket.description,
                priority: this.paramsTicket.priority,
                status: this.paramsTicket.status,
            }
            this.ticketService.newTicket(
                this.currentSectionId,
                newTicket
            )
            .subscribe(
                response => {
                    console.log('Ticket added successfully:', response);
                    this.getBoardById();
                },
                error => {console.error('Error adding Ticket:', error);}
                
            );
        }

        this.showMessage('ticket has been saved successfully.');
        this.isAddTaskModal.close();
    }

    deleteConfirmModal(ticket: any = null) {
        setTimeout(() => {
            this.ticketToDelete = ticket;
            this.isDeleteModal.open();
        }, 10);
    }

    deleteTicket() {
        this.ticketService.deleteTicket(this.ticketToDelete.ticketId).subscribe({
            next: () => {
                this.getBoardById();
                this.showMessage('Ticket has been deleted successfully.');
                this.isDeleteModal.close();
            },
            error: (err) => {
                console.error('Error deleting Ticket:', err);
            },
        });

    }

    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }
}
