var renderListItem = require("../../component/RenderListItem");
var list=require("../../component/List");
var init = require("../../Initializer");
var uiutil = require("../../utils/UIUtils");
var util = require("../../utils/Utils");
var time = require("../../models/TimeProxy");
cc.Class({
    extends: renderListItem.default,

    properties: {
        //领取按钮
        btnGetRwd: {
            default: null,
            type: cc.Button
        },
        //领取按钮文字
        lblGetRwd: {
            default: null,
            type: cc.Label
        },
        //领取提示文字
        lblTip: {
            default: null,
            type: cc.Label
        },
        //奖励列表
        lstRwd: {
            default: null,
            type: list.default
        }
    },
    showData: function () {
        var t = this._data;
        var canUse = init.clothePveProxy.checkRwd(t.target);    

        //领奖按钮
        // 0,不可领， 1，已领取， 2，可以领
        this.btnGetRwd.interactable = canUse == 2;
        this.lblGetRwd.string = canUse == 1 ? i18n.t("CLOTHE_PVE_BTN_RWD_GOT") : i18n.t("CLOTHE_PVE_BTN_RWD_GET");

        //奖励列表
        this.lstRwd.data = t.rwd;

        //提示
        this.lblTip.string = i18n.t("CLOTHE_PVE_LBL_WIN_COUNT",{ num: t.target });
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    // start () {

    // },

    // update (dt) {},

    //点击
    onClickGetRwd() {
        init.clothePveProxy.sendGetRwd(this.data.target);
    },
});

