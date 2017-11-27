// Init Socket
const socket = io();

// Autoscroll
function scrollToBottom() {
  // Selector
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  // Height
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

// Event => Connected
socket.on('connect', function () {
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    }
  });
});

// Event => Disconnected
socket.on('disconnect', function () {

});

// Event => Listen to new message
socket.on('newMessage', function (message) {
  const formatedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime,
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// Event => Listen to new location message
socket.on('newLocationMessage', function (message) {
  const formatedTime = moment(message.createdAt).format('h:mm a');

  const template = jQuery('#locationMessage-template').html();
  const html = Mustache.render(template, {
    createdAt: formatedTime,
    from: message.from,
    url: message.url,
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// Event => Listen to user who join/leave and update people list
socket.on('updateUserList', function (users) {
  const ol = jQuery('<ol></ol>');

  users.forEach((user) => {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

// Event => Emit new message
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  const messageBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageBox.val(),
  }, function () {
    messageBox.val('');
  });
});

// Event => Emit new location message
jQuery('#send-location').on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser!');
  }

  jQuery('#send-location').attr('disabled', 'disabled').text('Sending location...');
  return navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      long: position.coords.longitude,
      lat: position.coords.latitude,
    }, function () {
      jQuery('#send-location').removeAttr('disabled', 'disabled').text('Send location');
    });
  }, function () {
    jQuery('#send-location').removeAttr('disabled', 'disabled').text('Send location');
    return alert('Unable to fetch your location');
  });
});
