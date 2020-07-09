chrome.browserAction.onClicked.addListener(function (tab) {
  // console.log(chrome);
  // main();
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});