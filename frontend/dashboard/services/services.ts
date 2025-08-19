import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IService } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-dashboard-services',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit{
  services!: IService[];
  servicesForms: FormGroup[]=[];
  newServiceForm!: FormGroup;

  constructor(private fb:FormBuilder,private _serviceS:ServicesService){}
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this._serviceS.getServices().subscribe(data => {
      this.services = data;
      this.servicesForms = this.services.map(service => this.fb.group({
        icon: [service.icon],
        title: [service.title],
        description:[service.description]
      }))
    })
  }

  addService() {
      if (this.newServiceForm.valid) {
        this._serviceS.addService(this.newServiceForm.value).subscribe(() => {
          this.loadAll();
          this.newServiceForm.reset();
        });
      }
    }
    
    
      updateService(service: IService) {
        this._serviceS.updateService(service).subscribe(data => {
          console.log(data);
          this.loadAll();
        });
      }
      deleteService(id: string, index: number) {
        this._serviceS.deleteService(id).subscribe(data => {
          console.log(data);
          this.services.splice(index, 1);
        })
      }
      
      addNewForm() {
      this.newServiceForm = this.fb.group({
        icon: [''],
            title: [''],
            description: [''],
      });
    }
    
      cancel() {
        this.newServiceForm.reset();
      }


}
