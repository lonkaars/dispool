module.exports = {
    token: "YOUR_TOKEN_HERE",
    // Discord access token

    showServerTooltips: true,
    // Show the server name when you hover

    themeCustomizations: {},
    // Change something about your current theme

    showUnresolvableEmoji: false,

    currentTheme: "Dispool",

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
            "channel.active.background": "#464961",
            "channel.active.color": "var(--body-color)",
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
            .channel,
            .server {
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
            "mention.background": "#08f6",
            "channel.headerbar.background": "#FDF0ED",
            "channel.background": "#FADAD1",
            "channel.active.color": "#FDF0ED",
            "channel.active.background": "#DA103F",
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
    }, {
        name: "Dispool",
        description: "Default Discord theme port for Dispool",
        version: "1.0.0",
        customCSS: `
            .titlebar {
                height: 60px
            }

            .channel {
                margin: 5px 20px
            }

            .seperator {
                margin-bottom: 10px
            }

            div.message {
                padding: 5px !important;
                width: calc(100% - 30px) !important;
                margin: 5px 10px !important;
            }
        `,
        customColors: {
            "serverlist.background": "#202225",
            "body.background": "#202225",
            "body.color": "#f2f5f9",
            "url.color": "#0096cf",
            "status.online": "#43b581",
            "status.idle": "#faa61a",
            "status.dnd": "#f04747",
            "status.offline": "#494b51",
            "user.discriminator": "#717379",
            "statuscard.background": "#282b30",
            "statuscard.shadowcolor": "#0008",
            "statuscard.description.color": "#78858e",
            "statuscard.option.background": "#282b30",
            "statuscard.option.background.hover": "#25282d",
            "shade.background": "#0003",
            "channels.seperators.color": "#8e9297",
            "code.background": "#2f3136",
            "code.color": "#fff",
            "mention.background": "#08f3",
            "channel.headerbar.background": "#36393f",
            "channel.background": "#36393f",
            "channel.active.color": "#fff",
            "channel.active.background": "#40444b",
            "channel.messagebarcontainer.background": "#36393f",
            "channel.messagebar.background": "#484c52",
            "guildbar.header.background": "#2f3136",
            "guildbar.background": "#2f3136",
            "guildbar.channel.background": "#2f3136",
            "guildbar.channel.background.hover": "#292b2f",
            "userbar.background": "#2b2c31",
            "message.background": "#36393f",
        },
        windowFeatures: {
            "controls.background": "#36393f",
            "controls.color": "#fff",
            "message.norolecolor": "#fff"
        }
    }]
}