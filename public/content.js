chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  console.log('listener activated');
  main();
});

function main() {
  // eslint-disable-next-line no-undef
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  // eslint-disable-next-line no-restricted-globals
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    // eslint-disable-next-line no-undef
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        const template = document.createElement('template');
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        debugger;
        template.innerHTML = styleStashHTML;
        // eslint-disable-next-line no-undef
        // styleStashHTML.trim();
        const body = document.getElementsByTagName("body")[0];
        if (body) { body.appendChild(template.content.childNodes); console.log("yay")}
      })
      .catch((error) => {
        debugger;
        console.warn(error);
      });
  }
}

window.addEventListener("message", function (event) {
  if (event.source !== window) return;
  onDidReceiveMessage(event);
});

async function onDidReceiveMessage(event) {
  if (event.data.type && (event.data.type === "GET_EXTENSION_ID")) {
    window.postMessage({ type: "EXTENSION_ID_RESULT", extensionId: chrome.runtime.id }, "*");
  }
}