import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./pages/public/home/home";
import { NavBar } from "./shared/nav-bar/nav-bar";
import { Venue } from "./pages/public/facilities/venue/venue";
import { Band } from "./pages/public/facilities/band/band";
import { Decoration } from "./pages/public/facilities/decoration/decoration";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Home, Venue, Band, Decoration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
