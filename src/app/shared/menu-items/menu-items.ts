import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fas fa-home' },
  { state: 'winners', type: 'link', name: 'Winners', icon: 'fas fa-trophy' },
  // { state: 'contact', type: 'link', name: 'Contact', icon: 'fas fa-info' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
