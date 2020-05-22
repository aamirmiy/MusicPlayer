const electron=require('electron')

const {app,BrowserWindow}=electron
let win

app.on('ready',()=>{
    win=new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        },
        width:400,
        height:500
    })
    win.loadFile('index.html')
})