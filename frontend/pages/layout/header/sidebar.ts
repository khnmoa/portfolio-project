import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IPersonalInfo } from '../../../models/personal-info.model';
import { PersonalInfoService } from '../../../services/personal-info.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit{
  personalInfo!: IPersonalInfo;

  constructor (private _personalS:PersonalInfoService){}
  ngOnInit(): void {
    this._personalS.getPersonalInfo().subscribe(data => {
      this.personalInfo = data;
    });

    console.log(this.personalInfo?.socialLinks?.facebook)
  }


}
