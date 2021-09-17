import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, EventEmitter, Output, HostBinding, Renderer2 } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Season } from 'src/app/domain/season';
import { MenuItems } from '../../shared/menu-items/menu-items';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  public darkModeUI = true;
  @Output('darkThemeOn') darkThemeOn: EventEmitter<boolean> = new EventEmitter<boolean>();

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private renderer: Renderer2,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.renderPageBodyColor();
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  @HostBinding('class')
  public get themeMode() {
    return this.darkModeUI ? 'dark-theme' : 'light-theme';
  }

  public getDarkThemeOn($event: boolean) {
    this.darkModeUI = $event;
    this.renderPageBodyColor();
  }

  private renderPageBodyColor() {
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.addClass(document.body, this.darkModeUI ? 'dark-theme' : 'light-theme');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }
}
