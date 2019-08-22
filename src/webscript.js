var Discord = require('discord.js');
var client = new Discord.Client();
var config = require('./config.js');
client.login(config.token);
var currentGuild, currentChannel = null;
var status = "";
var statuscard, currentTheme;
const toHTML = require('discord-markdown').toHTML;
var commander = require('./commander/main.js');

// Discord client ready
client.on('ready', () => {
    // Fill serverlist
    var servers = ""
    var guilds = client.guilds.array()
    guilds.forEach(g => {
        servers += `<div ${config.showServerTooltips ? "title=\"" + g.name + "\"" : ""} class="server server-${g.id}" style="background: url('${g.iconURL}'); background-size: contain" onclick="switchGuild(${g.id})"></div>\n`
    });
    $('.servers').append(servers)

    // Bottom-left profile picture
    $('.controls .user .profile .picture').css('background', `url('${client.user.avatarURL.replace(/\?size\=(\d+)/g, "?size=40")}')`)

    // Username and discriminator
    $('.controls .user .profile .username').text(client.user.username)
    $('.controls .user .profile .discriminator').text(`#${client.user.discriminator}`)

    // Set status UI
    setTimeout(() => {
        status = client.user.presence.status
        switchStatus(status)
    }, 200);

    //! DEV
    // $('.shade').addClass('show');
})

// Discord message event
client.on('message', message => {
    if (currentChannel && currentChannel.id == message.channel.id) {
        pushmessage(message)
    }
    overflowBottom()
})

// DOM ScrollHeight updates after a picture is loaded, so scroll to bottom
//!Needs to check if user was scrolled to bottom
$('img').on('load', () => {
    overflowBottom()
})

// Document ready event
document.addEventListener("DOMContentLoaded", function () {
    // Load theme
    loadTheme()

    // Make titlebar
    const electronTitlebarWindows = require('electron-titlebar-windows');
    const titlebar = new electronTitlebarWindows({
        color: currentTheme.windowFeatures["controls.color"],
        backgroundColor: currentTheme.windowFeatures["controls.background"],
        draggable: false
    })
    // Show titlebar
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

    // Bind enter key to send message using mousetrap
    Mousetrap.bind("enter", () => {
        if ($('textarea.message').is(':focus')) {
            sendMsg()
        }
    })

    // Bind ctrl+t to open commander
    Mousetrap.bind("ctrl+t", () => {
        commander.showHide()
    })

    // Prevent body from scrolling
    setInterval(() => {
        window.scrollTo(0, 0)
    }, 1000);

    //Commander
    //!DEV
    /* $('.commander h1').keyup(e => {
        commander.keyup(e)
    }) */
    $('.commander h1').keydown(e => {
        commander.keydown(e)
    })
    /* $('.commander h1').keypress(e => {
        commander.keypress(e)
    }) */

    // Clickable links
    $('body').on('click', '.message a', (event) => {
        event.preventDefault();
        let link = event.target.href;
        require("electron").shell.openExternal(link);
    });
})














//$       __                   _   _
//$     / _|_   _ _ __    ___| |_(_) ___ _ __   ___
//$    | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//$   |  _| |_| | | | | (__| |_| | (_) | | | \__ \
//$  |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/


// Function used to replace currentTheme with the one selected in config.js
function loadTheme() {
    currentTheme = config.themes.find(c => c.name == config.currentTheme);
    for (var key in currentTheme.customColors) {
        $('body').css(`--${key.replace(/\./g, "-")}`, currentTheme.customColors[key])
    }
    $('#customCSS').text(currentTheme.customCSS)
    $('head').append(`<link rel="stylesheet" href="${currentTheme.windowFeatures['code.syntaxhighlighting']}">`)
}

// Function used to switch to another guild
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

    var nocat = channels.filter(c => c.parentID == undefined)
    nocat = nocat.sort((a, b) => a.calculatedPosition - b.calculatedPosition)

    sorted.unshift(...nocat)

    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].type == "voice") {
            html += `<div class="channel voice channel-${sorted[i].id}" onclick="switchChannel(${sorted[i].id})">\n<i class="material-icons type">volume_up</i>\n<span class="name">${sorted[i].name}</span>\n</div>`
        } else if (sorted[i].type == "text") {
            html += `<div class="channel text channel-${sorted[i].id}" onclick="switchChannel(${sorted[i].id})">\n<i class="material-icons type">format_align_left</i>\n<span class="name">${sorted[i].name}</span>\n</div>`
        } else if (sorted[i].type == "category") {
            html += `<div class="seperator">\n<h2 class="name">${sorted[i].name}</h2>\n</div>`
        }
    }
    $('.channellist').html(html)
}

