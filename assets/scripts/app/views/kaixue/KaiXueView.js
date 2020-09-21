var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("./KaiXueItem"),
    flower = require("./KaiXueFlowerItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblBall = null;
            e.items = [];
            e.flowers = [];
            e.lblTime = null;
            e.lblConsume = null;
            e.btnPlay = null;
            e.pointerNode = null;
            e.itemNode = null;
            e.consume = null;
            e.curIndex = 0;
            e.roundIndex = 0;
            e.btnRefresh = null;
            e.lblRefConsume = null;
            e.itemType = 1046;   //
            e.togAuto = null;
            e.btnUnAuto = null;
            e.lblPlayConsume = null;
            e.consume = 0;
            e.refreshConsume = 0;
            e.refreshConsumeUpdate = false; //刷新界面中，只在开始时刷新一次转盘道具
            return e;
        }
        e.prototype.onLoad = function () {
            //初始化
            this.onPlayInit();

            //打开界面更新数据
            facade.subscribe(n.kaixueProxy.KAIXUE_INFO_UPDATE, this.onDataUpDate, this);
            //界面数据报错
            facade.subscribe(n.kaixueProxy.KAIXUE_INFO_ERROR, this.onDataError, this);
            //
            facade.subscribe(n.bagProxy.UPDATE_BAG_ITEM, this.onItemUpdate, this);
            //转一圈回调
            facade.subscribe(n.kaixueProxy.KAIXUE_PLAY_BACK, this.onPlayUpdate, this);
            //转一圈报错
            facade.subscribe(n.kaixueProxy.KAIXUE_PLAY_ERROR, this.onPlayInit, this);
            //刷新界面
            facade.subscribe(n.kaixueProxy.KAIXUE_RESET_BACK, this.onDataRefresh, this);

            //打开兑换商城
            facade.subscribe(n.kaixueProxy.KAIXUE_EXCHANGE_BACK, this.onExchangeUpdate, this);

            n.kaixueProxy.normalGetInfo();
            n.shopProxy.sendList(!1);

            //n.shopProxy.sendList(!1);
            this.onItemUpdate();

            //
            this.btnUnAuto.node.active = false;
        };
        e.prototype.onPlay = function(){
            var i = 0;
        };
        e.prototype.onDataUpDate = function() {
            var e = n.kaixueProxy.data;
            if (e) {
                //刷新转盘
                this.updateZhuanPan(e.wood_rhinoes_rewards);

                //更新花瓣
                this.updatePetals(e.petals);

                //更新素金笺
                this.lblBall.string = n.bagProxy.getItemCount(this.itemType) + "";

                if(e.info.eTime <= i.timeUtil.second)
                {
                    //如果活动已结束
                    this.onTimeOut();
                    return;
                }
                //倒数计时
                this.updateCountDown(e.info.eTime);

                //更新刷新元宝数
                this.updateRefreshCoin();

                if(this.refreshConsumeUpdate == false)
                {
                    //更新转盘道具
                    this.onConsumeUpdata();
                    this.refreshConsumeUpdate = true;
                }
            }
        };
        e.prototype.onDataError = function(){
            //如果活动已结束
            this.onTimeOut();
        };
        e.prototype.onDataRefresh = function(){
            var e = n.kaixueProxy.data;
            if (e) {
                //倒数计时
                this.updateCountDown(e.info.eTime);

                //刷新转盘
                this.updateZhuanPan(e.wood_rhinoes_rewards);

                //更新刷新元宝数
                this.updateRefreshCoin();

                //更新花瓣
                this.updatePetals(e.petals);

                //更新转盘道具
                this.onConsumeUpdata();

                //
                this.lblBall.string = n.bagProxy.getItemCount(this.itemType) + "";
            }
        };
        //活动结束处理
        e.prototype.onTimeOut = function(){
            //刷新按钮
            this.lblRefConsume.node.active = false;
            this.btnRefresh.interactable = false;

            //倒数计时
            this.lblTime.string = i18n.t("ACTHD_OVERDUE");

            //抽奖按钮
            this.btnPlay.interactable = false;
        };
        //转盘报错
        e.prototype.onPlayInit = function(){
            this.togAuto.isChecked = false;
            this.onPlayBtnUpdate(false);
            this.roundIndex = 0;
            this.curIndex = 0;
        };
        //转盘返回
        e.prototype.onPlayUpdate = function(){
            var e = n.kaixueProxy.data;
            if(e){
                //更新转盘道具消耗
                this.onConsumeUpdata();

                //
                if (n.kaixueProxy.isTrun) {
                    var list = n.kaixueProxy.data.wood_rhinoes_rewards;
                    for(var index = 0; index < list.length; index++)
                    {
                        if(list[index].id == n.kaixueProxy.lastRwd)
                        {
                            this.curIndex = index;
                            break;
                        }
                    }
                    this.showEff(0.01);
                }
            }
        };
        //更新道具消耗
        e.prototype.onConsumeUpdata = function(){
            var e = n.kaixueProxy.data;
            if(e){
                this.consume = n.kaixueProxy.getPlayCoin(e.play_count + 1);
                if(this.consume > 0)
                {
                    this.lblPlayConsume.string = i18n.t("ZHONG_YUAN_XIAO_HAO", {
                        num: this.consume
                    })
                }
                else
                {
                    this.lblPlayConsume.string = i18n.t("ZHONG_YUAN_MIAN_FEI");
                }
            }
        };
        e.prototype.onItemLinQu = function(){
            //查找itemid
            for (var r = 0; r < this.items.length; r++) {
                if (this.items[r].data.id == this.curIndex) {
                    this.items[r].onItemLinQu();
                    break;
                }
            }
        };
        //更新花瓣
        e.prototype.updatePetals = function (petals) {
            var leng = this.flowers.length;
            var count = parseInt(petals / leng);
            var list = [];
            for (var index = 0; index < count; index++) {
                list.push(4);
            }

            if (petals % leng > 0) {
                var it = parseInt(petals % leng);
                list.push(it);
            }

            for(var index = 0; index < leng; index++)
            {
                if((index + 1) >= list.length)
                {
                    list.push(0);
                }

                this.flowers[index].data = list[index];
            }
        };
        //
        e.prototype.updateRefreshCoin = function () {
            var info = n.kaixueProxy.data;
            this.refreshConsume = n.kaixueProxy.getRefreshCoin(info.daily_reset_count + 1);
            if (this.refreshConsume >= 0) {
                //
                this.lblRefConsume.string = i18n.t("ZHONG_YUAN_XIAO_HAO", {
                    num: this.refreshConsume
                });
                this.lblRefConsume.node.active = true;
                this.btnRefresh.interactable = true;
            }
            else {
                this.lblRefConsume.node.active = false;
                //
                this.btnRefresh.interactable = false;
            }
        };

        //
        e.prototype.updateCountDown = function (eTime) {
            var endTime = 0;
            if (!i.stringUtil.isBlank(eTime)) {
                endTime = eTime;
            }
            else {
                if (!i.stringUtil.isBlank(n.kaixueProxy.data)) {
                    endTime = n.kaixueProxy.data.info.eTime;
                }
            };

            l.uiUtils.countDown(endTime, this.lblTime, function () {
                i.timeUtil.second >= endTime &&
                    (this.lblTime.string = i18n.t("ACTHD_OVERDUE"));
            });
        };
        //更新转盘
        e.prototype.updateZhuanPan = function (woodList) {
            if (i.stringUtil.isBlank(woodList)) {
                cc.log("woodList is null");
                return;
            }

            for (var r = 0; r < this.items.length; r++) {
                if (r < woodList.length) {
                    this.items[r].data = woodList[r];
                }
            }
        };
        //
        e.prototype.onReset = function () {

        };

        //eff
        e.prototype.showEff = function(t) {
            this.unscheduleAllCallbacks();
            this.schedule(this.showSelect, t);
        };
        e.prototype.showSelect = function() {
            for (var t = this.roundIndex % 16, e = 0; e < this.items.length; e++)
            {
                this.items[e].select = t == e;
            }
            this.roundIndex++;
            

            if (this.roundIndex >= 16 && this.roundIndex < 32)
            {
                this.showEff(0.03);
            }
            else if (this.roundIndex >= 32 && this.roundIndex < 48)
            {
                this.showEff(0.03 + (this.roundIndex - 32) / 320);
            }
            else if (
                this.roundIndex >= 48 + this.curIndex &&
                this.roundIndex < 160
            ) {
                this.unscheduleAllCallbacks();
                this.onShowSelctEnd();
            }
        };
        //当转盘结束的处理
        e.prototype.onShowSelctEnd = function(){
            //刷新花瓣
            var e = n.kaixueProxy.data;
            if(e){
                this.updatePetals(e.petals);
            };
            
            n.timeProxy.floatReward();
            i.alertUtil.alert(i18n.t("CLOTHE_PVE_SCORE_ADD", {d: e.lastScore}));

            //更新转盘
            this.updateZhuanPan(e.wood_rhinoes_rewards);

            //重置数据
            this.onPlayBtnUpdate(false);
            this.roundIndex = 0;
            this.curIndex = 0;


            if(this.togAuto.isChecked == true)
            {
                this.scheduleOnce(this.onClickPlay, 1.0);
            }
        };
        //更新转盘道具数量
        e.prototype.onItemUpdate = function() {
            var t = n.bagProxy.getItemCount(this.itemType);
            this.lblBall.string = t + "";
        };
        //更新抽奖按钮状态
        e.prototype.onPlayBtnUpdate = function(trun){
            n.kaixueProxy.isTrun = trun;
            this.btnPlay.interactable = !trun;
        };
        //更新自动遮罩
        e.prototype.onPlayAutoUpdate = function(){
            this.btnUnAuto.node.active = this.togAuto.isChecked;
            n.kaixueProxy.onAutoPlay = this.togAuto.isChecked;
        }
        e.prototype.onExchangeUpdate = function(){
            i.utils.openPrefabView(
                "ActivityShopView",
                null,
                n.kaixueProxy.dhShop
            );
        };
        e.prototype.onClickRefresh = function () {
            var self = this;
            i.utils.showConfirmItem(
                i18n.t("STARTING_SCHOOL_BUY", {
                    num: self.refreshConsume
                }),
                1,
                e,
                function() {
                    n.kaixueProxy.sendReset();
                },
                "STARTING_SCHOOL_BUY"
            );
            
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickPlay = function() {
            if (!n.kaixueProxy.isTrun) {
                if ( n.bagProxy.getItemCount(this.itemType) < this.consume.cons ) {
                    i.alertUtil.alertItemLimit(this.itemType);
                    this.onClickAdd();
                } else {
                    n.kaixueProxy.sendPlay();
                    this.onPlayBtnUpdate(true);
                    this.onPlayAutoUpdate();
                }
            }
        };
        e.prototype.onClickAdd = function() {
            i.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: n.kaixueProxy.data.shop[0],
                activityId: n.kaixueProxy.data.info.type
            });
            n.shopProxy.openShopBuy(n.kaixueProxy.data.shop[0].need);
        };
        e.prototype.onClickTab = function(t, e) {
            switch (e) {
                case "1":
                        i.utils.openPrefabView(
                            "ActivityShopView",
                            null,
                            n.kaixueProxy.exchange
                        );
                    break;
                case "2":
                    i.utils.openPrefabView(
                        "limitactivity/LimitActivityView",
                        null,
                        {
                            type: n.limitActivityProxy.KAIXUE_TYPE
                        }
                    );
                    break;
                case "4":
                    i.utils.openPrefabView("kaixue/KaiXueRankRwd");
            }
        };
        e.prototype.onClickAuto = function(){
            //this.btnUnAuto.node.active = true;
        };
        e.prototype.onClickUnAuto = function(){
            this.togAuto.isChecked = false;
            this.btnUnAuto.node.active = false;
        };
        e.prototype.onDestory = function(){
            n.kaixueProxy.onAutoPlay = false;
        };
        __decorate([c(cc.Label)], e.prototype, "lblBall", void 0);
        __decorate([c([r.default])], e.prototype, "items", void 0);
        __decorate([c([flower.default])], e.prototype, "flowers", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblConsume", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblPlayConsume", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnPlay", void 0);
        __decorate([c(cc.Node)], e.prototype, "pointerNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "itemNode", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnRefresh", void 0);      //
        __decorate([c(cc.Label)], e.prototype, "lblRefConsume", void 0);    //
        __decorate([c(cc.Toggle)], e.prototype, "togAuto", void 0);    //
        __decorate([c(cc.Button)], e.prototype, "btnUnAuto", void 0);    //
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
