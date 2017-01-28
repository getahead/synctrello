export const windowOpen = (url, { name, height = (screen.height / 2), width = (screen.width / 2.5) }) => {
  const left = (window.outerWidth / 2)
    + (window.screenX || window.screenLeft || 0) - (width / 2);
  const top = (window.outerHeight / 2)
    + (window.screenY || window.screenTop || 0) - (height / 2);

  const config = {
    height,
    width,
    left,
    top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
  };

  return window.open(
    url,
    name,
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', ')
  );
};
