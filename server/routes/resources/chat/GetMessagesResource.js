(function() {

    "use strict";

    let messageDB = require("../../../Model/Message");
    let GetSenderResource = require("./GetSenderResource");

    /**
     * Module to add new chat data
     * @param chat - chat data
     */

    module.exports = function(chat) {

        return new Promise((resolve, reject) => {

            // get messages referenced to chat id
            messageDB.findOne({message_chat_id: chat.id || chat[0].id}, function(err, messages) {

                if (err) {
                    reject("Error fetching message resource");
                }

                let promises = messages.map((message) => {
                    return GetSenderResource(message); // return message sender data
                });

                Promise.all(promises)
                    .then(result => resolve(result)); // resolve message and its sender
            });
        })
    }
}());
