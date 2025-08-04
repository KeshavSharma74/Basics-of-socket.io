import express from "express"
import "dotenv/config"
import http, { Server } from "http"
import {Server} from "socket.io" 
import cors from "cors"

const app=express();
app.use(cors());
const server = http.createServer(app);

app.get('/',(req,res)=>{
    return res.send('App is live');
})

const io = new Server(server,{
    cors:'http://localhost:5173',
})

const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log("server is listening at port",port)
})