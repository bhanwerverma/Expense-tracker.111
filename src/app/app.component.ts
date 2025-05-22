import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { ExpenceTrackerNavbarComponent } from "./Component/expence-tracker-navbar/expence-tracker-navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExpenceTrackerNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}
