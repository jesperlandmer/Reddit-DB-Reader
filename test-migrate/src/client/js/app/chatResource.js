(function() {

    "use strict";

    const Vue = require("vue");
    var socket = io();
    var chatData = [];
    var count = 0;

    /**
     * Vue-Google-Map object among other functionality for handling activity-data
     * @type {Vue}
     */
    module.exports = function() {
        var chatResource = new Vue({
            el: "#chat-container",
            data: {
                input: "",
                chatData: chatData,
                gridColumns: ["chat_id", "activity_id"],
                gridData: []
            },
            ready: function() {
                var url_array = document.location.href.split("/");
                var id = url_array[url_array.length - 1];
                socket.emit("chatRoom", {room: id});
            },

            methods: {
                newMessage: function(id, chatId, name, picture) {
                    socket.emit("newMessage", {
                        message: {
                            message_sender_id: id,
                            message_datetime: new Date(),
                            message_text: this.input,
                            message_chat_id: chatId
                        },
                        user: {
                            name: name,
                            picture: picture
                        }
                    });
                    this.input = "";
                },

                writeMessage: function(data) {

                    var message = {
                        name: data.user.name,
                        message_id: data.message.message_sender_id,
                        picture: data.user.picture,
                        text: data.message.message_text
                    };

                    chatData.push(message);
                    this.updateScroll(75);
                },

                writeChatHistory: function(messages) {
                    if (count <= 0) {

                        count++;
                        messages.forEach(function(data) {
                            if (data && "name" in data.user) {
                                var historyMessage = {
                                    name: data.user.name,
                                    message_id: data.message.message_sender_id,
                                    picture: data.user.picture,
                                    text: data.message.message_text,
                                    href: "/mendr/api/profile/" + data.message.message_sender_id
                                };

                                chatData.push(historyMessage);
                            }
                        });

                        this.updateScroll();
                    }
                },

                updateScroll: function(value) {
                    value = value || 0;
                    var element = this.$el.querySelector(".content .messages");
                    setTimeout(function() {element.scrollTop = element.scrollHeight + value}, 100)
                }
            }
        });

        // Socket Write Message
        socket.on("newMessage", function(data) {

            chatResource.writeMessage(data);

        });

        // Socket Chat History Messages
        socket.on("chatHistory", function(data) {

            chatResource.writeChatHistory(data);

        });

        return chatResource;
    };
}());
