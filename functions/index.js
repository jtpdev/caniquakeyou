const functions = require('firebase-functions');
const express = require('express');
const app = express();

const admin = require("firebase-admin");
const serviceAccount = require('./firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "url do projeto"
});

let rest = require('./rest/full');
rest.initAll(app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(app);
