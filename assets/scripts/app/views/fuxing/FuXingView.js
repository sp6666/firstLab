/**
 * 福星高照
 */
const List = require("../../component/List");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
const UIUtils = require("../../utils/UIUtils");
cc.Class({
    extends: cc.Component,

    properties: {
        fuLuList : List.default,
        lblTime : cc.Label,
        btnFulu : cc.Button,  
        lblCount : cc.Label,
        lblNum : cc.Label,
        nodeOpen : cc.Node,
        nodeNotOpen : cc.Node,
        lblLeiJiYuanBao : cc.Label,
        lightNode : cc.Node,
        spineNode : cc.Node,
        spine : sp.Skeleton,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        facade.subscribe(Initializer.fuXingProxy.FUXING_DATA_UPDATE, this.onDataUpdate, this);
        facade.subscribe(Initializer.fuXingProxy.FUXING_HONGBAO_UPDATE, this.onHongBaoPosUpdate, this);
        facade.subscribe(Initializer.fuXingProxy.FUXING_BASE_UPDATE, this.onBaseUpdate, this);
        facade.subscribe(Initializer.bagProxy.UPDATE_BAG_ITEM,this.onItemUpdate,this);
        facade.subscribe(Initializer.fuXingProxy.FUXING_OPENEFFECT,this.openEffect,this);
        Initializer.fuXingProxy.sendOpenActivity();
    },

    start () {

    },

    onDataUpdate : function() {
        if(Initializer.fuXingProxy.data == null) return;
        var fuluData = Initializer.fuXingProxy.data.fortune[0];
        if(fuluData == null) {
            this.btnFulu.interactable = false;
            this.lblLeiJiYuanBao.node.active = false;
        }else {
            //this.btnFulu.interactable = true;

            if(Utils.timeUtil.second < fuluData.ly_time) {
                this.btnFulu.interactable = false;
                this.nodeOpen.active = false;
                this.nodeNotOpen.active = true;
                this.lightNode.active = false;
            }else {
                this.btnFulu.interactable = true;
                this.nodeOpen.active = true;
                this.nodeNotOpen.active = false;
                this.lightNode.active = true;
            }
            this.lblLeiJiYuanBao.node.active = true;
            this.lblLeiJiYuanBao.string = i18n.t("FUXING_LEIJIYUANBAO", {param1 : fuluData.total});
        }
        // var listData = [];
        // for(var i = 0; i < 3; i ++) {
        //     var itemData = {};
        //     itemData.data = Initializer.fuXingProxy.data.lucky[i];
        //     listData.push(itemData);
        // }

        this.fuLuList.data = Initializer.fuXingProxy.getXingYunHongBaoList();
    },

    onItemUpdate : function () {
        if (Initializer.fuXingProxy.base) {
            var t = Initializer.bagProxy.getItemCount(Initializer.fuXingProxy.base.need);
            this.lblNum.string = t + "";
        }
    },

    onBaseUpdate : function() {
        if(Initializer.fuXingProxy.base == null) return;
        this.onItemUpdate();
        UIUtils.uiUtils.countDown(Initializer.fuXingProxy.base.info.eTime, this.lblTime, () => {
            this.lblTime.string = i18n.t("ACTHD_OVERDUE");
        });
    },

    onHongBaoPosUpdate : function() {
        if(Initializer.fuXingProxy.hongbaoData == null) return;
        this.lblCount.string = Initializer.fuXingProxy.hongbaoData.num + " / " + Initializer.fuXingProxy.hongbaoData.max_num;
    },

    onClickFulu : function() {
        var fuluData = Initializer.fuXingProxy.data.fortune[0];
        if(Utils.timeUtil.second < fuluData.ly_time) {
            //
            Utils.alertUtil.alert18n("FUXING_FULUWEIKAIQI");
            return;
        }

        if(fuluData.state == 0) {
            Initializer.fuXingProxy.sendGetHongbao(1, Initializer.fuXingProxy.data.fortune[0].id, ()=> {
                this.scheduleOnce(()=> {
                    this.showHongBaoView(fuluData);
                }, 1)
                
            });
        }else {
            this.showHongBaoView(fuluData);
        }
        
    },

    showHongBaoView : function(data) {
        Utils.utils.openPrefabView("fuxing/FuXingHongBaoView", null, data);
    },

    onClickClose : function() {
        Utils.utils.closeView(this);
    },

    onClickAdd : function() {
        if(Initializer.fuXingProxy.shopData == null || Initializer.fuXingProxy.shopData[0] == null) return;
        Utils.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: Initializer.fuXingProxy.shopData[0],
            activityId: Initializer.fuXingProxy.base.info.id
        });
    },

    onClickRecord : function() {
        Initializer.fuXingProxy.sendGetRecords(()=> {
            Utils.utils.openPrefabView("fuxing/FuXingRecordsView", null, Initializer.fuXingProxy.recordsData);
        })
    },

    onClickRank : function() {
        Initializer.fuXingProxy.sendGetRank(()=> {
            Utils.utils.openPrefabView("fuxing/FuXingRankView");
        })
    },

    onClickDhShop : function () {    
        Utils.utils.openPrefabView(
            "ActivityShopView",
            null,
            Initializer.fuXingProxy.dhShop
        );
    },

    onClickFuDai : function() {
        if(Utils.timeUtil.second > Initializer.fuXingProxy.base.info.eTime) {
            Utils.utils.showSingeConfirm(i18n.t("ACTHD_OVERDUE"));
            return;
        }
        if(Initializer.fuXingProxy.hongbaoData.num <= 0) {
            Utils.utils.showSingeConfirm(i18n.t("FUXING_SHENGYULINGGE"));
            return;
        } 
        Utils.utils.showSingeConfirm(i18n.t("FUXING_FUDAITIP", {num : Initializer.fuXingProxy.hongbaoData.num}));
    },

    openEffect : function() {
        this.spineNode.active = true;
        this.spine.setAnimation(1, "animation", false);
            this.spine.setCompleteListener(()=> {
                this.spineNode.active = false;
                Initializer.timeProxy.floatReward();
            })
    },
    // update (dt) {},
});
