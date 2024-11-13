import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts():
 Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl,
 {
      params: { _limit: 3 } 
    });
  }

  getPostById(id: string): Observable<Post> {  
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
  
}