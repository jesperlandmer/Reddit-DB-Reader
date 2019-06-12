(function() {

    "use strict";

    let chatDB = require("../../../Model/Chat");

    /**
     * Module to fetch chats data
     * @param user - active user data
     * @param id - request params id
     */

    module.exports = function(user, id) {

        return new Promise((resolve, reject) => {

            chatDB.findAll({}, function(err, chats) {

                if (err) {
                    reject("Error getting chat resource: " + err);
                }

                let chatsArray;
                if (user) {
                    chatsArray = [];
                    chats.forEach((chat) => {
                        JSON.parse(chat.participants_id).forEach((participant_id) => {
                            if (participant_id === user.id) {
                                chatsArray.push(chat);
                            }
                        });
                    });

                    if (id) {
                        chatsArray.forEach((chat) => {
                            if (chat.id === parseInt(id)) {
                                resolve(chatsArray);
                            } else if (chatsArray[chatsArray.length - 1] === chat) {
                                reject("error/404")
                            }
                        });
                    } else {
                        resolve(chatsArray);
                    }
                } else {
                    reject("No user provided")
                }
            });
        })
    }
}());
