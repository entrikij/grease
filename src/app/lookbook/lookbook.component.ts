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
                preview: false,
                imageInfinityMove: true,
                width: '100%',
                arrowPrevIcon: "fa fa-angle-left",
                arrowNextIcon: "fa fa-angle-right",
                imageSize: "contain"
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
