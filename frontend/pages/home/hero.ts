import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from '../../services/personal-info.service';
import { IPersonalInfo } from '../../models/personal-info.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit{

  personalInfo!: IPersonalInfo;
  constructor(private _personalS: PersonalInfoService) { }
  
  ngOnInit(): void {
    this._personalS.getPersonalInfo().subscribe(data => {
      this.personalInfo = data;
      this.personalInfo.image = this._personalS.getImageUrl(data.image?? null)?? undefined;
    });
    
  }

}
