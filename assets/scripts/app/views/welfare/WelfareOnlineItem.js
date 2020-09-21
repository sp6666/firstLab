/**
 * 在线奖励
 */
const UIUtils = require("../../utils/UIUtils");
const UrlLoad = require("../../component/UrlLoad");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
const ItemSlotUI = require("../item/ItemSlotUI");
cc.Class({
    extends: cc.Component,

    properties: {
        bgUrl : UrlLoad.default,
        labelTime : cc.Label,
        btnGet : cc.Button,
        weimzNode : cc.Node,
        itemSlot : ItemSlotUI.default,
        effectNode : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    init : function(index) {
        this.data = Initializer.welfareProxy.onlineData.line_rwd[index];
        if(this.data == null) return;
        if(this.data.get == 1) {
            //已领取
            this.bgUrl.url = UIUtils.uiHelps.getCommonImg("qiandao/btn_ylq");
            this.btnGet.interactable = false;
            this.labelTime.string = i18n.t("ACHIEVE_GETED");
            this.weimzNode.active = false;
            this.effectNode.active = false;
        }else {
            if(Initializer.welfareProxy.onlineData.line_time >= this.data.need_time) {
                //可领
                this.bgUrl.url = UIUtils.uiHelps.getCommonImg("qiandao/btn_lq");
                this.btnGet.interactable = true;
                this.labelTime.string = i18n.t("ACHIEVE_GET");
                this.weimzNode.active = false;
                this.effectNode.active = true;
            }else {
                //不可领
                this.bgUrl.url = UIUtils.uiHelps.getCommonImg("qiandao/btn_wmz");
                this.btnGet.interactable = true;
                if(Initializer.welfareProxy.getCountDownLevel() != this.data.id - 1) {
                    this.labelTime.string = i18n.t("WELFARE_ONLINE_TIME", {param : parseInt((this.data.need_time - Initializer.welfareProxy.onlineData.line_time) / 60)});
                }else {
                    this.labelTime.string = Utils.timeUtil.second2hms(this.data.need_time - Initializer.welfareProxy.onlineData.line_time, "HH:mm:ss");
                }
                this.effectNode.active = false;
                this.weimzNode.active = true;
            }
        }

        this.itemSlot.data = this.data.rwd[0];
    },

    onClickItem : function() {
        if(Initializer.welfareProxy.onlineData.line_time < this.data.need_time) {
            this.itemSlot.onClickShowInfo();
        }else {
            Initializer.welfareProxy.getOnLineRwd(this.data.id);
        }
        
    },

});
