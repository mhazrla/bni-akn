import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appThousandSeparator]',
})
export class ThousandSeparatorDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const inputElement = this.el.nativeElement;
    const value = inputElement.value.replace(/\D/g, '');
    inputElement.value = this.formatNumber(value);
  }

  private formatNumber(value: string): string {
    return Number(value).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  }
}
