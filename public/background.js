chrome.browserAction.onClicked.addListener(function (tab) {
  debugger;
  // console.log(chrome);
  // main();
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});