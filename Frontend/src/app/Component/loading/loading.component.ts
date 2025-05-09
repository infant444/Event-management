import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../Services/loading/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {
  isLoading!:boolean;
  constructor(private loadingServices:LoadingService){}
  ngOnInit(): void {
    this.loadingServices.isLoading.subscribe((load)=>{
      this.isLoading=load;
      console.log(this.isLoading)
    })
  }

}
