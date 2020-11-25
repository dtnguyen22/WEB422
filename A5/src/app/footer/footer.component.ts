import { Component, OnInit } from '@angular/core';
import {BlogPost} from '../BlogPost';
import blogData from '../blogData.json';
import { PostService } from '../post.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  //we only need 3 posts for footer
  blogPosts: Array<BlogPost>;
  querySub: any;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.querySub = this.postService.getPosts(1, null, null).subscribe(data=>{
      this.blogPosts = data.slice(0,3);
    });
  }

}
