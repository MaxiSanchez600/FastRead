/*global chrome*/
import React from 'react'
import Player from './Player.js'
export default function Main(){
    const [abrir, setabrir] = React.useState(false)
    const onChange = function(){
        setabrir(true)
    }
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension");
          if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
        }
      );
    return(
        <div>
            <button onClick = {onChange}>Abrir</button>
            {abrir && <Player></Player>}
        </div>
    )
}