import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  blogPost: BlogPost;
  tags: string;
  querySub: any;
  updateSub: any;
  routeSub: any;
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }


  formSubmit(f: NgForm){
    this.blogPost.tags = this.tags.split(",").map(tag=>tag.trim()); 
    this.updateSub = this.postService.updatePostById(this.blogPost._id, this.blogPost).subscribe(data=>{
      this.router.navigate(['/admin']);
    });
  }

  deletePost(id){
    if(id){
      this.updateSub = this.postService.deletePostById(id).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/admin']);
      });
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      if(params['id']){
        this.querySub = this.postService.getPostbyId(params['id']).subscribe(data=>{
          this.blogPost = data;
          this.tags = this.blogPost.tags.toString();
        });
      }
    });
  }
  ngOnDestroy(): void {
    if(this.querySub){
      this.querySub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
    if(this.updateSub){
      this.updateSub.unsubscribe();
    }
  }

}
