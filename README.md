# Dispool

## This is an alternative Discord client, built on electron

### What is this

This is an alternative Discord client, that's meant to be open-source, customizable, and more lightweight than Discord's native client. To use this app, you'll need to get your user account token.

Discord says it's against their terms of use to automate a user account, but since this is only a client I think it's safe to say this is not automating anything. But do use this at your own risk, I'm not responible for any bans regarding 3rd party clients.

You can find your token by accessing <https://discordapp.com/channels/@me,> opening the debugger with cmd/ctrl+shift+i, and going to the 'network' tab. Then reload the page and wait until it's fully loaded. Search in the requests for /api/v6 and click on any request, you should now see a request properties panel pop up. In the properties, search for a property called 'Authorization', and it's value should be your user token, paste that into config.js and you're good to go.

### How to set up

> **Note: This is a work in progress, you can currently only use dispool for simple text chatting**

1. `git clone https://github.com/lonkaars/dispool`
2. `cd dispool`
3. `npm i`
4. `npm start`

If you want to package the app into an executable, run `npm run-script build` after installing electon and electron-builder with npm.

### To-do

- DM support
- Rich embed support
- Ability to join voice channels
- See voice channel user limits
- See users in voice channels
- See channels that aren't in a category
- Fix scrolling behavior in channels
- Add scroll to bottom banner in channels
- Add more messages when scrolling to top
- Maybe add an overlay
- Implement other important native Discord features
- Youtube embeds
- Open Youtube URL's in native browser
