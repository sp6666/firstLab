const RenderListItem = require("../../component/RenderListItem");
const ItemSlotUI = require("../../views/item/ItemSlotUI");
const Utils = require("../../utils/Utils");
const Initializer = require("../../Initializer");
const UrlLoad = require('../../component/UrlLoad');
const UIUtils = require("../../utils/UIUtils");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        itemSlot : ItemSlotUI.default,
        lblTreeTip : cc.Label,
        lblCount : cc.Label,
        btnGet : cc.Button,
        btnStart : cc.Button,
        lblStartStatu : cc.Label,
        spriteStart : cc.Sprite,
        frameStart : cc.SpriteFrame,
        frameIn : cc.SpriteFrame,
        frameLock : cc.SpriteFrame,
        bgUrl : UrlLoad.default,
        lblLq : cc.Label,
        lvUrl : UrlLoad.default,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    showData : function() {
        var data = this._data;
        if(!data) return;
        var level_data = Initializer.shengDanProxy.level_data.cts[data.id - 1];
        if(level_data != null) {
            this.lblCount.string = level_data.curr_tree + "/" + data.tree;
            if(level_data.status == 0) {
                this.btnGet.interactable = false;
                this.lblLq.string = i18n.t("ACHIEVE_GET");
            }else if(level_data.status == 1) {
                this.btnGet.interactable = true;
                this.lblLq.string = i18n.t("ACHIEVE_GET");
            }else {
                this.btnGet.interactable = false;
                this.lblLq.string = i18n.t("ACHIEVE_GETED");
            }

            if(level_data.open == 1) {
                this.lblStartStatu.string = i18n.t("SHENGDAN_MAOXIAN");
                this.spriteStart.spriteFrame = this.frameStart;
                this.btnStart.interactable = true;
            }else {
                this.lblStartStatu.string = i18n.t("SHENGDAN_WEIJIESUO");
                this.spriteStart.spriteFrame = this.frameLock;
                this.btnStart.interactable = false;
            }
            
        }else {
            this.lblCount.string = 0 + "/" + data.tree;
            this.btnGet.interactable = false;
            this.lblLq.string = i18n.t("ACHIEVE_GET");
            this.btnStart.interactable = false;
            this.spriteStart.spriteFrame = this.frameLock;
            this.lblStartStatu.string = i18n.t("SHENGDAN_WEIJIESUO");
        }
        if(data.id == 8) {
            this.lblCount.node.active = false;
            this.lblTreeTip.node.active = false;
        }
        this.itemSlot.data = data.rwd[0];
        this.bgUrl.url = UIUtils.uiHelps.getShengDanLevelBg(data.id);
        this.lvUrl.url = UIUtils.uiHelps.getShengDanLevel(data.id);
    },


    onClickGet : function() {
        Initializer.shengDanProxy.sendRwd(this._data.id, 1);
    },

    onClickGo : function() {
        Utils.utils.openPrefabView("shengdan/ShengDanLuckCard", false, this._data);
    },
    // update (dt) {},
});
