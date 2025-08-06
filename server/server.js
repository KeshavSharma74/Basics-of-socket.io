import express from "express"
import "dotenv/config"
import http from "http"
import {Server} from "socket.io" 
import cors from "cors"

const app=express();
app.use(cors());
const server = http.createServer(app);

app.get('/',(req,res)=>{
    return res.send('App is live');
})

const io = new Server(server,{
    cors:process.env.CLIENT_ORIGIN||'http://localhost:5173',
})

io.on("connection",(socket)=>{
    console.log("User connected :",socket.id);
    socket.on("send-message",(data)=>{
        socket.broadcast.emit("receive-message",data)
    })
})

const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log("server is listening at port",port)
})