// Function to update the current status ui (! Not for updating your status on discord)
function switchStatus(status) {
    if (status == "online") {
        $('.controls .user .profile .status').css('background', 'var(--status-online)')
    } else if (status == "idle") {
        $('.controls .user .profile .status').css('background', 'var(--status-idle)')
    } else if (status == "dnd") {
        $('.controls .user .profile .status').css('background', 'var(--status-dnd)')
    } else if (status == "invisible") {
        $('.controls .user .profile .status').css('background', 'var(--status-offline)')
    }
}

// Function used to switch channels
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
    $('.channelbar').html(`<h2 class="channelname">${currentChannel.name}</h2>`);

    // Set active channel
    $('.channel').removeClass('active');
    $(`.channel-${currentChannel.id}`).addClass('active');

    // fetch old messages
    $('.messages').html('')
    if (currentChannel.type == 'text') {
        currentChannel.fetchMessages({
                limit: 20
            })
            .then(messages => {
                var arr = messages.array();
                arr = arr.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
                arr.forEach(i => pushmessage(i))
                // scroll to bottom
                overflowBottom()
            })
            .catch(console.error);
    }

}

// Return time in HH:MM format
time = date => `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`

// Show or hide the card ui to change your status
function statusCard(showHide) {
    if (showHide == true) {
        $('.statuscard').css('visibility', 'visible')
    }
    anime({
        targets: '.statuscard',
        bottom: showHide ? ['20px', "85px"] : ['85px', "20px"],
        easing: showHide ? 'easeOutExpo' : 'easeInExpo',
        opacity: showHide ? [0, 1] : [1, 0],
        duration: showHide ? 600 : 300,
        complete: () => {
            if (showHide == false) {
                $('.statuscard').css('visibility', 'hidden')
            }
        }
    })
}

// Function called when clicking on the div.shade element
function shade() {
    if (statuscard) {
        statusCard(false)
        $('.shade').removeClass('show')
        commander.shade()
    }
}

// Function called when clicking on the user to change the status
function user() {
    statusCard(true)
    $('.shade').addClass('show')
    statuscard = true
}

// Function called when clicking on a status option in the card ui
function clientStatusSwitch(to) {
    status = to;
    client.user.setStatus(to);
    shade();
    switchStatus(status)
}

// Function used to push messages to the div.messages element
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
                return `<div ${em ? 'style="width:24px; height:24px; background: url(' + em.url +'); background-size: cover; display: inline-block;"' : 'style="display: inline-block;"'}>${em ? "" : config.showUnresolvableEmoji ? "&lt;unresolvable emoji&gt;" : ""}</div>`
            }
        }
    })
    var color = message.member.displayHexColor
    if (color == "#000000" && message.member.highestRole == '@everyone') {
        color = currentTheme.windowFeatures["message.norolecolor"]
    }
    var attachments = '';
    if (message.attachments.array().length != 0 && message.attachments.array()[0].url.match(/.+(png|jpg|jpeg|gif)/g)) {
        attachments = `<br><img src="${attachments = message.attachments.array()[0].url}">`
    } else if (message.attachments.array().length != 0 && message.attachments.array()[0].url.match(/.+(mp4|webm|mov)/g)) {
        attachments = `<br><video controls><source src="${attachments = message.attachments.array()[0].url}" type="video/${message.attachments.array()[0].url.match(/(mp4|webm|mov)$/g)[0]}"></video>`
    }
    var send = `<div class="message message-${message.id}">\n<div class="profile" style="background: url('${message.author.avatarURL}'); background-size: contain;"></div>\n<span class="author">${time(message.createdAt)} <b style="color: ${color}">${message.author.username}</b>:</span>\n<span class="content">${text.replace(/\n/g, '<br>')}</span>${attachments}</div>`
    if (pop) {
        $('.messages').html(`${send}${$('.messages').html()}`)
    } else {
        $('.messages').append(send)
    }
}

// Function to scroll to bottom on the current channel (div.messages)
function overflowBottom() {
    var height = $('div.messages')[0].scrollHeight
    anime({
        targets: 'div.messages',
        scrollTop: height,
        easing: 'easeOutExpo',
        duration: 1500
    })
}

// Function called when pressing enter in the message box
function sendMsg() {
    var content = $('textarea.message').val();
    if (currentChannel.type == 'text' && content != '') {
        currentChannel.send(content.toString())
    }
    setTimeout(() => {
        $('textarea.message').val('');
    }, 0);
}

// Function to send native notification
function NativeNotification(content) {
    new Notification('Dispool', {
        body: content
    })
}