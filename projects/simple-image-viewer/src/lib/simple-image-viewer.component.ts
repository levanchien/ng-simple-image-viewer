import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {
  LIST_BUTTONS,
  EVENT_ZOOM_IN,
  CSS_SCALE_REGEX,
  INITIAL_SCALE,
  EVENT_ZOOM_OUT,
  EVENT_RESET,
  EVENT_NEXT,
  EVENT_PREV,
  CONTAINER_ID,
  FOOTER_ID,
  INITIAL_ROTATE,
  CSS_ROTATE_REGEX,
  EVENT_ROTATE_LEFT,
  EVENT_ROTATE_RIGHT,
  EVENT_FLIP_HORIZONTAL,
  EVENT_FLIP_VERTICAL,
  CSS_ROTATEX_REGEX,
  CSS_ROTATEY_REGEX,
  CONTAINER_CLASS,
  MAIN_CONTENT_CLASS,
  KEY_ESCAPE,
  KEY_LEFT_ARROW,
  KEY_RIGHT_ARROW,
  EVENT_PLAY
} from './constant';
import { SimpleImageViewer } from './simple-image-viewer.interface';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './simple-image-viewer.component.html',
  styleUrls: ['./simple-image-viewer.component.css'],
  animations: [
    trigger('hiddenToShow', [
      state('hidden', style({
        transform: 'scale(0)'
      })),
      state('show', style({
        transform: 'scale(1)'
      })),
      transition('hidden => show', [
        animate('0.5s')
      ])
    ]),
    trigger('triggerOpacity', [
      state('opacity_0', style({
        opacity: 0
      })),
      state('opacity_1', style({
        opacity: 1
      })),
      transition('opacity_0 <=> opacity_1', [
        animate('0.3s')
      ])
    ])
  ]
})
export class SimpleImageViewerComponent implements OnInit, OnDestroy {

  @ViewChild('imgRef', { static: true }) imgRef: ElementRef;

  @Input() imageViewerList: SimpleImageViewer[];
  @Output() closeEvent = new EventEmitter();

  selectedIndex = 0;
  element: any;
  parentElement: any;
  loading: boolean;

  currentImageName: string;
  currentImageWidth: number;
  currentImageHeight: number;
  imagePercent: number = 0;
  showImagePercent: boolean = false;
  timeoutShowImagePercent: any;

  LIST_BUTTONS = LIST_BUTTONS;
  KEYS = [KEY_ESCAPE, KEY_LEFT_ARROW, KEY_RIGHT_ARROW];


  constructor(
    private ref: ElementRef,
  ) { }

  ngOnInit(): void {
    this.element = this.imgRef.nativeElement;
    this.parentElement = this.element.parentElement;
    this.ref.nativeElement.addEventListener('click', ($event) => {
      const {className} = $event.target;
      if (className.includes(CONTAINER_CLASS) || className.includes(MAIN_CONTENT_CLASS)) {
        this.close();
      }
    });
    window.addEventListener('resize', () => {
      this.resize();
    });
  }
  
  close() {
    this.closeEvent.emit();
  }

  action(event: string) {
    switch (event) {
      case EVENT_ZOOM_IN:
        this.zoom(.1); break;
      case EVENT_ZOOM_OUT:
        this.zoom(-.1); break;
      case EVENT_RESET:
        this.reset(); break;
      case EVENT_NEXT:
        this.move(1); break;
      case EVENT_PREV:
        this.move(-1); break;
      case EVENT_ROTATE_LEFT:
        this.rotate(-90); break;
      case EVENT_ROTATE_RIGHT:
        this.rotate(90); break;
      case EVENT_FLIP_HORIZONTAL:
        this.flip(180, true); break;
      case EVENT_FLIP_VERTICAL:
        this.flip(-180); break;
      case EVENT_PLAY:
        /* this.autoPlay(); break; */
    }
  }

  autoPlay() {
    setInterval(() =>  this.move(1), 5000);
  }

  flip(value: number, horizontal: boolean = false) {
    let degValue = INITIAL_ROTATE;
    let transform: string = this.getStyle('transform');
    let se = horizontal ? 'rotateX' : 'rotateY'; 
    let reg = horizontal ? CSS_ROTATEX_REGEX : CSS_ROTATEY_REGEX;
    if (transform) {
      degValue = Number(transform.match(reg)) || INITIAL_ROTATE;
      transform = transform.replace(`${se}(${degValue}deg)`, '').trim();
    }
    this.setStyle('transform', transform + ` ${se}(${degValue + value}deg)`);
  }

