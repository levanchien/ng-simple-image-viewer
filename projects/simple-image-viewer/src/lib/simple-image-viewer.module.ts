import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragableItemDirective } from './dragable-item.directive';
import { ExtractElementToArrayPipe } from './extract-element-to-array.pipe';
import { OnKeyDownDirective } from './key-down.directive';
import { SimpleImageViewerComponent } from './simple-image-viewer.component';



@NgModule({
  declarations: [
    SimpleImageViewerComponent,
    DragableItemDirective,
    OnKeyDownDirective,
    ExtractElementToArrayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [SimpleImageViewerComponent]
})
export class SimpleImageViewerModule { }
