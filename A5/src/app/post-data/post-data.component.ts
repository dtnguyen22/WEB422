import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BlogPost} from '../BlogPost';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {
  post: BlogPost;
  querySub: any;
  routeSub: any;
  constructor(private postService: PostService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.querySub = this.postService.getPostbyId(params['id']).subscribe(data=>{
        console.log(data);
        this.post = data;
      });
    });
  }
  ngOnDestroy(): void {
    if(this.querySub){
      this.querySub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
