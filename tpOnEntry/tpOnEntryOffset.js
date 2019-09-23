(function () {
    var _entityID = null;
    var userData;

    var offset = "";

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
        offset = userData.offset;
    };

    this.enterEntity = function () {
        MyAvatar.position = Vec3.sum(MyAvatar.position,offset);
    };
});