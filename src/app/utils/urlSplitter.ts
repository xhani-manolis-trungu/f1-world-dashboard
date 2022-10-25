export class UrlSplitter {
  public driverName!: string;

  public urlSplitter(url$: string) {
    const url = url$.split('/');

    this.driverName = url.splice(url.length -1, url.length).toString()
    return this;
  }

  public setDriverName(name$: string) {
    this.driverName = name$;
    return this;
  }

  public addNameForDriversWithSameLastname(namePart$: string) {
    if (this.driverName === 'Schumacher' || this.driverName === 'Verstappen') {
      this.driverName = namePart$ + '_' + this.driverName;
    }
    return this;
  }

  public normalizeNameSpaces() {
    this.driverName = this.driverName.replace(/ /g, '_');
    return this;
  }
}
