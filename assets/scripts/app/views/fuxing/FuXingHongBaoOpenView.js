
const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
cc.Class({
    extends: cc.Component,

    properties: {
        lblContent : cc.Label,
        spine : sp.Skeleton,
        btnOpen : cc.Button,
        btnClose : cc.Button,
        hongbaoNode : cc.Node,
    },


    start () {
        this.data = this.node.openParam;
        if(this.data.content!= null) {
            this.lblContent.string = this.data.content;
        }else {
            this.lblContent.string = "";
        }

        this.lblContent.string = Initializer.fuXingProxy.getHongBaoWorlds();
    },

    // update (dt) {},

    onClickClose : function() {
        Utils.utils.closeView(this);
    },

    onOpenHongBao : function () {
        Initializer.fuXingProxy.sendGetXinChunHongbao(this.data.id, ()=> {
            //this.onClickClose();
            this.btnOpen.interactable = false;
            this.hongbaoNode.active = false;
            this.btnClose.interactable = false;
            this.spine.node.active = true;
            this.spine.setAnimation(1, "animation", false);
            this.spine.setCompleteListener(()=> {
                this.spine.setCompleteListener(null);
                this.spine.node.active = false;
                this.onClickClose();
                Initializer.timeProxy.floatReward();
            })
        });
    },
});
