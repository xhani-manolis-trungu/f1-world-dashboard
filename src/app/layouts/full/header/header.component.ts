import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  private darkThemeIcon = 'nightlight_round';
  private lightThemeIcon = 'wb_sunny';
  public lightDarkToggleIcon = this.darkThemeIcon;

  @Output() darkThemeOn: EventEmitter<boolean> = new EventEmitter<boolean>();

  public doToggleLightDark(toggle: MatSlideToggle) {

    this.lightDarkToggleIcon = toggle.checked ? this.darkThemeIcon : this.lightThemeIcon;

    this.darkThemeOn.emit(toggle.checked);
  }
}
