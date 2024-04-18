const { google } = require('googleapis');
const { eventModel } = require('../Models/eventModel');

const clientId = process.env.GOOGLE_CLIENTID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL;
const apikey = process.env.GOOGLE_API_KEY;

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl
);
const scopes = [
    'https://www.googleapis.com/auth/calendar'
];

let eventId = '';

const getOauth2 = (req, res) => {
    eventId = req.params.eventId;
    console.log('eventId:', eventId);
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    console.log(url);
    res.redirect(url);
    // res.status(200).json({
    //     status: true,
    //     body: { url: url, message: "done" }
    // })
}

const getOauthToken = async (req, res) => {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    // console.log(req)
    const calendar = google.calendar({
        version: 'v3',
        auth: apikey
    })

    const event = await eventModel.findById(eventId);
    console.log(event);
    const result = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        requestBody: {
            summary: event.title,
            location: event.location,
            description: event.description,
            start: {
                dateTime: event.startDateTime,
                timeZone: 'Asia/Kolkata'
            },
            // end time is required
            end: {
                dateTime: event.endDateTime,
                timeZone: 'Asia/Kolkata'
            }
        }
    })
        .then((response) => {
            // console.log(response);
            return response;
        }).catch((err) => {
            console.log(err);
        })

    res.redirect(`http://localhost:3000/calendar/google/callback?eventId=${eventId}`);
}

module.exports = { getOauth2, getOauthToken }

