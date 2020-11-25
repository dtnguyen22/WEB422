import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: any;
  //routeSub: any;
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params['tag']) {
        this.tag = params['tag'];
        this.category = null;
      } else {
        this.tag = null;
      }

      if(params['category']){
        this.category = params['category'];
        this.tag=null;
      }else{
        this.category = null;
      }
      //getPage
      this.getPage(+params['page'] || 1);
    });
  }

  getPage(num){
    this.querySub = this.postService.getPosts(num, this.tag, this.category).subscribe(data=>{
      if(data.length != 0){
        console.log(data);
        this.blogPosts = data;
        this.page = num;
      }
    });
  }
  getNewPage(e){
    console.log("receive emit "+ e);
    if(e){
      this.getPage(e);
    }
  }

  onDestroy():void{
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

}
