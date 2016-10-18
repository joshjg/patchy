/* eslint-disable strict */

'use strict';

const shortid = require('shortid');

const clientsByRoom = {};

const sockets = (io) => {
  io.on('connection', (socket) => {
    socket.on('room', (room) => {
      const userId = shortid.generate();
      // add new user to room array and create room array if necessary
      clientsByRoom[room] = clientsByRoom[room] ? [
        ...clientsByRoom[room],
        userId,
      ] : [userId];
      socket.join(room);
      socket.emit('userId', userId);
      io.to(room).emit('updateUsers', clientsByRoom[room]);
      socket.broadcast.to(room).emit('requestPatch', socket.id);
      socket.on('actionOut', (action) => {
        socket.broadcast.to(room).emit('action', action);
      });
      socket.on('sendPatch', ({ to, from, patch }) => {
        io.to(to).emit('patch', { from, patch });
      });
      socket.on('disconnect', () => {
        const index = clientsByRoom[room].indexOf(userId);
        if (index !== -1) {
          clientsByRoom[room] = [
            ...clientsByRoom[room].slice(0, index),
            ...clientsByRoom[room].slice(index + 1),
          ];
        }
        io.in(room).emit('updateUsers', clientsByRoom[room]);
      });
    });
  });
};

module.exports = sockets;
