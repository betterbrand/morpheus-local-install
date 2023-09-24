const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  flowise: () => process.versions.flowise,
  ollama: () => process.versions.ollama,
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
})