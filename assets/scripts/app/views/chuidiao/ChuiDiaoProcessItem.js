var selectMax = require("../../component/SelectMax"),
    renderListItem = require("../../component/RenderListItem"),
    s = require("../../utils/ShaderUtils"),
    u = require("../../utils/Utils"),
    i = require("../../Initializer"),
    n = require("../item/ItemSlotUI");

    cc.Class({
    extends: renderListItem.default,

    properties: {
        lblCount: cc.Label,
        lblName: cc.Label,
        silderCount: selectMax.default,
        slot: n.default,
        spIcon: cc.Sprite,
        btnAction:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    showData: function() {
        var t = this._data;
        if (t) {
            var e = localcache.getItem(localdb.table_item, t.id);
            //名称
            this.lblName.string = e.name;

            //数量
            var count = i.bagProxy.getItemCount(t.id);
            this.lblCount.string = count;

            //silder
            this.silderCount.curValue = 0;
            this.silderCount.max = t.num;
            this.silderCount.lblCount.string = t.num > 0 ? 1 : 0;
            
            //item
            this.slot.data = e;

            if(t.num == 0){
                this.spIcon && s.shaderUtils.setImageGray(this.spIcon, true);
                //s.shaderUtils.setNodeGray(this.node);
                //
                this.btnAction.interactable = false;
            }
        }
        else{
            this.spIcon && s.shaderUtils.setImageGray(this.spIcon, true);
            //s.shaderUtils.setNodeGray(this.node);
            //如果为空，置灰
            this.btnAction.interactable = false;
        }
    },

    // update (dt) {},

    onClickGift: function() {
        if(this.silderCount.curValue <= 0){
            //提示道具不足
            u.alertUtil.alert(i18n.t("CHUIDIAO_SHOP_EXCHANGE_NO_NUM", { name: this.lblName.string}));
            return;
        }

        //生鱼片配置
        var self = this;
        u.utils.showConfirm(
            i18n.t("CHUIDIAO_SHOP_PROCESS_TIP", {
                num: self.silderCount.curValue,
                name: self.lblName.string,
                ypnum: self._data.target[0].count * self.silderCount.curValue
            }),
            function() {
                i.chuidiaoProxy.sendSpecialExchange(self._data.index, self.silderCount.curValue);
            }
        );
    },
});
