var Discord = require('discord.js');
var client = new Discord.Client();
var config = require('./config.js');
client.login(config.token);
var currentGuild, currentChannel = null;
const toHTML = require('discord-markdown').toHTML;

// Fill server list with servers
client.on('ready', () => {
    var servers = ""
    var guilds = client.guilds.array()
    for (let i = 0; i < guilds.length; i++) {
        servers += `<div ${config.showServerTooltips ? "title=\"" + guilds[i].name + "\"" : ""} class="server server-${guilds[i].id}" style="background: url('${guilds[i].iconURL}'); background-size: contain" onclick="switchGuild(${guilds[i].id})"></div>\n`
    }
    $('.servers').append(servers)
})

// Add title bar
document.addEventListener("DOMContentLoaded", function () {
    const electronTitlebarWindows = require('electron-titlebar-windows');
    const titlebar = new electronTitlebarWindows({
        color: "#d7dae0",
        backgroundColor: "#1c1e26",
        draggable: false
    })
    titlebar.appendTo();

    // Make title bar buttons work
    const remote = require('electron').remote
    titlebar.on('close', () => {
        remote.getCurrentWindow().close()
    })
    titlebar.on('maximize', () => {
        remote.getCurrentWindow().unmaximize()
    })
    titlebar.on('fullscreen', () => {
        remote.getCurrentWindow().maximize()
    })
    titlebar.on('minimize', () => {
        remote.getCurrentWindow().minimize()
    });

    $('textarea.message').keyup(e => {
        if (e.code == 'Enter') {
            sendMsg()
        }
    })

    setInterval(() => {
        window.scrollTo(0, 0)
    }, 1000);
})

function switchGuild(id) {
    if (currentGuild == null) {
        anime({
            targets: '.channellist',
            marginTop: ["160px", "60px"],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 700
        })
    }
    // Set current guild name in top left
    currentGuild = client.guilds.find(g => g.id == id);
    $('.currentguild').html(`<i class="material-icons guildicon">language</i>\n<h2 class="guildname">${currentGuild.name}</h2>`);

    // Set active class
    $('.server').removeClass('active');
    $(`.server-${currentGuild.id}`).addClass('active')

    // Display channels
    var html = ""
    var channelarr = currentGuild.channels.array();
    var categories = channelarr.filter(c => c.type == 'category');
    var categories = categories.sort((a, b) => a.calculatedPosition - b.calculatedPosition)
    var channels = channelarr.filter(c => c.type != 'category');
    var sorted = []

    for (let i = 0; i < categories.length; i++) {
        sorted.push(categories[i])
        var temp1 = [];
        temp1.push(...channels.filter(c => c.parentID == categories[i].id));
        temp1 = temp1.sort((a, b) => a.calculatedPosition - b.calculatedPosition)
        sorted.push(...temp1)
    }

    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].type == "voice") {
            html += `<div class="channel" onclick="switchChannel(${sorted[i].id})">\n<i class="material-icons type">volume_up</i>\n<span class="name">${sorted[i].name}</span>\n</div>`
        } else if (sorted[i].type == "text") {
            html += `<div class="channel" onclick="switchChannel(${sorted[i].id})">\n<i class="material-icons type">format_align_left</i>\n<span class="name">${sorted[i].name}</span>\n</div>`
        } else if (sorted[i].type == "category") {
            html += `<div class="seperator">\n<h2 class="name">${sorted[i].name}</h2>\n</div>`
        }
    }
    $('.channellist').html(html)
}

function switchChannel(id) {
    if (currentChannel == null) {
        anime({
            targets: '.typingbar',
            bottom: ["-60px", 0],
            easing: 'easeOutExpo',
            duration: 500
        })
        anime({
            targets: '.messages',
            bottom: ["calc(60px - 100vh)", "calc(60px - 0vh)"],
            easing: 'easeOutExpo',
            duration: 700
        })
    }
    currentChannel = client.channels.find(c => c.id == id);
    $('.channelbar').html(`<h2 class="channelname">${currentChannel.name}</h2>`)

    // fetch old messages
    $('.messages').html('')
    if (currentChannel.type == 'text') {
        currentChannel.fetchMessages({
                limit: 20
            })
            .then(messages => {
                var arr = messages.array();
                arr = arr.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
                for (let i = 0; i < arr.length; i++) {
                    pushmessage(arr[i])
                }
                // scroll to bottom
                overflowBottom()
            })
            .catch(console.error);
    }
}

function time(date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

function pushmessage(message, pop = false) {
    var text = toHTML(message.content, {
        embed: true,
        discordCallback: {
            user: u => {
                var user = message.guild.members.find(a => a.id == u.id)
                return `@${user.nickname ? user.nickname : user.user.username}`
            },
            channel: u => `#${client.channels.find(c => c.id == u.id).name}`,
            emoji: u => {
                var em = message.guild.emojis.find(e => e.id == u.id)
                return `<div ${em ? 'style="width:24px; height:24px; background: url(' + em.url +'); background-size: cover; display: inline-block;"' : 'style="display: inline-block;"'}>${em ? "" : "&lt;unresolvable emoji&gt;"}</div>`
            }
        }
    })
    var color;
    try {
        color = message.member.displayHexColor
    } catch {
        color = '#fff'
    }
    var attachments = '';
    if(message.attachments.array().length != 0 && message.attachments.array()[0].url.match(/.+(png|jpg|jpeg|gif)/g)){
        attachments = `<br><img src="${attachments = message.attachments.array()[0].url}">`
    } else if (message.attachments.array().length != 0 && message.attachments.array()[0].url.match(/.+(mp4|webm|mov)/g)){
        attachments = `<br><video controls><source src="${attachments = message.attachments.array()[0].url}" type="video/${message.attachments.array()[0].url.match(/(mp4|webm|mov)$/g)[0]}"></video>`
    }
    var send = `<div class="message message-${message.id}">\n<div class="profile" style="background: url('${message.author.avatarURL}'); background-size: contain;"></div>\n<span class="author"><b style="color: ${color}">${message.author.username}</b>@${time(message.createdAt)}</span>\n<span class="content">${text.replace(/\n/g, '<br>')}</span>${attachments}</div>`
    if (pop) {
        $('.messages').html(`${send}${$('.messages').html()}`)
    } else {
        $('.messages').append(send)
    }
}

function overflowBottom() {
    var height = $('div.messages')[0].scrollHeight
    anime({
        targets: 'div.messages',
        scrollTop: height,
        easing: 'easeOutExpo',
        duration: 1500
    })
}

function sendMsg() {
    var content = $('textarea.message').val();
    if (currentChannel.type == 'text' && content != '') {
        currentChannel.send(content.toString())
    }
    $('textarea.message').val('');
}

client.on('message', message => {
    if (currentChannel && currentChannel.id == message.channel.id) {
        pushmessage(message)
    }
    overflowBottom()
})

$('img').on('load', () => {
    console.log(`Image loaded`)
    overflowBottom()
})

/* setInterval(() => {
    console.log(heigtlog == true ? $('div.messages')[0].scrollHeight : '')
}, 10); */