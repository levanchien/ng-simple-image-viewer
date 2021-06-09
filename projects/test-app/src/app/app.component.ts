import { Component, OnInit } from '@angular/core';

import { SimpleImageViewer, SimpleImageViewerService } from 'simple-image-viewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  list: SimpleImageViewer[] = [
    {
      originUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-2.jpg',
      thumbnailUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-2.jpg'
    },
    {
      originUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-1.jpg',
      thumbnailUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-1.jpg'
    },
    {
      originUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-3.jpg',
      thumbnailUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-3.jpg'
    },
    {
      originUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-4.jpg',
      thumbnailUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-4.jpg'
    },
    {
      originUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-5.jpg',
      thumbnailUrl: 'https://fengyuanchen.github.io/viewerjs/images/tibet-5.jpg'
    },
  ];

  constructor(private service: SimpleImageViewerService) {

  }

  ngOnInit() {
    this.service.showImageViewer(this.list)
  }
}
