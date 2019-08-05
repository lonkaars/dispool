module.exports = {
    token: "YOUR_TOKEN_HERE",
    // Discord access token

    showServerTooltips: true,
    // Show the server name when you hover

    themeCustomizations: {},

    currentTheme: "Horizon",

    themes: [{
        name: "Horizon",
        description: "Horizon theme port for Dispool",
        version: "1.0.0",
        customCSS: ``,
        customColors: {
            "serverlist.background": "#1a1c23",
            "body.background": "#1c1e26",
            "body.color": "#fff",
            "url.color": "#F43E5C",
            "status.online": "#43b581",
            "status.idle": "#faa61a",
            "status.dnd": "#f04747",
            "status.offline": "#494b51",
            "user.discriminator": "#fff8",
            "statuscard.background": "#1a1c23",
            "statuscard.shadowcolor": "#0008",
            "statuscard.description.color": "#fff9",
            "statuscard.option.background": "#232530",
            "statuscard.option.background.hover": "#2e303e",
            "shade.background": "#0003",
            "channels.seperators.color": "#fffd",
            "code.background": "#1c1e26",
            "code.color": "#bbb",
            "mention.background": "#08f3",
            "channel.headerbar.background": "#1C1E26",
            "channel.background": "#2E303E",
            "channel.messagebarcontainer.background": "#232530",
            "channel.messagebar.background": "#2e303e",
            "guildbar.header.background": "#1c1e26",
            "guildbar.background": "#232530",
            "guildbar.channel.background": "#2e303e",
            "guildbar.channel.background.hover": "#464961",
            "userbar.background": "#1c1e26",
            "message.background": "#232530",
        },
        windowFeatures: {
            "controls.background": "#1c1e26",
            "controls.color": "#d7dae0",
            "message.norolecolor": "#fff"
        }
    }, {
        name: "Horizon Light",
        description: "Horizon theme port for Dispool",
        version: "1.0.0",
        customCSS: `
            .message,
            .channel {
                box-shadow: 0px 3px 6px -2px #0003;
            }
        `,
        customColors: {
            "serverlist.background": "#FADAD1",
            "body.background": "#FDF0ED",
            "body.color": "#16161C",
            "url.color": "#F43E5C",
            "status.online": "#43b581",
            "status.idle": "#faa61a",
            "status.dnd": "#f04747",
            "status.offline": "#494b51",
            "user.discriminator": "#16161C88",
            "statuscard.background": "#FADAD1",
            "statuscard.shadowcolor": "#0008",
            "statuscard.description.color": "#16161C99",
            "statuscard.option.background": "#F9CEC3",
            "statuscard.option.background.hover": "#FDF0ED",
            "shade.background": "#0003",
            "channels.seperators.color": "#16161Cdd",
            "code.background": "#F9CEC3",
            "code.color": "#1A1C23",
            "mention.background": "#08f3",
            "channel.headerbar.background": "#FDF0ED",
            "channel.background": "#FADAD1",
            "channel.messagebarcontainer.background": "#FADAD1",
            "channel.messagebar.background": "#F9CBBE",
            "guildbar.header.background": "#FDF0ED",
            "guildbar.background": "#FDF0ED",
            "guildbar.channel.background": "#fadad1",
            "guildbar.channel.background.hover": "#F9CEC3",
            "userbar.background": "#FDF0ED",
            "message.background": "#FDF0ED",
        },
        windowFeatures: {
            "controls.background": "#FDF0ED",
            "controls.color": "#16161C",
            "message.norolecolor": "#16161C"
        }
    }]
}