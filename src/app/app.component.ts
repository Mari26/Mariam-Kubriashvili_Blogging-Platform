import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BlogPostComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blogingg-Platform';
}
