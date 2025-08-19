import { Component } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ ],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css']
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
