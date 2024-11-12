import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private dbJsonUrl = 'http://localhost:3000/comments'; 

  constructor(private http: HttpClient) { }

  createComment(comment: any): Observable<any> {
    return this.http.post(this.dbJsonUrl, comment).pipe(
      catchError(error => {
        console.error('Error adding comment:', error);
        alert('Failed to add comment. Please try again later.'); 
        return throwError(() => new Error('Failed to add comment'));
      })
    );
  }

}