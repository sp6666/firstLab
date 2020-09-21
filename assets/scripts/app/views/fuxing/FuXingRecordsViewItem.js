const RenderListItem = require("../../component/RenderListItem");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblActivityName : cc.Label,
        lblScore : cc.Label,
    },

    showData : function() {
        if(this.data) {
            if(this.data.type == 0) {
                this.lblActivityName.string = i18n.t("FUXING_LINGQUXINGYUNHONGBAO");
            }else if(this.data.type == 1) {
                this.lblActivityName.string = i18n.t("FUXING_LINGQUFULUHONGBAO", {param1 : this.data.num});
            }else if(this.data.type == 2) {
                this.lblActivityName.string = i18n.t("FUXING_LINGQUXINCHUNHONGBAO", {param1 : this.data.num});
            }
            
            //this.lblScore.string = this.data.num;
        }
    },
});
