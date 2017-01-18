import { Component } from '@angular/core';
import {CoursesComponent} from './courses.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works by Ravi!';
  modules = ['module1', 'module2'];
}
