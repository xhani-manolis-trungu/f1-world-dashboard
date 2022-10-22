export const urlSplitter = (url$: string): string[] => {
  const url = url$.split('/');

  const driverNamePart = url.splice(url.length -1, url.length)
  return driverNamePart;
}
