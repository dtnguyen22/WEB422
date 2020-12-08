import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  updateSub: any;
  //
  commentName: string;
  commentText: string;
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  submitComment(f: NgForm){
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    })
    this.updateSub = this.postService.updatePostById(this.post._id, this.post).subscribe(data=>{
      this.commentName = "";
      this.commentText = "";
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.querySub = this.postService.getPostbyId(params['id']).subscribe(data=>{
        this.post = data;
        this.post.views++;
        this.updateSub = this.postService.updatePostById(this.post._id, this.post).subscribe();
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
