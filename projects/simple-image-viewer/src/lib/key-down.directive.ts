import { Directive, HostListener, Output, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[onKeyDown]' })
export class OnKeyDownDirective implements OnInit {

  @Input() onKeyDown: string | string[];
  @Output() handler = new EventEmitter();
  
  constructor() { }
  ngOnInit(): void {
  }


  @HostListener('document:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (typeof this.onKeyDown === 'string') {
      if (event.code === this.onKeyDown) {
        this.handler.emit(event.code);
      }
    }
    if (Array.isArray(this.onKeyDown)) {
      if (this.onKeyDown.includes(event.code)) {
        this.handler.emit(event.code);
      }
    }
  }
}