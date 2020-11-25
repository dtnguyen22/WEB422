import { Component, OnDestroy, OnInit } from '@angular/core';
import {PostService} from '../post.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Array<any>;
  querySub: any;
  constructor(private postService: PostService) { }


  ngOnInit(): void {
    this.querySub = this.postService.getCategories().subscribe(data=>{
      this.categories = data;
    });
  }

  ngOnDestroy(): void {
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

}
