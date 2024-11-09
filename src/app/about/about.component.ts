import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  imageUrl = 'ast.jpg';
  imageUrl1='he.jpg';
  imageUr2='hi.jpg';
  imageUr3='one.jpg';
}
