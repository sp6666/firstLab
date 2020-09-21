var max=require("../../app/component/SelectMax");
var item=require("../../app/views/item/ItemSlotUI");
var init = require("../../app/Initializer");
var uiutils = require("../../app/utils/UIUtils");
var utils = require("../../app/utils/Utils");
cc.Class({
    extends: cc.Component,

    properties: {
        //提示文字
        lblTip: {
            default: null,
            type: cc.RichText
        },
        //选择列表
        selectMax: {
            default: null,
            type: max.default
        },
        //货币
        itemSlot: {
            default: null,
            type: item.default
        }
    },
    onLoad() { 
        this.data = this.node.openParam;
        var n = new uiutils.ItemSlotData();
        n.id = 1;
        n.count = init.playerProxy.userData.cash;
        this.itemSlot.data = n;

        var self = this;
        this.selectMax.changeHandler = function(){
            var cot = self.selectMax.curValue;
            var cost = utils.utils.getParamInt("clothe_cost");
            switch(self.data)
            {
                case 1:
                    {
                        cost = utils.utils.getParamInt("clothe_cost");
                        break;
                    }
                case 2:
                    {
                        cost = utils.utils.getParamInt("confidante_cost");
                        break;
                    }
            }
            self.lblTip.string = i18n.t("CLOTHE_BUY_COST",{ num: cot * cost, count:cot});
        };
        this.selectMax.curValue = 0;
        this.selectMax.max = 99;
        this.selectMax.lblCount.string = this.selectMax.curValue > 0 ? 1 : 0;
    },

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickBuy() {
        var count = this.selectMax.curValue;

        switch(this.data)
        {
            case 1:
                {
                    //
                    init.clothePveProxy.sendAdd(count);
                    break;
                }
            case 2:
                {
                    break;
                }
        }
        
        this.onClickClose();
    },
    onClickClose() {
        utils.utils.closeView(this);
    },
});

