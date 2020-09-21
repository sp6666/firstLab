const list = require("../../component/List");
const Utils = require("../../utils/Utils");
const i = require("../../Initializer");
var api = require("../../utils/ApiUtils");
var config = require("../../Config");
cc.Class({
    extends: cc.Component,

    properties: {
        btnHydl: cc.Node,
        btnLXzl: cc.Node,
        box1: cc.Node,
        box2: cc.Node,
        content1: list.default,
        content2: list.default,
        btnBuyHydl: cc.Button,
        btnBuyLxzl: cc.Button,
        lblRecharge1:cc.Label,
        lblRecharge2:cc.Label,
        btnRecharge1:cc.Label,
        btnRecharge2:cc.Label,
        nodeScrol_0:cc.ScrollView,
        nodeScrol_1:cc.ScrollView

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btnHydl.active = //默认活跃度
        this.btnLXzl.active = 
        this.box1.active = //默认活跃度s
        this.box2.active = false;
        this.btnBuyHydl.node.active =
        this.btnBuyLxzl.node.active=false;
        this.nodeScrol_0.scrollToTop();
        this.nodeScrol_1.scrollToTop();
        facade.subscribe(i.jiJinChengZhangProxy.JIJIN_OPENINFO, this.updateView, this);
        facade.subscribe(i.purchaseProxy.PURCHASE_DATA_UPDATA,this.updateRecharge,this);
        facade.subscribe(i.jiJinChengZhangProxy.JIJIN_REHCARGE_SUCCESS,this.updateButton,this);
        facade.subscribe(i.jiJinChengZhangProxy.JIJIN_HYDL_RWD,this.updateLstHydl,this);
        facade.subscribe(i.jiJinChengZhangProxy.JIJIN_LXZL_RWD,this.updateLstLxzl,this);
        var gift =i.purchaseProxy.gift;
        // if(gift){
        //     this.updateRecharge();
        // }else{
            this.scheduleOnce(() => { i.purchaseProxy.sendOpenPrince() }, 0.2);        
        // }
        i.jiJinChengZhangProxy.openInfo();
    },

    updateView() {
        this.updateLstHydl();
        this.updateLstLxzl();
    },

    updateLstHydl(){
        this.content1.data = i.jiJinChengZhangProxy.lst_hydl;
    },
    updateLstLxzl(){
        this.content2.data = i.jiJinChengZhangProxy.lst_lxzl;
    },
    updateButton(){
        this.btnBuyHydl.node.active = !i.jiJinChengZhangProxy.activity_fund;
        this.btnBuyLxzl.node.active = !i.jiJinChengZhangProxy.main_fund;
    },

    start() {

    },
    updateRecharge(){
        this.onBtnHydl();
        let gift =i.purchaseProxy.gift;
        for (let index = 0; index < gift.length; index++) {
            const element = gift[index];
            if(element.type ==i.limitActivityProxy.JIJIN_ID&&element.id ==97){
                this.lblRecharge1.string =this.btnRecharge1.string =element.sign+element.present;
            }
            if(element.type ==i.limitActivityProxy.JIJIN_ID&&element.id ==96){
                this.lblRecharge2.string =this.btnRecharge2.string =element.sign+element.present;
            }
        }
    },
    onBtnHydl() {
        this.btnHydl.active = true;//默认活跃度
        this.btnLXzl.active = false;
        this.box1.active = true;//默认活跃度s
        this.box2.active = false;
        this.nodeScrol_0.scrollToTop();
    },
    onBtnLxzl() {
        this.btnHydl.active = false;//默认活跃度
        this.btnLXzl.active = true;
        this.box1.active = false;//默认活跃度s
        this.box2.active = true;
        this.nodeScrol_1.scrollToTop();
    },
    onBtnBuyHydl() {
        if (!i.jiJinChengZhangProxy.activity_fund) {
            for (var t = null, e = 0; e < i.purchaseProxy.gift.length; e++) {
                if (i.purchaseProxy.gift[e].type == i.limitActivityProxy.JIJIN_ID && i.purchaseProxy.gift[e].id == 97) {
                    t = i.purchaseProxy.gift[e];
                    break;
                }
            }
            if (t) {
                var o = 10 * t.grade + 1e6 + 1e4 * t.id;
                api.apiUtils.recharge(
                    i.playerProxy.userData.uid,
                    config.Config.serId,
                    o,
                    t.grade,
                    i18n.t("JIJIN_HYDL_OPEN"),
                    0
                );
            }
        }
    },
    onBtnBuyLxzl() {
        if (!i.jiJinChengZhangProxy.main_fund) {
            for (var t = null, e = 0; e < i.purchaseProxy.gift.length; e++) {
                if (i.purchaseProxy.gift[e].type == i.limitActivityProxy.JIJIN_ID && i.purchaseProxy.gift[e].id == 96) {
                    t = i.purchaseProxy.gift[e];
                    break;
                }
            }
            if (t) {
                var o = 10 * t.grade + 1e6 + 1e4 * t.id;
                api.apiUtils.recharge(
                    i.playerProxy.userData.uid,
                    config.Config.serId,
                    o,
                    t.grade,
                    i18n.t("JIJIN_LXZL_OPEN"),
                    0
                );
            }
        }
    },

    btnClose() {
        Utils.utils.closeView(this);
    }

});
