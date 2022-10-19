import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge: {value: string}
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fas fa-home', badge: {value: ''} },
  { state: 'winners', type: 'link', name: 'Winners', icon: 'fas fa-trophy', badge: {value: ''} },
  // { state: 'contact', type: 'link', name: 'Contact', icon: 'fas fa-info', badge: {value: ''} }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
