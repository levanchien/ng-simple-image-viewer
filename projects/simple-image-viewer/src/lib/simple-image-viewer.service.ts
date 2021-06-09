import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { SimpleImageViewerComponent } from './simple-image-viewer.component';
import { SimpleImageViewer } from './simple-image-viewer.interface';

@Injectable({
  providedIn: 'root'
})
export class SimpleImageViewerService {

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  showImageViewer(imageViewerList: SimpleImageViewer[], opts?: any): SimpleImageViewerComponent {

    const viewer = document.createElement('app-image-viewer');
    const componentFactory
      = this.componentFactoryResolver.resolveComponentFactory(SimpleImageViewerComponent);

    const componentRef = componentFactory.create(this.injector, [], viewer);

    this.applicationRef.attachView(componentRef.hostView);

    componentRef.instance.imageViewerList = imageViewerList;
    componentRef.instance.closeEvent.subscribe(() => {
      viewer.remove();
      this.applicationRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });


    document.body.appendChild(viewer);

    return componentRef.instance;
  }
}
