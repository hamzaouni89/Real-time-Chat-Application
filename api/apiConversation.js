var express = require('express')
var router = express.Router();
var Conversation = require('../model/conversation');


router.post('/message', async (req, res) => {
  const getConversation = await Conversation.findOne({
    user1: req.body.user1,
    user2: req.body.user2
  });
  const getConversation2 = await Conversation.findOne({
    user1: req.body.user2,
    user2: req.body.user1
  });
  if (getConversation) {
    const setMessage = await Conversation.updateOne(getConversation, {
      $addToSet: {
        messages: req.body.messages
      }
    });
    res.send(setMessage);
    req.app.io.emit('sendMessage');
  } else if (getConversation2) {
    const setMessage = await Conversation.updateOne(getConversation2, {
      $addToSet: {
        messages: req.body.messages
      }
    });
    res.send(setMessage);
    req.app.io.emit('sendMessage');
  } else {
    var conversation = new Conversation();
    conversation.user1 = req.body.user1;
    conversation.user2 = req.body.user2;
    conversation.messages = req.body.messages
    conversation.save();
    res.send(conversation);
    req.app.io.emit('sendMessage');
  }
});
router.post('/conversation/:id/:id2', async (req, res) => {
  const getConversation = await Conversation.findOne({
    user1: req.params.id,
    user2: req.params.id2
  });
  const getConversation2 = await Conversation.findOne({
    user1: req.params.id2,
    user2: req.params.id
  });

  if (getConversation) {
    res.send(getConversation);
    req.app.io.emit('privateMessage', getConversation);
  } else {
    res.send(getConversation2);
    req.app.io.emit('privateMessage', getConversation2);

  }
});
router.get('/message/:id', async (req, res) => {
  const messageId = [];
  const getMessage = await Conversation.find({
    user1: req.params.id
  });
  const getMessage2 = await Conversation.find({
    user2: req.params.id
  });
  for (j = 0; j < getMessage.length; j++) {
    messageId.push(getMessage[j].user2);
  }
  for (i = 0; i < getMessage2.length; i++) {
    messageId.push(getMessage2[i].user1);
  }
  res.send(messageId);
});


module.exports = router