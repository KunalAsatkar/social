const { userModel } = require('../Models/userModel');
const { eventModel } = require('../Models/eventModel');

const createdAndJoinedEvents = async (req, res, next) => {
    try {
        // console.log(req.user.id, "userInfo");
        const user = await userModel.findById(req.user.id);
        const joinedeventIds = user.joinedEvents;
        const createdEventIds = user.createdEvents;

        // console.log(joinedeventIds);
        // console.log(createdEventIds);

        const joinedEvents = await Promise.all(joinedeventIds.map(async (joinedEventId) => {
            let result = await eventModel.findById(joinedEventId);
            data = {
                _id: result._id,
                title: result.title
            }
            return data;
        }));
        const createdEvents = await Promise.all(createdEventIds.map(async (createdEventId) => {
            let result = await eventModel.findById(createdEventId);
            data = {
                _id: result._id,
                title: result.title
            }
            return data;
        }))
        // console.log(joinedEvents);
        // console.log(createdEvents);
        return res.status(200).json({
            status: true,
            data: {
                joinedEvents: joinedEvents,
                createdEvents: createdEvents
            }
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            status: false,
            data: err
        })
    }
}

module.exports = { createdAndJoinedEvents };
