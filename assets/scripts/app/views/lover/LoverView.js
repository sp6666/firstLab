var r = require("../../utils/Utils"),
    n = require("../../Initializer"),
    UtilsUI = require("../../utils/UIUtils"),
    List = require("../../component/List"),
    s = require("../../utils/ShaderUtils"),
    l = require("../../utils/UIUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        lblBall: cc.Label,
        lblNum:cc.Label,
        lblTime:cc.Label,
        btnMake:cc.Button,
        listFood:[cc.Label],
        pbReward:cc.ProgressBar,
        listRewardBtn:[cc.Node],
        records: List.default,
        scroll: cc.ScrollView,
        mergeSpine:sp.Skeleton
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function () {
        facade.subscribe(n.loverProxy.LOVER_DATA_UPDATE, this.onDataUpdate, this);  //获得数据
        facade.subscribe(n.loverProxy.LOVER_LEIJI_PAIHANG, this.onDataUpdate, this);
        
        facade.subscribe(n.loverProxy.LOVER_DATA_RECORDS,this.onRecords, this);
        facade.subscribe(n.bagProxy.UPDATE_BAG_ITEM,this.onItemUpdate,this);

        this.onItemUpdate();
        this.onDataUpdate();

        n.loverProxy.sendOpenActivity();
    },

    start: function () {

    },

    // update (dt) {},

    onDataUpdate: function() {
        if (null != n.loverProxy.data) {
            var t = this;
            //倒计时
            l.uiUtils.countDown(
                n.loverProxy.data.info.eTime,
                this.lblTime,
                function() {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                }
            );

            //progress reward 
            if(null != n.loverProxy.leijiData){
                var score = n.loverProxy.leijiData.score;
                var score_rwd_got = n.loverProxy.leijiData.rwd_status;
                var score_rwd = n.loverProxy.data.score_rwd;
                var scoreMax = 0;

                var rewardBtnIndex = 0;
                for(var key of score_rwd){
                    var targetScore = key.score;//score_rwd[key];
                    if(targetScore > scoreMax) scoreMax = targetScore;

                    var isClaimed = false;
                    if(score_rwd_got && score_rwd_got[rewardBtnIndex] && score_rwd_got[rewardBtnIndex].status===1){
                        isClaimed = true;
                    }
                    
                    var rewardBtn = this.listRewardBtn[rewardBtnIndex];
                    rewardBtn.getComponent(cc.Button).interactable = true;
                    rewardBtn.children[0].active = true;
                    rewardBtn.children[1].active = true;
                    rewardBtn.children[1].getComponent(cc.Label).string = targetScore;

                    if(isClaimed){
                        //已经领取
                        rewardBtn.children[2].active = false;
                        rewardBtn._claim = false;
                        rewardBtn.children[1].getComponent(cc.Label).string = i18n.t("ACHIEVE_GETED");
                    }
                    else{
                        //未领取
                        if(score >= targetScore){
                            //显示可领取
                            rewardBtn.children[2].active = true;
                            rewardBtn._claim = true;
                            rewardBtn.children[1].getComponent(cc.Label).string = i18n.t("ACHIEVE_OVER");
                        }
                        else{
                            rewardBtn.children[2].active = false;
                            rewardBtn._claim = false;
                        }
                    }

                    rewardBtnIndex++;
                }

                this.pbReward.progress = score / scoreMax;

                //设置按钮位置
                rewardBtnIndex = 0;
                for(var key of score_rwd){
                    var scoreCur = key.score;//score_rwd[key];
                    var rwdBtn = this.listRewardBtn[rewardBtnIndex];
                    if(rwdBtn){
                        rwdBtn.x = this.pbReward.node.width * scoreCur /scoreMax;
                    }
                
                    rewardBtnIndex++;
                }
            }
        }
    },

    onRecords: function() {
        if( n.loverProxy.records != null){
            this.records.data = n.loverProxy.records;
            this.scroll.scrollToBottom();
        }
    },

    onItemUpdate: function() {
        var t = n.bagProxy.getItemCount(n.loverProxy.LOVER_ITEM_LI_HE);
        // this._oldNum > t && n.loverProxy.sendOpenActivity();
        this.lblNum.string = t + "";
        // this._oldNum = t;

        this.lblBall.string = t + "";
        // if (n.loverProxy.data) {
        //     var e = n.bagProxy.getItemCount(n.loverProxy.data.need);
        //     // this.tipNode.active = 0 == e;
        //     this.lblBall.string = e + "";
        // }

        //道具列表
        n.loverProxy.foodList = [];
        var foodList = localcache.getList(localdb.table_lover);
        for(var i = 0;i< foodList.length;++i){
            var foodItem = foodList[i];
            foodItem.num = n.bagProxy.getItemCount(foodItem.id);
            foodItem.index = i;
            n.loverProxy.foodList.push(foodItem);

            //更新显示
            if(this.listFood[i] != null) {
                this.listFood[i].string = foodItem.num;
            }
            
        }

        //make button
        this.btnMake.interactable = n.loverProxy.isEnough();

        facade.send(n.loverProxy.LOVER_UPDATE_ITEM);
    },

    onClickAdd: function() {
        r.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: n.loverProxy.shop[0],
            activityId: n.loverProxy.data.info.type
        });
        // n.shopProxy.openShopBuy(n.loverProxy.data.need);
    },

    onClickMerge: function() {
        this.mergeSpine.node.active = true;
        r.utils.showSpine(this.mergeSpine, "heka", false, function(){
            this.mergeSpine.node.active = false;
        }.bind(this));
        this.scheduleOnce(this._merge, 0.8);
    },

    _merge: function() {
        n.loverProxy.sendMerge();
    },

    onClickGift: function() {
        if(!n.loverProxy.friends || n.loverProxy.friends.length === 0) {
            r.alertUtil.alert18n("HAOYOU_NO_FRIEND");
            return;
        }
        r.utils.openPrefabView("lover/LoverGift");
    },

    onClickShangJiao: function() {
        r.utils.openPrefabView("lover/LoverShangJiao");
    },

    onClickOpenLiHe: function() {
        if (0 != n.bagProxy.getItemCount(n.loverProxy.LOVER_ITEM_LI_HE)) {
            var t = {
                id: n.loverProxy.LOVER_ITEM_LI_HE
            };
            r.utils.openPrefabView("bag/BagUse", !1, t);
        } else r.alertUtil.alertItemLimit(n.loverProxy.LOVER_ITEM_LI_HE);
    },

    onClickTab: function(t, e) {
        switch (e) {
            case "1":
                r.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    n.loverProxy.dhShop
                );
                break;
            case "2":
                r.utils.openPrefabView("lover/LoverReward");
                break;
            case "3":
                    r.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null,
                        {
                            type: n.limitActivityProxy.LOVER_TYPE
                        }
                    );
                    break;
            case "4":{
                var call = function(){
                    r.utils.openPrefabView("lover/LoverLeiJi");
                };  
                n.loverProxy.sendLeiji(call);
            }
                
                    break;
            default:
                break;
        }
    },

    onClickFood: function(t, e) {
        var id = parseInt(e);
        var t = localcache.getItem(localdb.table_item, id);
        r.utils.openPrefabView("ItemInfo", !1, t);
    },

    onClickReward: function(sender,customData){
        var index = parseInt(customData) + 1;

        if(sender.target._claim != null && !sender.target._claim){
            if(n.loverProxy.data != null){
                var t = n.loverProxy.data.score_rwd[index-1].rwd;
                t && r.utils.openPrefabView("lover/LoverRwdView", !1, t);
            }  
        }
        else{
            n.loverProxy.sendRwd(index,function(){
                n.loverProxy.sendOpenActivity();
            });
        }
    },
    
    onClickClose: function() {
        r.utils.closeView(this);
    },


});
