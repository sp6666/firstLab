const RenderListItem = require("../../component/RenderListItem");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblActivityName : cc.Label,
        lblScore : cc.Label,
        xingYunNode : cc.Node,
    },

    showData : function() {
        if(this.data) {
            this.lblActivityName.string = this.data.name;
            this.lblScore.string = this.data.amount;
            if(this.xingYunNode != null) {
                var fuludata = Initializer.fuXingProxy.data.fortune[0];
                if(fuludata != null) {
                    if((Utils.timeUtil.second > fuludata.settle_time || fuludata.num >= fuludata.max_num) && this.data.index < 3) {
                        this.xingYunNode.active = true;
                    }else {
                        this.xingYunNode.active = false;
                    }
                }else {
                    this.xingYunNode.active = false;
                }
            }

        }
    },
});