  zoom(value: number) {
    this.showImagePercent = true;
    if (this.timeoutShowImagePercent) {
      clearTimeout(this.timeoutShowImagePercent);
    }
    let scaleValue: number = INITIAL_SCALE;
    let transform: string = this.getStyle('transform');
    
    if (transform) {
      scaleValue = Number(transform.match(CSS_SCALE_REGEX)) || INITIAL_SCALE;
      transform = transform.replace(`scale(${scaleValue})`, '').trim();
    }

    const newScaleValue = scaleValue + value === 0 ? scaleValue : (scaleValue + value);
    this.setStyle('transform', transform + ` scale(${newScaleValue})`);
    this.imagePercent = newScaleValue * 100;
    this.timeoutShowImagePercent = setTimeout(() => this.showImagePercent = false, 750);
  }

  rotate(value: number) {
    let degValue = INITIAL_ROTATE;
    let transform: string = this.getStyle('transform');
    if (transform) {
      degValue = Number(transform.match(CSS_ROTATE_REGEX)) || INITIAL_ROTATE;
      transform = transform.replace(`rotate(${degValue}deg)`, '').trim();
    }
    this.setStyle('transform', transform + ` rotate(${degValue + value}deg)`);
  }

  reset() {
    this.clearStyle();
    this.resize();
  }

  getStyle(style?: string): any {
    return (!style ? this.element.style : (this.element.style[style] || ''));
  }

  setStyle(key: string, value: string) {
    this.element.style[key] = value;
  }

  clearStyle() {
    this.element.style = '';
    this.parentElement.style = '';
  }

  move(step: number, directly: boolean = false) {
    if (this.loading) {
      return;
    }

    if (directly && step === this.selectedIndex) {
      return;
    }

    if (this.imageViewerList.length <= 1) {
      return;
    }

    this.loading = true;

    this.clearStyle();

    if (directly) {
      this.selectedIndex = step;
      return;
    }

    if (this.selectedIndex + step === this.imageViewerList.length) {
      this.selectedIndex = 0;
      return;
    }
    if (this.selectedIndex + step === -1) {
      this.selectedIndex = this.imageViewerList.length - 1;;
      return;
    }

    this.selectedIndex += step;
  }

  loaded() {
    this.loading = false;
    this.resize();
  }

  resize() {
    this.resetSize();
    const maxHeight = this.getMaxHeightOfView() - this.footerHeight * 2;
    const maxWidth = this.getMaxWidthOfView();

    this.currentImageWidth = this.element.naturalWidth;
    this.currentImageHeight = this.element.naturalHeight;
    this.currentImageName = this.imageViewerList[this.selectedIndex].originUrl.split('/').pop();

    let w = 0;
    let h = 0;
    const aspectRatio =  this.currentImageWidth / this.currentImageHeight;    

    if (this.currentImageHeight >= maxHeight) {
      h = maxHeight - maxHeight * 1 / 100;
      w = h * aspectRatio;

      if (w <= maxWidth) {
        this.setStyle('maxWidth', `${w}px`);
        this.setStyle('maxHeight', `${h}px`);
        return;
      }
    }

    if ( this.currentImageWidth >= maxWidth) {
      w = maxWidth - maxWidth * 5 / 100;
      h = w / aspectRatio;
      this.setStyle('maxWidth', `${w}px`);
      this.setStyle('maxHeight', `${h}px`);
      return;
    }
  }

  resetSize() {
    this.setStyle('maxWidth', '');
    this.setStyle('maxHeight', '');
  }

  onWheel($event) {
    if ($event.deltaY < 0) {
      this.zoom(.1);
    }

    if ($event.deltaY > 0) {
      this.zoom(-.1);
    }
  }

  onKeyDown(key: string) {
    switch (key) {
      case KEY_ESCAPE:
        this.close(); break;
      case KEY_RIGHT_ARROW:
        this.move(1); break;
      case KEY_LEFT_ARROW:
        this.move(-1); break;
    }
  }

  getMaxWidthOfView() {
    return document.getElementById(CONTAINER_ID).clientWidth;
  }

  getMaxHeightOfView() {
    return document.getElementById(CONTAINER_ID).clientHeight;
  }

  get footerHeight() {
    return document.getElementById(FOOTER_ID).offsetHeight;
  }

  ngOnDestroy() {
  }
}
