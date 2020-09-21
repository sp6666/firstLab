
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        lblFengShu : cc.Label,
        nodeEffect : cc.Node,
        statuNode : cc.Node,
        
    },

    init(data) {
        this.data = data;
        this.lblFengShu.string = i18n.t("LINGLANG_FENG", {num : this.data.copies});
        var statusArray = Initializer.lingLangProxy.data.status;
        this.haseData = false;
        for(var i = 0; i < statusArray.length; i ++) {
            if(statusArray[i] != null && statusArray[i].id == this.data.id) {
                this.haseData = true;
                break;
            }
        }

        this.statuNode.active = this.haseData;
        //判断是否可领取
        this.canGet = false;
        if(Initializer.lingLangProxy.data.curr_buy >= this.data.copies && !this.haseData) {
            this.canGet = true;
            this.nodeEffect.active = true;
        }else {
            this.nodeEffect.active = false;
        }
    },

    onClickItem : function() {
        if(this.canGet) {
            //领取
            Initializer.lingLangProxy.sendProgressRwd(this.data.id);
        }else if(!this.haseData) {
            //还未领取
            Utils.utils.openPrefabView("thanksGiving/ThanksGivingRwdView", false, this.data.rwd);
        }
    },
});
