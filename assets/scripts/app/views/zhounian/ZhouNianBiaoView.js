const List=require("../../component/List");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
const ApiUtils = require("../../utils/ApiUtils");
const Config = require("../../Config");

cc.Class({
    extends: cc.Component,

    properties: {
        listMB : List.default,
        barMB : cc.ProgressBar,
        nodeMB : cc.Node,
        nodeListItem : cc.Node,
        lblCost : cc.Label,
        btnGet : cc.Button,
        btnLion : cc.Button,
        aniBtnGet : cc.Animation,
        pNextNode : cc.Node,
        lionAniSp : sp.Skeleton,
    },

    
    onLoad() {
        if(Initializer.zhouNianProxy.rwd == null) {
            Utils.utils.closeView(this);
            Utils.alertUtil.alert18n("COMMON_NODATA");
            return;
        }

        facade.subscribe(Initializer.zhouNianProxy.ZHOUNIAN_MUBIAO_UPDATE, this.onDataUpdate, this);
        facade.subscribe("MOON_CARD_BUY_UPDATE",this.onUnlockSuccess,this);
        this.pNextNodeCtr = this.pNextNode.getComponent("ZhouNianBiaoItem");
        this.onDataUpdate();
    },

    onDataUpdate : function() {
        if(Initializer.zhouNianProxy.rwd == null) {
            return;
        }
        this.rwdData = Initializer.zhouNianProxy.rwd.gear;
        this.countNum = Initializer.zhouNianProxy.rwd.countNum;
        this.lionOpen = Initializer.zhouNianProxy.rwd.lion == 1;
        this.totalNum = Initializer.zhouNianProxy.rwd.totalNum;
        this.btnLion.interactable = !this.lionOpen;

        //开始计算
        var canGet = false;
        var data = [];
        var mostGetItemIndex = -1;
        for(var i = 0; i < this.rwdData.length; i ++ ) {
            var item = this.rwdData[i];
            var id = item.id;
            item.open = this.countNum >= id;
            item.lionOpen = this.lionOpen;
            data.push(item);
            if(!canGet && item.open && (item.fGet == 0 || (item.lionOpen && item.sGet == 0))) {
                canGet = true;
            }

            if(item.fGet == 1 && (mostGetItemIndex == -1 || mostGetItemIndex < i)) {
                mostGetItemIndex = i;
            }
        }

        var detal = 5;
        var item = null;
        if(mostGetItemIndex == -1) {
            item = this.rwdData[ 1 * detal - 1];
        }else {
            var index = Math.floor((mostGetItemIndex + 1)/ detal);
            
            if(this.rwdData[(index + 1) * detal - 1] == null) {
                item = this.rwdData[this.rwdData.length - 1];
            }else {
                item = this.rwdData[(index + 1) * detal - 1];
            }
        }

        this.pNextNodeCtr.data = item;
        this.pNextNodeCtr.showData();

        this.btnGet.interactable = canGet;
        this.lionAniSp.clearTracks();
        if(!this.lionOpen) {
            this.lionAniSp.node.active = true;
            this.lionAniSp.setAnimation(0, "animation", true);
        }else {
            this.lionAniSp.node.active = false;
        }

        if(canGet) {
            this.aniBtnGet.play();
        }else {
            this.aniBtnGet.stop();
        }

        this.listMB.data = data;

        this.barMB.node.width = this.rwdData.length * this.nodeListItem.height - 10;
        this.nodeMB.width = this.barMB.node.width;
        this.barMB.progress = this.countNum / this.totalNum;
        this.lblCost.string = this.countNum;

    },

    onCloseClick : function() {
        Utils.utils.closeView(this);
    },

    onClickGet : function() {
        //领取
        Initializer.zhouNianProxy.sendRwd();
    },

    onClickLion : function() {
        //舞狮
        for (var t = null, e = 0; e < Initializer.purchaseProxy.gift.length; e++)
        if (Initializer.purchaseProxy.gift[e].type == Initializer.limitActivityProxy.LION_ID) {
            t = Initializer.purchaseProxy.gift[e];
            break;
        }
        if (t) {
            var o = 10 * t.grade + 1e6 + 1e4 * t.id;
            ApiUtils.apiUtils.recharge(
                Initializer.playerProxy.userData.uid,
                Config.Config.serId,
                o,
                t.grade,
                i18n.t("LION_GOLD_RWD"),
                0
            );
        }

        //facade.send("MOON_CARD_BUY_UPDATE");
    },

    onUnlockSuccess : function(){
        if(Initializer.zhouNianProxy.rwd.lion == 0){
            Initializer.zhouNianProxy.rwd.lion = 1;
            Utils.alertUtil.alert18n("LION_UNLOCK_SUCCESS");
            //解锁成功,刷新
            this.onDataUpdate();
        }
    },

});
