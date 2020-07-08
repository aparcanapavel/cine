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
        // const template = document.createElement('template');
        const template = document.createElement('div');
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);

        template.innerHTML = styleStashHTML;
        const executableHTML = nodeScriptReplace(template);
        // eslint-disable-next-line no-undef
        const body = document.getElementsByTagName("body")[0];
        // if (body) { body.append(...template.content.childNodes); console.log("yay")}
        if (body) { body.append(executableHTML); console.log("yay")}
        // LAST ERROR check
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

function nodeScriptReplace(node) {
  if (nodeScriptIs(node) === true) {
    node.parentNode.replaceChild(nodeScriptClone(node), node);
  } else {
    var i = 0;
    var children = node.childNodes;
    while (i < children.length) {
      nodeScriptReplace(children[i++]);
    }
  }

  return node;
}
function nodeScriptIs(node) {
  return node.tagName === 'SCRIPT';
}
function nodeScriptClone(node) {
  var script = document.createElement('script');
  script.text = node.innerHTML;
  for (var i = node.attributes.length - 1; i >= 0; i--) {
    script.setAttribute(node.attributes[i].name, node.attributes[i].value);
  }
  return script;
}