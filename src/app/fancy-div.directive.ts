import { 
    Directive, 
    ElementRef, 
    HostBinding, 
    HostListener, 
    Renderer, 
    Input, 
    OnInit } from '@angular/core';

@Directive({ selector: '[fancy-div]' })
export class FancyDivDirective implements OnInit {
    private DEFAULT_SIDE_SIZE: number = 200;
    private DEFAULT_BACKGROUND_COLOR: string = "#DDD";
    private DEFAULT_TEXT_COLOR: string = "#000";
    private SIZE_INCREMENT: number = 100;
    
    @Input('fancy-div') _defaultBackgroundColor: string;
    @Input('textColor') _defaultTextColor: string;
    @Input('hoverBackgroundColor') _hoverBackgroundColor: string;
    @Input('hoverTextColor') _hoverTextColor: string;
    @Input('divSideSize') _sideSize: string;

    @HostBinding('style.width.px') elementWidth: number;
    @HostBinding('style.height.px') elementHeight: number;
    @HostBinding('style.color') textColor: string;
    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
       this.setDefaultSideLength();
       this.setDefaultColours();
    }

    @HostListener("mouseover") onMouseOver() {
        this.clearDivText();
        this.renderer.createText(this.el.nativeElement, "Hello World");

        this.elementWidth += this.SIZE_INCREMENT;
        this.elementHeight += this.SIZE_INCREMENT;

        if(this._hoverBackgroundColor) {
            this.backgroundColor = this._hoverBackgroundColor;
        }

        if(this._hoverTextColor) {
            this.textColor = this._hoverTextColor;
        }
    }

    @HostListener("mouseout") onMouseOut() {
        this.clearDivText();
        this.renderer.createText(this.el.nativeElement, "Fancy Div");

        this.setDefaultColours();
        this.setDefaultSideLength();
    }

    private setDefaultColours() {
       this.textColor = this._defaultTextColor ? this._defaultTextColor : this.DEFAULT_TEXT_COLOR;
       this.backgroundColor = this._defaultBackgroundColor ? this._defaultBackgroundColor : this.DEFAULT_BACKGROUND_COLOR;
    }

    private setDefaultSideLength() {
       this.elementWidth = this._sideSize ? Number(this._sideSize) : this.DEFAULT_SIDE_SIZE;
       this.elementHeight = this.elementWidth;
    }

    private clearDivText() {
        this.renderer.setElementProperty(this.el.nativeElement, "innerHTML", "");
    }
}