import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fas fa-home' },
  { state: 'button', type: 'link', name: 'Results', icon: 'fas fa-project-diagram' },
  { state: 'grid', type: 'link', name: 'Winners', icon: 'fas fa-trophy' },
  { state: 'lists', type: 'link', name: 'Contact', icon: 'fas fa-info' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
