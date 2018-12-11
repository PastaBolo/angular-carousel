import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[refreshView]'
})
export class RefreshView {
  @Input('refreshView') set refresh(value: string) {
    this.vcr.clear();
    this.vcr.createEmbeddedView(this.tmpl);
  }

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}
}
