(function () {
    var _entityID = null;
    var sphereGravTimer;
    var entitiesGravTimer;
    var gravity = -2;
    var userData;

    function getUserData(entID) {
        try {
            userData = JSON.parse(Entities.getEntityProperties(entID).userData);
        } catch (e) {
            /**/
        }
    }

    function sphereGrav() {
        var pos = Entities.getEntityProperties(_entityID, ["position"]).position;
        var surfaceNormal = Vec3.subtract(MyAvatar.position, pos);
        var up = Quat.getUp(MyAvatar.orientation);
        if(userData.inverted === true){
            up = Quat.inverse(up);
        }
        var rot = Quat.multiply(Quat.rotationBetween(up, surfaceNormal), MyAvatar.orientation);
        MyAvatar.orientation = rot;
    }

    function fitToOne(vec) {
        var highestValue = Math.max(Math.abs(vec.x), Math.abs(vec.y), Math.abs(vec.z));
        return {x: vec.x / highestValue, y: vec.y / highestValue, z: vec.z / highestValue};
    }

    function makePositive(vec) {
        return {x: Math.abs(vec.x), y: Math.abs(vec.y), z: Math.abs(vec.z)};
    }

    this.preload = function (entityID) {
        _entityID = entityID;
        getUserData(_entityID);
        entitiesGravTimer = Script.setInterval(function () {

            var entProps = Entities.getEntityProperties(_entityID, ["position", "dimensions"]);
            var ents = Entities.findEntities(entProps.position, (entProps.dimensions.y / 2) + 1);
            var pos = entProps.position;
            ents.forEach(function (entID) {

                var entIDProps = Entities.getEntityProperties(entID, ["dynamic", "position", "gravity"]);
                if (entIDProps.dynamic) {

                    if (Vec3.distance(pos, entIDProps.position) > (entProps.dimensions.y / 2)) {
                        Entities.editEntity(entID, {
                            gravity: Vec3.multiply({
                                x: 0,
                                y: 1,
                                z: 0
                            }, -Vec3.length(entIDProps.gravity))
                        });
                        return;
                    }
                    else {
                        var surfaceNormal = Vec3.normalize(Vec3.subtract(entIDProps.position, pos));
                        var up = -Vec3.length(entIDProps.gravity);
                        if(userData.inverted === true){
                            up = Vec3.length(entIDProps.gravity);
                        }
                        var newGrav = Vec3.multiply(surfaceNormal, up);
                        if (Vec3.withinEpsilon(newGrav, {x: 0, y: 0, z: 0}, 1)) {
                            return;
                        } else {
                            Entities.editEntity(entID, {gravity: newGrav});
                        }
                    }
                }
            });
        }, 100);
        if (userData.gravity) {
            gravity = userData.gravity;
        } else {
            gravity = -5;
        }
        if(userData.interval){
            interval = userData.interval;
        } else {
            interval = 10;
        }
    };

    function playSound() {
        if (userData.soundURL) {
            Audio.playSound(SoundCache.getSound(userData.soundURL), {
                orientation: MyAvatar.orientation,
                position: MyAvatar.position,
                volume: .3,
                pitch: 1,
                localOnly: true
            });
        }
    }

    this.enterEntity = function (entityID) {
        playSound();
        MyAvatar.hmdLeanRecenterEnabled = false;
        MyAvatar.setGravity(gravity);
        sphereGravTimer = Script.setInterval(sphereGrav, interval);
    };

    this.leaveEntity = function (entityID) {
        playSound();
        MyAvatar.hmdLeanRecenterEnabled = true;
        MyAvatar.setGravity(-5);
        Script.clearInterval(sphereGravTimer);
        sphereGravTimer = 0;
        Script.setTimeout(function () {
            MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
        }, 500);
    };

    Script.scriptEnding.connect(function () {
        MyAvatar.hmdLeanRecenterEnabled = true;
        MyAvatar.setGravity(-5);
        if (sphereGravTimer) {
            Script.clearInterval(sphereGravTimer);
        }
        if (entitiesGravTimer) {
            Script.clearInterval(entitiesGravTimer);
        }
        Script.setTimeout(function () {
            MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
        }, 500);
    });
});