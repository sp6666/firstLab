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

    onLoad () {
        facade.subscribe(n.mingyueProxy.MINGYUE_DATA_UPDATE, this.onDataUpdate, this);  //获得数据
        facade.subscribe(n.mingyueProxy.MINGYUE_BASE_UPDATE, this.onDataUpdate, this);
        
        facade.subscribe(n.mingyueProxy.MINGYUE_DATA_RECORDS,this.onRecords, this);
        facade.subscribe(n.bagProxy.UPDATE_BAG_ITEM,this.onItemUpdate,this);

        this.onItemUpdate();
        this.onDataUpdate();

        n.mingyueProxy.sendOpenActivity();
    },

    start () {

    },

    // update (dt) {},

    onDataUpdate: function() {
        if (null != n.mingyueProxy.data) {
            var t = this;
            //倒计时
            l.uiUtils.countDown(
                n.mingyueProxy.data.info.eTime,
                this.lblTime,
                function() {
                    t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                }
            );

            //progress reward 
            if(null != n.mingyueProxy.base){
                var score = n.mingyueProxy.base.score;
                var score_rwd_got = n.mingyueProxy.base.score_rwd_got;
                var score_rwd = n.mingyueProxy.data.score_rwd;
                var scoreMax = 0;

                var rewardBtnIndex = 0;
                for(var key in score_rwd){
                    var targetScore = parseInt(key);//score_rwd[key];
                    if(targetScore > scoreMax) scoreMax = targetScore;

                    var isClaimed = false;
                    if(score_rwd_got && score_rwd_got.hasOwnProperty && score_rwd_got.hasOwnProperty(rewardBtnIndex + 1)){
                    // if(score_rwd_got && !(score_rwd_got instanceof Array) && score_rwd_got.hasOwnProperty(rewardBtnIndex)){
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
                    }
                    else{
                        //未领取
                        if(score >= targetScore){
                            //显示可领取
                            rewardBtn.children[2].active = true;
                            rewardBtn._claim = true;
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
                for(var key in score_rwd){
                    var targetScore = parseInt(key);//score_rwd[key];
                    var rewardBtn = this.listRewardBtn[rewardBtnIndex]
                    rewardBtn.x = this.pbReward.node.width * targetScore /scoreMax;

                    rewardBtnIndex++;
                }
            }
        }
    },

    onRecords: function() {
        if( n.mingyueProxy.records != null){
            this.records.data = n.mingyueProxy.records;
            this.scroll.scrollToBottom();
        }
    },

    onItemUpdate: function() {
        var t = n.bagProxy.getItemCount(n.mingyueProxy.MINGYUE_ITEM_LI_HE);
        // this._oldNum > t && n.mingyueProxy.sendOpenActivity();
        this.lblNum.string = t + "";
        // this._oldNum = t;

        this.lblBall.string = t + "";
        // if (n.mingyueProxy.data) {
        //     var e = n.bagProxy.getItemCount(n.mingyueProxy.data.need);
        //     // this.tipNode.active = 0 == e;
        //     this.lblBall.string = e + "";
        // }

        //道具列表
        n.mingyueProxy.foodList = [];
        var foodList = localcache.getList(localdb.table_mingyue);
        for(var i = 0;i< foodList.length;++i){
            var foodItem = foodList[i];
            foodItem.num = n.bagProxy.getItemCount(foodItem.id);
            foodItem.index = i;
            n.mingyueProxy.foodList.push(foodItem);

            //更新显示
            this.listFood[i].string = foodItem.num;
        }

        //make button
        this.btnMake.interactable = n.mingyueProxy.isEnough();

        facade.send(n.mingyueProxy.MINGYUE_UPDATE_ITEM);
    },

    onClickAdd: function() {
        r.utils.openPrefabView("ActivitySpecialBuy", null, {
            data: n.mingyueProxy.shop[0],
            activityId: n.mingyueProxy.data.info.type
        });
        // n.shopProxy.openShopBuy(n.mingyueProxy.data.need);
    },

    onClickMerge: function() {
        this.mergeSpine.node.active = true;
        r.utils.showSpine(this.mergeSpine, "animation", false, function(){
            this.mergeSpine.node.active = false;
        }.bind(this));
        this.scheduleOnce(this._merge, 0.8);
    },

    _merge: function() {
        n.mingyueProxy.sendMerge();
    },

    onClickGift: function() {
        r.utils.openPrefabView("mingyue/MingYueGift");
    },

    onClickShangJiao: function() {
        // r.utils.openPrefabView("mingyue/MingYueDuiHuan");
        r.utils.openPrefabView("mingyue/MingYueShangJiao");
    },

    onClickOpenLiHe: function() {
        if (0 != n.bagProxy.getItemCount(n.mingyueProxy.MINGYUE_ITEM_LI_HE)) {
            var t = {
                id: n.mingyueProxy.MINGYUE_ITEM_LI_HE
            };
            r.utils.openPrefabView("bag/BagUse", !1, t);
        } else r.alertUtil.alertItemLimit(n.mingyueProxy.MINGYUE_ITEM_LI_HE);
    },

    onClickTab: function(t, e) {
        switch (e) {
            case "1":
                r.utils.openPrefabView(
                    "ActivityShopView",
                    null,
                    n.mingyueProxy.dhShop
                );
                break;
            case "2":
                r.utils.openPrefabView("mingyue/MingYueReward");
                break;
            case "3":
                    r.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null,
                        {
                            type: n.limitActivityProxy.MINGYUE_TYPE
                        }
                    );
                    break;
            default:
                break;
        }
    },

    onClickFood: function(t, e) {
        var index = parseInt(e);
        var item = n.mingyueProxy.foodList[index];
        var t = localcache.getItem(localdb.table_item, item.id);
        r.utils.openPrefabView("ItemInfo", !1, t);
    },

    onClickReward: function(sender,customData){
        var index = parseInt(customData) + 1;

        if(sender.target._claim != null && !sender.target._claim){
            if(n.mingyueProxy.data != null){
                var score_rwd = n.mingyueProxy.data.score_rwd;
                var rwdIndex = 1;
                var t = null;
                for(var key in score_rwd){
                    if(index == rwdIndex){
                        t = score_rwd[key];
                        break;
                    }
                    
                    rwdIndex++;
                }
                t && r.utils.openPrefabView("mingyue/MingYueRwdView", !1, t);
            }  
        }
        else{
            n.mingyueProxy.sendRwd(index,function(){
                n.mingyueProxy.sendOpenActivity();
            });
        }
    },
    
    onClickClose: function() {
        r.utils.closeView(this);
    },
});
