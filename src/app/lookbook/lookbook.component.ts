import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.css']
})
export class LookbookComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
            {
                thumbnails: false,
                previewCloseOnClick: true,
                imageInfinityMove: true,
                arrowPrevIcon: "fas fa-angle-left",
                arrowNextIcon: "fas fa-angle-right"
            },
            {
                breakpoint: 500,
                width: '100%',
                height: '200px'
            }
        ];
        this.galleryImages = [
            {
                small: 'assets/lookbook/3.jpg',
                medium: 'assets/lookbook/3.jpg',
                big: 'assets/lookbook/3.jpg'
            },
            {
                small: 'assets/lookbook/4.jpg',
                medium: 'assets/lookbook/4.jpg',
                big: 'assets/lookbook/4.jpg'
            },
            {
                small: 'assets/lookbook/5.jpg',
                medium: 'assets/lookbook/5.jpg',
                big: 'assets/lookbook/5.jpg'
            }
        ];
  }

}
