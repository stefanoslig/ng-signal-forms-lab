import {
  NgDocRootComponent,
  NgDocNavbarComponent,
  NgDocSidebarComponent,
  NgDocThemeToggleComponent,
} from '@ng-doc/app';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgDocIconComponent } from '@ng-doc/ui-kit';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgDocRootComponent,
    NgDocNavbarComponent,
    NgDocSidebarComponent,
    NgDocIconComponent,
    NgDocThemeToggleComponent,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '[attr.data-ng-doc-is-landing]': 'isLandingPage' },
})
export class App {
  protected readonly location = inject(Location);

  get isLandingPage(): boolean {
    return this.location.path() === '';
  }
}
