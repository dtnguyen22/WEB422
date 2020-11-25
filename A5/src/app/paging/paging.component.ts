import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input() page: number;
  @Output() newPage = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  previousBtnClicked(){
    if(this.page > 1){
      console.log("emit -" + this.page+ "-1");
      this.newPage.emit(this.page - 1);
    }
  }
  nextBtnClicked(){
    console.log("emit +" + this.page + "+1")
    this.newPage.emit(this.page + 1);
  }
}
