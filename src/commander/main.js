var commands = require('./commands.json');
var an = false
module.exports = {
    setAutoComplete: str => $('body').css('--autocomplete', `'${str}'`),

    keydown: e => {
        var tab = module.exports.key(e)
        module.exports.autocomplete(tab)
    },

    key: e => {
        if(e.key == "Tab"){
            setTimeout(() => {
                $('.commander h1.command').focus()
            }, 2);
            return true
        }
        if(e.key == "Enter"){
            setTimeout(() => {
                var command = val = $('.commander h1').text()
                $('.commander h1').text('')
                console.log(command)
                module.exports.showHide()
            }, 0);
        }
        return false
    },

    autocomplete: tab => {
        var val;
        setTimeout(() => {
            val = $('.commander h1').html()
            var completion = commands.find(c => c.startsWith(val));
            if(completion != undefined && tab){
                val = $('.commander h1').html(completion)
                module.exports.setAutoComplete('')
                window.getSelection().modify("move", "forward", "line")
            } else {
                module.exports.setAutoComplete(val.length == 0 || completion == undefined ? '' : completion.substr(val.length))
            }
        }, 0);
    },

    showHide: () => {
        $('.shade').addClass('show')
        anime({
            targets: ".commander",
            translateY: an ? ["-0%", "-50%"] : ["-50%", "-0%"],
            translateX: ["-50%", "-50%"],
            opacity: an ? [0, 1] : [1, 0],
            duration: 500,
            easing: an ? 'easeOutExpo' : 'easeInExpo',
            complete: () => {
                if(!an){
                    $('.commander').css('visibility', 'hidden')
                    $('.shade').removeClass('show')
                }
                if(an){
                    $('.commander h1.command').focus()
                }
                an = !an
            },
            begin: () => {
                if(an){
                    $('.commander').css('visibility', 'visible')
                }
            }
        })
    },

    shade: () => {
        module.exports.showHide() //? Not working
    }
}