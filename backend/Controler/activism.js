const express = require('express');
const { eventModel } = require('../Models/eventModel');
const { userModel } = require('../Models/userModel');

const joinEvent = async (req, res, next) => {
    console.log(req.user.id, req.params.eventId, "joinEvent route");
    try {

        const userId = req.user.id;
        const eventId = req.params.eventId;
        const user = await userModel.findById(userId);
        const event = await eventModel.findById(eventId);

        // Add the event to the user's joinedEvents and the user to the event's attendees
        user.joinedEvents.push(event._id);
        event.attendees.push(user._id);

        // Save the updated user and event
        await user.save();
        await event.save();
        res.status(200).json({
            status: true,
            data1: user,
            data2: event
        })
    }
    catch (e) {
        res.status(400).json({
            status: false,
            data: e
        })
    }
};

const getEventDetails = async (req, res, next) => {
    // console.log(req.user.id, req.params.eventId);
    try {
        const eventId = req.params.eventId;
        const event = await eventModel.findById(eventId);
        // console.log(event);
        // Save the updated user and event
        res.status(200).json({
            status: true,
            data: event
        })
    }
    catch (e) {
        res.status(400).json({
            status: false,
            data: e
        })
    }
};

const addEvent = async (req, res, next) => {
    const data = req.body;
    const userId = req.user.id;
    data.createdBy = userId;
    console.log("addevent", req.body);
    try {
        const eventInfo = eventModel(data);
        const result = await eventInfo.save();
        // event created, now add this to userschema under created events list
        const user = await userModel.findById(userId);
        // console.log(user);
        // console.log(result._id);
        user.createdEvents.push(result._id);
        await user.save();//you have to save after push to see changes
        // console.log(user);
        res.status(200).json({
            status: true,
            data: result
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            status: false,
            data: e
        })
    }
}

const getEvents = async (req, res, next) => {
    try {
        const result = await eventModel.find();
        res.status(200).json({
            status: true,
            data: result
        })
    }
    catch (e) {
        res.status(400).json({
            status: false,
            data: e
        })
    }
}

const checkAlreadyJoined = async (req, res, next) => {
    try {

        const eventId = req.params.eventId;
        const userId = req.user.id;
        //get all details of user then search the array joinedEvents,
        //if the eventId is present or not
        const user = await userModel.findById(userId);
        // console.log(user);
        const joinedEvents = user.joinedEvents;
        // console.log(joinedEvents);
        let flag = false;
        for (let i = 0; i < joinedEvents.length; i++) {
            if (joinedEvents[i] == eventId) {
                flag = true;
                break;
            }
        }
        res.status(200).json({
            status: flag,
            data: user
        })

    }
    catch (err) {
        res.status(400).json({
            status: false,
            data: err
        })
    }
}


module.exports = { addEvent, getEvents, getEventDetails, joinEvent, checkAlreadyJoined };