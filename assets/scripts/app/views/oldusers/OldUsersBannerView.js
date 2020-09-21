var r = require("../../utils/Utils"),
    n = require("../../Initializer"),
    UtilsUI = require("../../utils/UIUtils"),
    List = require("../../component/List"),
    s = require("../../utils/ShaderUtils"),
    l = require("../../utils/UIUtils");

cc.Class({
    extends: cc.Component,

    properties: {

        list: List.default,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.onDataUpdate();
    },

    onDataUpdate() {
        if (!n.oldUsersProxy.data) {
            return;
        }
        this.list.data = n.oldUsersProxy.data.rwd_preview;
    },

    gotoView() {
        this.closeSelf();
        r.utils.openPrefabView("oldusers/OldUsersView");
    },

    closeSelf() {
        r.utils.closeView(this);
    },

});