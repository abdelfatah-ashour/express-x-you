module.exports = function (http) {
  const SocketIO = require('socket.io');
  const IO = SocketIO(http);
  const { parse } = require('cookie');
  const { decode } = require('jsonwebtoken');
  const {
    editStateOrder,
    makeNotification,
  } = require('../controllers/socket-controller');

  const { logger } = require('../utilities/winston');

  IO.on('connection', function (socket) {
    if (socket.request.headers.cookie) {
      const auth = parse(socket.request.headers.cookie).auth;
      const admin = parse(socket.request.headers.cookie).admin;
      const isUser = decode(auth);
      const isAdmin = decode(admin);
      if (auth) {
        socket.join(isUser._id);
      }
      if (admin) {
        socket.join(isAdmin._id);

        // start logic of socket must do it
        socket.on('changeOrderState', async order => {
          await editStateOrder(order);
          await makeNotification({
            to: order.bayerId,
            content: '⭐you have new State order',
          });

          IO.to(order.bayerId).emit('newNotification', {
            content: '⭐you have new State order',
          });
        });
      }
    }
  });

  IO.on('error', function (err) {
    logger.error(err.message);
  });
};
