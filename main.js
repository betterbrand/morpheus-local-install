const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("node:path");

const flowiseProcess = spawn('flowise', ['start']);

const ollamaProcess = spawn('ollama', ['serve']);

// Optional: Handle Ollama process events
ollamaProcess.stdout.on('data', (data) => {
  console.log(`Ollama stdout: ${data}`);
});

ollamaProcess.stderr.on('data', (data) => {
  console.error(`Ollama stderr: ${data}`);
});

ollamaProcess.on('close', (code) => {
    console.log(`Ollama process exited with code ${code}`);
  });

// Optional: Handle Flowise process events
flowiseProcess.stdout.on('data', (data) => {
  console.log(`Flowise stdout: ${data}`);
});

flowiseProcess.stderr.on('data', (data) => {
  console.error(`Flowise stderr: ${data}`);
});

flowiseProcess.on('close', (code) => {
    console.log(`Flowise process exited with code ${code}`);
  });

const createWindow = () => {
  const win = new BrowserWindow({
    //width: 1000,
    //height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("chat.html");
//  win.loadURL("http://localhost:3000");
};



  // Listen for the app's before-quit event
  app.on('before-quit', () => {
    // Terminate the Flowise process
    if (flowiseProcess) {
      flowiseProcess.kill();
    }
  });

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});