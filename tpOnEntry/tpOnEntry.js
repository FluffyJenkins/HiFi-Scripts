(function () {
    var _entityID = null;
    var userData;

    var tpLocation = "";

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
        tpLocation = userData.tpLocation;
    };

    this.enterEntity = function () {
        location = tpLocation;
    };
});