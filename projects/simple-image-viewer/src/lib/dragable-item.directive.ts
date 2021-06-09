import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({ selector: '[dragableItem]' })
export class DragableItemDirective implements OnInit {

  @Input() container: string;

  initialOffsetTop = 0;
  initialOffsetLeft = 0;
  initialClientX = 0;
  initialClientY = 0;

  allowMove = false;

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnInit() {
    (document.getElementById(this.container) || window).addEventListener('mouseup', (e: MouseEvent) => {
      this.allowMove = false;
    });
  }

  @HostListener('mousedown', ['$event'])
  mousedown(e: MouseEvent) {
    e.preventDefault();
    this.updateMoving(e);

    this.allowMove = true;
  }

  @HostListener('mousemove', ['$event'])
  mousemove(e: MouseEvent) {
    if (this.allowMove) {
      this.move(e);
    }
  }


  move(e: MouseEvent) {
    e.preventDefault();
    this.el.nativeElement.style.top = (this.initialOffsetTop + e.clientY - this.initialClientY)   + "px";
    this.el.nativeElement.style.left = (this.initialOffsetLeft + e.clientX - this.initialClientX) + "px";

    this.updateMoving(e);
  }

  private updateMoving(e: MouseEvent) {
    this.initialClientX = e.clientX;
    this.initialClientY = e.clientY;
    this.initialOffsetLeft = this.el.nativeElement.offsetLeft;
    this.initialOffsetTop = this.el.nativeElement.offsetTop;
  }

}