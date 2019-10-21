const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const activate = "/"
client.on('message', msg => {
    console.log("I got a msg.")
    const args = msg.content.slice(activate.length).split(" ");
    const command = args.shift().toLowerCase();
    console.log(args, command)
    if (msg.content.startsWith(activate + "search")) {
        msg.reply('Searching...');
        axios.get("https://newsapi.org/v2/everything?q=" + args[0] + "&from=2019-09-19&sortBy=publishedAt&apiKey=5aa703e2ed0e43f2aa0862dffc51cf83")
            .then(function (response) {
                for (let i = 0; i < 5; i++) {
                    msg.reply(response.data["articles"][i]["title"] + "\n" + response.data["articles"][i]["url"] + "\n");
                    console.log(response.data["articles"][i]["title"] + "\n" + response.data["articles"][i]["url"] + "\n")
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
})


client.login(auth.token);