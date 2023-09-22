/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */


import { BubbleChat } from 'flowise-embed-react' 

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


const Chatbot = () => {     return (         <BubbleChat chatflowid="ece63570-5832-46e4-80ff-60ace9302df7" apiHost="https://agent-uno.onrender.com" />     ); };   return (    <Chatbot /> ) 
