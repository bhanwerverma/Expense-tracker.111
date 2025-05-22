import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-expence-tracker-navbar',
  imports: [RouterOutlet  ,RouterLink],
  templateUrl: './expence-tracker-navbar.component.html',
  styleUrl: './expence-tracker-navbar.component.css'
})
export class ExpenceTrackerNavbarComponent {

}
