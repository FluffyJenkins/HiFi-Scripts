(function () {
    var _entityID = null;
    var userData;

    var sound = null;

    function getUserData(entID) {
        try {
            userData = JSON.parse(Entities.getEntityProperties(entID).userData);
        } catch (e) {
            /**/
        }
    }

    this.preload = function (entityID) {
        _entityID = entityID;
        getUserData(_entityID);
        sound = SoundCache.getSound(userData.soundURL);
    };

    function playSound() {
        if (userData.soundURL) {
            Audio.playSound(SoundCache.getSound(userData.soundURL), {
                orientation: MyAvatar.orientation,
                position: MyAvatar.position,
                volume: userData.volume ? userData.volume : 0.3,
                pitch: 1,
                localOnly: false
            });
        }
    }

    this.enterEntity = function () {
        playSound();
    };
});