import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  posts() {
    return this.http.get('posts');
  }
  saveComment(data, id) {
    return this.http.post('posts/saveComment/'+id, data);
  }
}
