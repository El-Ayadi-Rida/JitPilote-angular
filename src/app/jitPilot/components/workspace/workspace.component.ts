//import { Component, OnInit } from '@angular/core';

import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { workspace } from '../../models/workspace';
import { WorkspaceService } from '../../services/workspace.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],
})


export class WorkspaceComponent implements OnInit{

  workspace! : workspace[]
  constructor(public fb: FormBuilder,private workspaceServie:WorkspaceService, private router: Router){}
    
    paramms = {
            workspaceId: null,
            name: '',
            description: '',
    };
    
    
    @ViewChild('isAddWorkspaceModal') isAddWorkspaceModal!: ModalComponent;
    @ViewChild('isDeleteWorkspaceModal') isDeleteWorkspaceModal!: ModalComponent;
    //@ViewChild('isViewNoteModal') isViewNoteModal!: ModalComponent;
    isShowWorkspaceMenu = false;
   
    selectedWorkspace: any = null;

    selectedTab: any = 'all';
  

    ngOnInit() {
        this.getAllWorkspace();
    }

    getAllWorkspace() {
            this.workspaceServie.getAllWorkspace().subscribe(
              (data)=>{
                this.workspace = data
                console.log("data" ,data)
            })
          }

   

   

    
    deleteNoteConfirm(works: any) {
        setTimeout(() => {
        
            
            this.deleteWorkspace=works;
            this.isDeleteWorkspaceModal.open();
        });
    }

  


    addEditWorkspace(workspace: any = null) {
        setTimeout(() => {
            this.paramms = {
                workspaceId: null,
                name: '',
                description: '',
            };
        
            if (workspace) {
                this.paramms = JSON.parse(JSON.stringify(workspace));
            }
            this.isAddWorkspaceModal.open();
        });
    }


    saveWorkspace() {
        if (!this.paramms.name) {
            this.showMessage('name is required.', 'error');
            return;
        }
  
        if (this.paramms.workspaceId) {

            const works: workspace = {
                workspaceId: this.paramms.workspaceId,
                name: this.paramms.name,
                description: this.paramms.description,
              };
              console.log(this.paramms.workspaceId, works);
            
                this.workspaceServie.update(this.paramms.workspaceId, works).subscribe(
                  (res) => {
                    console.log('API Response:', res);
                    const idx = this.workspace.findIndex((WORKS)=>{
                      this.showMessage('workspace has been updated successfully.');
                      return WORKS.workspaceId== res.workspaceId;
                      

                    })  
                    this.workspace[idx]=res
                    
                  },
                  (error) => {
                    console.error('Error updating workspace:', error);
                  }
                );
              
            
        } else {
            //add project
            
            const newWorkspace: workspace = {
                workspaceId: 0, // Set a temporary value or handle it on the server
                name: this.paramms.name,
                description: this.paramms.description,
              };
            
              this.workspaceServie.create(1,newWorkspace).subscribe(
                (addedCategory) => {
                  this.workspace.push(addedCategory);
                  this.showMessage('workspace has been saved successfully.');
                },
                (error) => {
                  console.error('Error adding workspace:', error);
                }
              );        }
  
        //this.showMessage('workspace has been saved successfully.');
        this.isAddWorkspaceModal.close();
    }

    

    viewWorkspace(workspaceId:number) {
      setTimeout(() => {
         // this.selectedWorkspace = workspace;
          this.router.navigate([`/jitPilot/workspace/${workspaceId}/boards`]);
              
         

      });
  }

   

   
    deleteWorkspace(workspaceId:number) {
        console.log(workspaceId);
            this.workspaceServie.deleteWorkspace(workspaceId).subscribe(() => {
            this.workspace = this.workspace.filter(works => works.workspaceId !== workspaceId);
            this.showMessage('Note has been deleted successfully.');
            //this.isDeleteWorkspaceModal.close();
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






