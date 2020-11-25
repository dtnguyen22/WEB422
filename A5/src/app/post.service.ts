import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

//maximum perpage
const perPage = 6;

@Injectable({
  providedIn: 'root'
})


export class PostService {
  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]> {
    let url = `https://tai-blog-api.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;
    if(tag != null){
      url += `&tag=${tag.substring(1)}`;//remove #
    }
    if(category != null){
      url += `&category=${category}`;
    }
    return this.http.get<BlogPost[]>(url);
  }

  getPostbyId(id): Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://tai-blog-api.herokuapp.com/api/posts/${id}`);
  }

  getCategories():Observable<any>{
    return this.http.get<any>(`https://tai-blog-api.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]>{
    return this.http.get<string[]>(`https://tai-blog-api.herokuapp.com/api/tags`);
  }
}
