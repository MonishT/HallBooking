const roomData = require('./rooms.json');
const roomDetails = require('./room-details.json')
let rooms = [...roomData];
let roomDetail = [...roomDetails];

// GET All rooms -> READ ALL
const readAll = () => JSON.stringify(roomDetail);

//get room status
const readRoomObject = (id,date) => {
  return rooms.find(function(el){
    return el.roomId == id && el.date === date;
  }) || null;   
}

//get customer booking status
const readCustomerData = (name) => {
  return rooms.filter(customer => customer.customerName === name) || null;   
}

// GET One rooms --> READ One
const readRoom = (id) => {
  return JSON.stringify(roomDetail.find(({roomId}) => id === roomId));
}
const readBookedRooms = () => JSON.stringify(rooms);

//get room details
const readRoomData=(id) => {
  return JSON.stringify(rooms.find(({roomId}) => id === roomId));
}
// create new Room --> CREATE
const createRoom = (roomObj) => {
  roomDetail.push(roomObj);
}

//Book a Room
const bookRoom = (roomObj) => {
  rooms.push(roomObj);
}


module.exports = {
  readAll,
  readRoom,
  readRoomData,
  readRoomObject,
  bookRoom,
  readBookedRooms,
  readCustomerData,
  createRoom
}
