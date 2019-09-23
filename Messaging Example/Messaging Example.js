(function () {
    /*
    Made by Fluffy Jenkins 23/09/2019

    You will want to open your script log to see the outputs. (Developer > Scripting > Script log (HMD Friendly))

    To use put the next line in your scripting console (control alt j)
    Messages.sendMessage("channelName",JSON.stringify({"ping":"pong"}));

    you can also use
    Messages.sendMessage("channelName",JSON.stringify({"color":"#9300FF"}));
    to change the cube colour!

    and finally if the script doesn't cleanup (cause this.unload isn't reliable)
    Messages.sendMessage("channelName",JSON.stringify({"cmd":"cleanup"}));

    I know that you should have a Messages.unsubscribe but that whole business with it is wack dude.

     */

    var channelName = "channelName";
    var id;

    this.preload = function (entityID) {
        id = entityID;
        Messages.subscribe(channelName);
        Messages.messageReceived.connect(messageReceived);
    };


    function messageReceived(channel, message, sender, local) {
        if (channel === channelName) {

            var cmd = {FAILED: true};
            try {
                cmd = JSON.parse(message);
            } catch (e) {
                //
            }
            if (!cmd.FAILED) {
                if (cmd.ping) {
                    console.log("MessageExample: "+cmd.ping);
                }
                if (cmd.color) {
                    Entities.editEntity(id,{"color":cmd.color});
                    console.log("MessageExample: Changed colour to "+cmd.color);
                }
                if(cmd.cmd === "cleanup"){
                    shutdown();
                }
            }
        }
    }

    function shutdown() {
        console.log("MessageExample: Cleanup!");
        try {
            Messages.messageReceived.disconnect(messageReceived);
        } catch (e) {
            //You should probs put something here to catch the error but *shrugs* x3
        }
    }

    this.unload = function () {
        shutdown();
    }

});