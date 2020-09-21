
const Utils = require("../../utils/Utils");
const List = require("../../component/List");
cc.Class({
    extends: cc.Component,

    properties: {
        list : List.default,
    },

    onLoad() {
        this.data = this.node.openParam;
    },

    start() {
        this.initData();
    },

    initData : function() {
        var info = this.data;
        if (null != info) {
            this.list.data = info;
        }
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    }
});