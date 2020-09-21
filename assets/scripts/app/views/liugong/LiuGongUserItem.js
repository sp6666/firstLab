const UrlLoad = require("../../component/UrlLoad");
const UIUtils = require("../../utils/UIUtils");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        head : UrlLoad.default,
        blank : UrlLoad.default,
        lblServerName : cc.Label,
    },

    init : function(data) {
        this.data = data;
        this.lblServerName.string = this.data.sevName + this.data.name;
        var blankInfo = localcache.getItem(localdb.table_userblank, this.data.headavatar.blank);
        var headInfo = localcache.getItem(localdb.table_userhead, this.data.headavatar.head);
        this.head.url = UIUtils.uiHelps.getAvatar(headInfo ? headInfo.id : 1);
        this.blank.url = UIUtils.uiHelps.getBlank(blankInfo ? blankInfo.blankmodel : 1);
    },

    onClickInfo : function() {
        //详情
        Utils.utils.openPrefabView("liugong/LiuGongDetailView", null, this.data);
    },
});
