const RenderListItem = require("../../component/RenderListItem");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblActivityName : cc.Label,
        lblRank : cc.Label,
        lblScore : cc.Label,
        lblTotalSocre : cc.Label,
    },

    showData : function() {
        if(this.data) {
            this.lblActivityName.string = this.data.name;
            this.lblRank.string = this.data.rid;
            this.lblScore.string = this.data.score;
            this.lblTotalSocre.string = this.data.new_score;
        }
    },
});
