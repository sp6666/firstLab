var n = require("../../Initializer"),
    selectMax = require("../../component/SelectMax"),
    utils = require("../../utils/Utils"),
    sl = require("../item/ItemSlotUI");

cc.Class({
    extends: cc.Component,

    properties: {
        lblTip: cc.Label,
        lblNum: cc.Label,
        silderCount: selectMax.default,
    },

    // LIFE-CYCLE CALLBACKS:
    //start () {},

    onLoad: function () {
        var t = n.fineFoodProxy.data.settings.stamina.price;
        if (t) {

            var num = parseInt(n.playerProxy.userData.cash / t);

            //silder
            this.silderCount.curValue = 1;
            this.silderCount.max = num > 0 ? num : 1;
            this.silderCount.lblCount.string = 1;

            this.lblTip.string = i18n.t("FINE_FOOD_SHOP_STAMINA_BUY", {
                cash: parseInt(t * this.silderCount.curValue),
                num: parseInt(this.silderCount.curValue)
            });

            var self = this;
            this.silderCount.changeHandler = function () {
                self.lblTip.string = i18n.t("FINE_FOOD_SHOP_STAMINA_BUY", {
                    cash: parseInt(t * self.silderCount.curValue),
                    num: parseInt(self.silderCount.curValue)
                });
            };
        } else {
            this.setGray(false);
            this.lblNum.string = "0/0";
        }
    },
    setGray: function (isGray) {
        //物品置灰
        this.slot.setGray(isGray);

        //如果物品不够就显示按钮
        this.btnAction.node.active = isGray;
    },
    // update (dt) {},

    //点击弹出对话框
    onClickGift: function () {
        if (this.silderCount.curValue <= 0) {
            this.onClickClose();
            return;
        }

        n.fineFoodProxy.sendBuyStamina(this.silderCount.curValue);
        this.onClickClose();
    },

    //关闭
    onClickClose: function () {
        utils.utils.closeView(this);
    },
});