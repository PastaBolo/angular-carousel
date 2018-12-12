import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core'

@Directive({
  selector: '[rerender]'
})
export class Rerender {
  @Input('rerender')
  set refresh(_: any) {
    this.vcr.clear()
    this.vcr.createEmbeddedView(this.tmpl)
  }

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}
}
