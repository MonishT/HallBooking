// CommonJS 
const express = require('express');
const { readAll,readRoomObject,readBookedRooms,bookRoom,createRoom, updateMovie, deleteMovie, readRoom, readRoomData, readCustomerData } = require('./crud.js');

const app = express();
const PORT = 5000;
const HOSTNAME = 'localhost';

// For parsing application/json
app.use(express.json());

// GET All Rooms API --> READ All
app.get('/rooms', (req, res) => {
  res.send(readAll());
});

//Get all booking details
app.get('/room/bookedDetails',(req,res) => {
  res.send(readBookedRooms());
})

//Create new room
app.post('/room/create', (request, response) => {
  const {roomId} = request.body;
 if(readRoom(roomId) === null || readRoom(roomId) === undefined){
    createRoom(request.body);
    response.send('{ "msg": "Room Created Successfully" }');
  }else{
    response.send('{"msg": "Room already exists}');
  }
});

//Book a Room
app.post('/room/book', (request, response) => {
    const roomObj = request.body;
    const {roomId,date} = request.body;
 if(readRoom(roomId)===null || readRoom(roomId)=== undefined){
    response.send('{"msg": "Invalid room details"}')
 }else if(readRoomData(roomId) === undefined && readRoomObject(roomId,date) === undefined){
  bookRoom(roomObj);
  response.send('{ "msg": "Room booked Successfully" }');
 }
 else if(readRoomData(roomId) !== null && readRoomObject(roomId,date) !== null){
    response.send('{"msg":"Room already booked"}');
 }else{
  bookRoom(roomObj);
  response.send('{ "msg": "Room booked Successfully" }');
 }
  });

//Get customer Booking details
app.post('/room/customerdetails', (request, response) => {
  const {customerName} = request.body;
 if(readCustomerData(customerName) === null || readCustomerData(customerName) === undefined){
    response.send('{ "msg": "Booking is not available for provided customer" }');
  }else{
    response.send(readCustomerData(customerName));
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
