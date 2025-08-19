import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IService } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit{
  services!: IService[];
  constructor(private _serviceS: ServicesService) { }
  
  ngOnInit(): void {
    this._serviceS.getServices().subscribe(data => {
      this.services = data;
    })
  }


}
