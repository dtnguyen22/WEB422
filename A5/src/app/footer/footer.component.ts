import { Component, OnInit } from '@angular/core';
import {BlogPost} from '../BlogPost';
import blogData from '../blogData.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  //we only need 3 posts for footer
  blogPosts: Array<BlogPost> = blogData.slice(0,3);
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.blogPosts);
  }

}
