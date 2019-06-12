(function() {

    "use strict";

    let express = require("express");
    let router = express.Router();

    let GetProfileResource = require("../resources/profile/GetProfileResource");
    let AddEventResource = require("../resources/events/AddEventResource");
    let GetTagsResource = require("../resources/tags/GetTagsResource");
    let EditEventResource = require("../resources/events/EditEventResource");
    let GetCoordinatesResource = require("../resources/geocode/GetCoordinatesResource");
    let DeleteEventResource = require("../resources/events/DeleteEventResource");
    let FindEventResource = require("../resources/events/FindEventResource");
    let GetEventResource = require("../resources/events/GetEventResource");
    let HandleEventResource = require("../resources/events/HandleEventResource");
    let AddChatResource = require("./../resources/chat/AddChatResource");
    let EditChatResource = require("./../resources/chat/EditChatResource");
    let GetChatsResource = require("./../resources/chat/GetChatsResource");

    router.get("/", (req, res) => {

        res.redirect("/mendr/api/map");
    });

    router.get("/profile/:userId", function(req, res) {

        GetProfileResource(req.params.userId)
            .then(profile => {res.render("../views/app", {user: req.user, profile: true, profileData: profile[0]})})
            .catch(err => {throw err});
    });

    router.get("/chat", function(req, res) {

        GetChatsResource(req.user, null)
            .then(chats => {
                if (chats.length > 0) {
                    res.redirect("/mendr/api/chat/" + chats[0].id);
                } else {
                    res.render("../views/app", {user: req.user, chat: true});
                }
            })
            .catch(err => {throw err});
    });

    router.get("/chat/:chatId(\\d+)/", function(req, res, next) {

        GetChatsResource(req.user, req.params.chatId)
            .then(chats => res.render("../views/app", {
                user: req.user,
                chat: true,
                chats: chats,
                chatId: req.params.chatId}))
            .catch(err => {res.status(404).send(err)});
    });

    router.get("/map", (req, res) => {

        res.render("../views/app", {user: req.user, map: true});
    });

    router.get("/activity", function(req, res) {

        GetTagsResource()
            .then(tags => res.render("../views/app", {user: req.user, activityInstance: true, tags: tags}))
            .catch(err => {res.status(500).send(err)})
    });

    router.post("/activity", function(req, res) {

        GetCoordinatesResource(req)
            .then(response => AddEventResource(req, response))
            .then(id => AddChatResource(id, req))
            .catch(err => {throw err});

        res.redirect("/mendr/api/map");
    });

    router.route("/activity/:activityId(\\d+)/")
        .get(function(req, res) {
            FindEventResource(req.params.activityId)
                .then(activity => GetEventResource(activity))
                .then(result => res.render("../views/app", {
                    user: req.user,
                    activity: true,
                    activityData: result}))
                .catch(err => {throw err})
        })

        .put(function(req, res) {
            FindEventResource(req.params.activityId)
                .then(activity => HandleEventResource(req, activity))
                .then(activityData => EditChatResource(activityData))
                .then(() => res.redirect("/mendr/api/activity/" + req.params.activityId))
                .catch(err => {throw err});
        })

        .delete(function(req, res) {

            DeleteEventResource(req.params.activityId)
                .then(() => res.redirect("/mendr/api/map"))
                .catch((err) => {throw err});
        });

    router.route("/edit/:activityId(\\d+)/")
        .get(function(req, res) {
            FindEventResource(req.params.activityId)
                .then(activity => res.render("../views/app", {user: req.user, activityInstance: true, data: activity}))
                .catch(err => {throw err})
        })

        .put(function(req, res) {

            GetCoordinatesResource(req)
                .then(response => EditEventResource(req, response, req.params.activityId))
                .then(response => res.redirect("/mendr/api/activity/" + req.params.activityId))
                .catch(err => {throw err});
        });


    router.get("/search", function(req, res) {

        res.render("../views/app", {user: req.user, search: true});
    });

    module.exports = router;
}());