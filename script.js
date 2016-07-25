'use strict';

const _ = require('lodash');
const Script = require('smooch-bot').Script;

const scriptRules = require('./script.json');

module.exports = new Script({
    processing: {
        //prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Welcome to the Clorox MyStain ChatBot!')
                .then(() => 'speak');
        }
    },

    speak: {
        receive: (bot, message) => {

            let upperText = message.text.trim().toUpperCase();

            function updateSilent() {
                switch (upperText) {
                    case "CONNECT ME":
                        return bot.setProp("silent", true);
                    case "DISCONNECT":
                        return bot.setProp("silent", false);
                    default:
                        return Promise.resolve();
                }
            }

            function getSilent() {
                return bot.getProp("silent");
            }

            function processMessage(isSilent) {
                if (isSilent) {
                    return Promise.resolve("speak");
                }

                if (!_.has(scriptRules, upperText)) {
                    return bot.say(`I didn't understand that.`).then(() => 'speak');
                }

                var response = scriptRules[upperText];
                var lines = response.split('\n');

                var p = Promise.resolve();
                _.each(lines, function(line) {
                    line = line.trim();
                    p = p.then(function() {
                        console.log(line);
                        return bot.say(line);
                    });
                })

                return p.then(() => 'speak');
            }

            return updateSilent()
                .then(getSilent)
                .then(processMessage);
        }
        smooch.conversations.sendMessage('afad03zfv5wxcnp8jjtfda347', {
    text: 'Fabric',
    role: 'appMaker',
    actions: [
      {
        type: 'postback',
        text: 'Okay, great! First, Scrape or brush off excess egg particles, and rinse out the stain with cold water. Then, Pre-soak garment in cold water for at least 30 minutes with a laundry detergent that contains enzymes. After that, Wash as usual in cool water with detergent and ½ cup Clorox® Regular-Bleach1 to whites. Finally, Repeat as necessary and check for success before machine drying. Be thankful it wasn’t bacon.',
        payload: 'egg_fabric'
      }
    ]
}).then(() => {
    // async code
});
    }
});
        
