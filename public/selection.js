

let textoactual;
let text = '';
let quien;
const opciones = {
  url : "index.html",
  focused : true,
  type : "popup",
  height: 250,
  width: 400,
  left: (screen.width/2)-(400/2),
  top: (screen.height/2)-(250/2),
}

function cb(param){
  text = param.id;
}

chrome.windows.onRemoved.addListener(function(id){
  if(id === text){
    if(quien === true){
      text = ''
      chrome.windows.create(opciones, cb)
      quien = false;
    }
    text = ''
 }
})

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => {
    sendResponse({data: textoactual})
  })
});


chrome.runtime.onMessage.addListener(
  function (msg, sender, sendResponse) {
    sendResponse({data: textoactual})
})



function search (info, tab) {
    return function (info, tab) {
      textoactual = info.selectionText;
      if(text === ''){
        //chrome.windows.create(opciones, cb)
        quien = false;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        });
      }
      else{
        let textmp = text
        quien = true;
        chrome.windows.remove(textmp)
      }
    }
  }

  
  chrome.contextMenus.create({
    "title": "pop",
    "contexts": ["all"],
    "onclick": search()
  });


