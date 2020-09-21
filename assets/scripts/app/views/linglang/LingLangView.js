/**
 * 琳琅坊
 */
const Utils = require("../../utils/Utils");
const UIUtils = require("../../utils/UIUtils");
const List = require("../../component/List");
const Initializer = require("../../Initializer");
const ItemSlotUI = require("../../views/item/ItemSlotUI");
const LingLangProgressItem = require("./LingLangProgressItem");
cc.Class({
    extends: cc.Component,

    properties: {
        lblTime : cc.Label,
        lblKuCun : cc.Label,
        lblBounght : cc.Label,
        rwdList : List.default,
        recordList : List.default,
        scrollview : cc.ScrollView,
        bigRwd : ItemSlotUI.default,
        progressItemArray : [LingLangProgressItem],
        progressRwd : cc.ProgressBar,
        rwdPoolNode : cc.Node,
        rwdPoolList : List.default,
        rwdPoolScroll : cc.ScrollView,
        lblBuyCount : cc.Label,
        lblBuy : cc.Label,
        nodeBuyTip : cc.Node,
        lblCurrentIndexCount : cc.Label,
        btnBuy : cc.Button,
        lblBuyIndex : cc.Label,
        lblStatus : cc.Label,
        spine : sp.Skeleton,
    },


    onLoad() {
        facade.subscribe(Initializer.lingLangProxy.LINGLANG_DATA_UPDATE, this.updateData, this);
        facade.subscribe(Initializer.lingLangProxy.LINGLANG_RECORD_UPDATE, this.onRecord, this);
        facade.subscribe(Initializer.lingLangProxy.LINGLANG_GUOQIGOUMAI, this.onGuoQiGouMai, this);
        facade.subscribe(Initializer.lingLangProxy.LINGLANG_ONHTINFO, this.onUpdateCurrentBuy, this);
        //Initializer.lingLangProxy.sendOpenActivity();
        this.spine.setAnimation(0, "idle", true);
        this.updateData();
        this.onRecord();
    },

    updateData : function() {
        if(Initializer.lingLangProxy.base == null || Initializer.lingLangProxy.data == null) return;
        this.lblKuCun.string = i18n.t("LINGLANG_KUCUN", {num : Initializer.lingLangProxy.data.total - Initializer.lingLangProxy.data.buy, total : Initializer.lingLangProxy.data.total});
        this.lblBounght.string = i18n.t("LINGLANG_BOUGHT", {num : Initializer.lingLangProxy.data.curr_buy});
        this.bigRwd.data = Initializer.lingLangProxy.data.rwd;
        this.rwdList.repeatX = Initializer.lingLangProxy.base.buy_rwd.length;
        this.rwdList.data = Initializer.lingLangProxy.base.buy_rwd;
        this.progressRwd.progress = Initializer.lingLangProxy.data.curr_buy / Initializer.lingLangProxy.base.max_copies;
        //初始化份数
        for(var i = 0; i < this.progressItemArray.length; i ++) {
            var item = this.progressItemArray[i];
            var itemData = Initializer.lingLangProxy.base.copies_rwd[i];
            if(itemData == null) {
                item.node.active = false;
            }else {
                var progressWidth = this.progressRwd.node.width;
                item.node.x = progressWidth * (itemData.copies / Initializer.lingLangProxy.base.max_copies);
                item.init(itemData);
            }
        }
        this.lblBuyIndex.string = i18n.t("LINGLANG_DANGQIANQI", {num : Initializer.lingLangProxy.data.periods_num});
        UIUtils.uiUtils.countDown(Initializer.lingLangProxy.base.info.eTime, this.lblTime, ()=> {
            this.lblTime.string = i18n.t("ACTHD_OVERDUE");
        });

        UIUtils.uiUtils.countDown(Initializer.lingLangProxy.data.end_time, this.lblCurrentIndexCount, ()=> {
            this.lblCurrentIndexCount.string = "00:00:00";
        });
  
        //判定按键状态
        if(Utils.timeUtil.second > Initializer.lingLangProxy.data.end_time - Initializer.lingLangProxy.base.interval && Utils.timeUtil.second <= Initializer.lingLangProxy.data.end_time) {
            this.btnBuy.interactable = true;
            this.lblBuy.node.active = true;
            this.lblBuyCount.node.active = false;
            this.nodeBuyTip.active = false;
        }else if(Initializer.lingLangProxy.data.max_times - Initializer.lingLangProxy.data.buy_times <= 0 && 
            Utils.timeUtil.second < Initializer.lingLangProxy.base.lt_time) {
                //保护阶段并且用完了可购买的次数
                this.btnBuy.interactable = false;
                this.lblBuy.node.active = false;
                this.lblBuyCount.node.active = true;
                this.nodeBuyTip.active = true;
                UIUtils.uiUtils.countDown(Initializer.lingLangProxy.base.lt_time, this.lblBuyCount, ()=> {
                    //this.lblCurrentIndexCount.string = "00:00:00";
                    this.btnBuy.interactable = true;
                    //this.lblBuyCount.string = i18n.t("SHOP_BUY_TIP");
                    this.lblBuy.node.active = true;
                    this.lblBuyCount.node.active = false;
                    this.nodeBuyTip.active = false;
                    this.onGuoQiGouMai();
                });
            }else {
                this.btnBuy.interactable = true;
                //this.lblBuyCount.string = i18n.t("SHOP_BUY_TIP");
                this.lblBuy.node.active = true;
                this.lblBuyCount.node.active = false;
                this.nodeBuyTip.active = false;
            }

        if(this.refresh == null && Initializer.lingLangProxy.data.state != 2 && Utils.timeUtil.second < Initializer.lingLangProxy.base.info.eTime) {
            //开始倒计时
            this.refresh = setInterval(this.countToRefresh.bind(this), 1000);
        }

        if(Utils.timeUtil.second > Initializer.lingLangProxy.data.end_time - Initializer.lingLangProxy.base.interval) {
            //发奖
            this.lblStatus.string = i18n.t("LINGLANG_ZHENGZAIFAJIANG");
        }else {
            this.lblStatus.string = i18n.t("LINGLANG_QINGQIANGGOU");
        }
    },

    onUpdateCurrentBuy : function() {
        if(Initializer.lingLangProxy.base == null || Initializer.lingLangProxy.data == null) return;
        this.lblKuCun.string = i18n.t("LINGLANG_KUCUN", {num : Initializer.lingLangProxy.data.total - Initializer.lingLangProxy.data.buy, total : Initializer.lingLangProxy.data.total});
    },

    onClickClose : function() {
        if(this.refresh != null) {
            clearInterval(this.refresh);
            this.refresh = null;
        }
        Utils.utils.closeView(this);
    },

    onClickRank : function() {
        Initializer.lingLangProxy.sendRank((success)=> {
            if(success) {
                Utils.utils.openPrefabView("linglang/LingLangReward");
            }
        })
    },

    onClickRechageRecord : function() {
        Initializer.lingLangProxy.sendRechargeRecord((success)=> {
            if(success) {
                Utils.utils.openPrefabView("linglang/LingLangRechargeRecordView");
            }
        })
    },

    onClickRwdPool : function() {
        if (Initializer.lingLangProxy.base.jackpot) {
            this.rwdPoolNode.active = true;
            this.rwdPoolList.data = Initializer.lingLangProxy.base.jackpot;
        }
    },
    
    onClickRwdRecord : function() {
        Initializer.lingLangProxy.sendWinPrize((success)=> {
            if(success) {
                Utils.utils.openPrefabView("linglang/LingLangKaiJiangRecordView");
            }
        })
    },

    onGuoQiGouMai : function() {
        Initializer.lingLangProxy.sendOpenActivity();
    },

    onClickBuy : function() {
        if(Utils.timeUtil.second > Initializer.lingLangProxy.base.info.eTime) {
            Utils.alertUtil.alert18n("ACTHD_OVERDUE");
            return;
        }
        var limit = Initializer.lingLangProxy.data.max_times - Initializer.lingLangProxy.data.buy_times;
        if(Utils.timeUtil.second > Initializer.lingLangProxy.data.end_time) {
            Utils.alertUtil.alert18n("LINGLANG_DANGQIJIESHU");
            //Utils.utils.closeView(this);
            return;
        } else if(Utils.timeUtil.second > Initializer.lingLangProxy.data.end_time - Initializer.lingLangProxy.base.interval) {
            //发奖阶段
            Utils.alertUtil.alert18n("LINGLANG_FAJIANGJIEDUAN");
            return;
        } else if(Utils.timeUtil.second > Initializer.lingLangProxy.base.lt_time) {
            //过了保护阶段
            limit = Initializer.lingLangProxy.data.total - Initializer.lingLangProxy.data.buy;
            if(limit <= 0) {
                Utils.alertUtil.alert18n("LINGLANG_WEIBAOHUXIANGOU");
                return;
            }
        }else {
            //保护阶段
            limit = Initializer.lingLangProxy.data.max_times - Initializer.lingLangProxy.data.buy_times;
            if(limit > Initializer.lingLangProxy.data.total - Initializer.lingLangProxy.data.buy) {
                limit = Initializer.lingLangProxy.data.total - Initializer.lingLangProxy.data.buy;
            }
            if(limit <= 0) {
                Utils.alertUtil.alert18n("LINGLANG_BAOHUXIANGOU");
                return;
            }
        }
        
        Utils.utils.openPrefabView("linglang/LingLangSpecialBuy", null, {
            data: {
                need : Initializer.lingLangProxy.base.need,
                limit : limit,
            },
            buyOnce : limit,
            explain : i18n.t("LINGLANG_GOUMAITIP"),
            cb : ()=> {
                this.spine.clearTracks();
                this.spine.setAnimation(1, "animation", false);
                this.spine.setCompleteListener(()=> {
                    this.spine.setCompleteListener(null);
                    this.spine.setAnimation(0, "idle", true);
                    Initializer.timeProxy.floatReward();
                })
            }
        });

        //Initializer.lingLangProxy.sendBuy();
    },

    countToRefresh : function() {
        if(Utils.timeUtil.second > Initializer.lingLangProxy.data.end_time) {
            clearInterval(this.refresh);
            this.refresh = null;
            cc.log("====== run over end_time");
            Initializer.lingLangProxy.sendOpenActivity();
            return;
        }
    },


    onRecord : function() {
        if(Initializer.lingLangProxy.records == null) return;
        this.recordList.data = Initializer.lingLangProxy.records;
        this.scrollview.scrollToBottom();
    },

    onClickCloseWin : function () {
        this.rwdPoolNode.active = false;
        this.rwdPoolScroll.scrollToTop();
    },
});
