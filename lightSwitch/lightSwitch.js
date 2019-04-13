(function () {
    var entityID;

    var lightName;
    var lights = [];

    var myPos = {};

    var sound = null;

    var userData = {"lightName": "mainRoomLights", "soundURL": "", "soundVol": 0.1};

    this.preload = function (entID) {
        entityID = entID;
        var myPos = Entities.getEntityProperties(entityID).position;
        var tempUD = Entities.getEntityProperties(entityID).userData;
        try {
            tempUD = JSON.parse(tempUD);
            if (!tempUD.hasOwnProperty("lightName")) {
                tempUD.lightName = userData.lightName;
                tempUD.soundURL = userData.soundURL;
                tempUD.soundVol = userData.soundVol;
                Entities.editEntity(entityID, {"userData": JSON.stringify(tempUD)});
            } else {
                userData = tempUD;
            }
        } catch (e) {
            tempUD = userData;
            Entities.editEntity(entityID, {"userData": JSON.stringify(tempUD)});
        }

        if (userData.soundURL !== "") {
            sound = SoundCache.getSound(userData.soundURL);
        }

        lights = Entities.findEntitiesByName(userData.lightName, myPos, 100);
    }

    function getLightState() {
        return Entities.getEntityProperties(lights[0]).visible;
    }

    function switchLights() {
        if (userData.soundURL !== "") {
            Audio.playSound(sound, {
                position: myPos,
                volume: userData.soundVol,
                localOnly: false
            });
        }
        var state = !getLightState();
        lights.forEach(function (light) {
            Entities.editEntity(light, {"visible": state});
        });
    }


    this.startFarTrigger = function (entityID) {
        switchLights();
    };

    this.startNearGrab = function (entityID) {
        switchLights();
    };

    this.clickDownOnEntity = function (entityID, event) {
        switchLights();
    };
})