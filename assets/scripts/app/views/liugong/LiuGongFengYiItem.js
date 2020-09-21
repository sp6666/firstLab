const RenderListItem = require("../../component/RenderListItem");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblRank : cc.Label,
        lblName : cc.Label,
        lblScore : cc.Label,
        lblServer : cc.Label,
    },

    showData : function() {
        if(this.data) {
            this.lblRank.string = this.data.rid;
            this.lblName.string = this.data.name;
            this.lblScore.string = this.data.score;
            this.lblServer.string = this.data.sevName;
        }
    },

    onInfoClick : function() {
        Utils.utils.openPrefabView("liugong/LiuGongDetailView", null, this.data);
    },
});
