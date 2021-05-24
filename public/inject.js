/*global chrome*/

    const extensionOrigin = 'chrome-extension://' + chrome.runtime.id
    fetch(chrome.runtime.getURL('index.html') /*, options */)
    .then((response) => response.text())
    .then((html) => {
      const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
      // eslint-disable-next-line no-undef
      $(styleStashHTML).appendTo('body');
    })
    .catch((error) => {
      console.warn(error);
    });

