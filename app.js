// Require discord.js package
const Discord = require('discord.js');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.DISCORD_TOKEN;
const api = process.env.OPENWEATHERMAP_API;

// Create a new client using the new keyword
const client = new Discord.Client();

// Display a message once the bot has started
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//reconnect event
client.on("reconnecting", () => {
    console.log(`This bot is trying to reconnect: ${client.user.tag}!`);
});

// Check messages for a specific command
client.on("message", async msg => {
    const msgContent = msg.content.toLowerCase();
    var command = msgContent.substr(0, msgContent.indexOf(' '));
    var location = msgContent.substr(msgContent.indexOf(' ')+1);

    // Send back a reply when the specific command has been written
    if (command === "!weather") {
        var dest = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + location + '&appid=' + api;
        axios.get(dest)
            .then(response => {
                msg.reply(`It is currently ${response.data.main.temp} in ${location} with ${response.data.weather[0].description}`);
            })
            .catch(error => {
                msg.reply(`${error.response.data.message}`);
            });
    }
    else if (command === "!weatherhelp") {
        msg.reply('Format your weather request by typing: !weather <city name>');
    }
});

// Log in the bot with the token
client.login(token);