import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-shell',
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.css',
  standalone: false,
})
export class AdminShellComponent {
  @Input() collegeName = 'TCET FSD BATCH';
  @Input() sectionTitle = 'Home Page';

  readonly menuItems = [
    { label: 'Home', route: '/' },
    { label: 'Class', route: '/class' },
    { label: 'Department', route: '/department' },
  ];
}
