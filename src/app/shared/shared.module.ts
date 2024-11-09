import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';

import {provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PostService,provideHttpClient(withFetch())
  ]
})
export class SharedModule { }
