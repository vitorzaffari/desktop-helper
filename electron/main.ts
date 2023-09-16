import { app, BrowserWindow, ipcMain, Event } from "electron";
import path from "node:path";
import fs from "fs";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

const filePath = path.join(app.getPath("userData"), "dataStorage.json");
const initialContent = {
  datesTracker: [
    {
      itemName: "Exemple",
      itemDate: "01/1/2050",
      id: "1560d707-9a17-4408-bdb1-a12f41823ddb",
    },
  ],
};

interface Data {
  id: string;
  itemDate: string;
  itemName: string;
}


if (!fs.existsSync(filePath)) {
  fs.writeFile(filePath, JSON.stringify(initialContent), (error) => {
    if (error) {
      return console.log("Error writing file: ", error);
    }
    console.log("File written successfully!");
  });
} else console.log("File does exist! Yahoo!");


function handleSaveData(event: Event, data: Data) {
  try {
    console.log("Trying to sabe data...")
    console.log("Data: ", data);
    const rawData = fs.readFileSync(filePath);
    const dadosExistentes = JSON.parse(rawData.toString("utf8"));
    console.log("Dados existentes", dadosExistentes);
    dadosExistentes.datesTracker.push(data);
    console.log("Dados existentes after", dadosExistentes);

    fs.writeFile(filePath, JSON.stringify(dadosExistentes), (err) => {
      if (err) throw err;
      console.log("Item added successfully! Yahooo!");
    });
  } catch (error) {
    console.log("Error trying to save data to userData: ", error);
  }
}

function handleRemoveData(event: Event, data: string) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const dadosExistentes = JSON.parse(rawData);
    const idToDelete = dadosExistentes.datesTracker.findIndex(
      (item: Data) => item.id === data
    );
    console.log("Index found", idToDelete);

    if (idToDelete !== -1) {
      console.log("Found");
      dadosExistentes.datesTracker.splice(idToDelete, 1);
    } else {
      console.log("Not Found");
    }

    fs.writeFile(filePath, JSON.stringify(dadosExistentes), (err) => {
      if (err) throw err;
      console.log("Item Deletado");
    });
  } catch (error) {
    console.log("Error trying to delete item: ", error);
  }
}
function handleEditData(event: Event, data: Data) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const dadosExistentes = JSON.parse(rawData);
    console.log("This is the data: ", data);
    const itemtoEdit = dadosExistentes.datesTracker.findIndex(
      (item: Data) => item.id == data.id
    );
    console.log("Index found", itemtoEdit);
    if (itemtoEdit !== -1) {
      console.log("Found");
      dadosExistentes.datesTracker[itemtoEdit].itemName = data.itemName;
      dadosExistentes.datesTracker[itemtoEdit].itemDate = data.itemDate;
      console.log("Item editado");
    } else {
      console.log("Not found");
    }

    fs.writeFile(filePath, JSON.stringify(dadosExistentes), (err) => {
      console.log("Salvo");
    });
  } catch (error) {
    console.log("Error trying to edit data: ", error);
  }
}

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    maxWidth: 800,
    width: 800,
    minWidth: 400,
    minHeight: 1000,
  });

  fs.readFile(filePath, (err, data) => {
    try{
      const retrievedData = JSON.parse(data.toString());
      if(win){
        win.webContents.send("retrievedData", retrievedData);
        console.log(typeof(retrievedData))
      }
    } catch(error){
      console.log("Error trying to read file: ", error)
    }
  });



  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  win.webContents.openDevTools();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  ipcMain.on("saveDataToDisk", handleSaveData);
  ipcMain.on("editData", handleEditData);
  ipcMain.on("removeData", handleRemoveData);

  createWindow();
})
  
  
  
