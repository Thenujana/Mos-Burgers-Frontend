import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavComponent } from '../../header/admin-nav/admin-nav.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,AdminNavComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
