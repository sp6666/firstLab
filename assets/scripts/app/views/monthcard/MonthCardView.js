var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/ApiUtils"),
    r = require("../../Config"),
    a = require("../../component/List"),
    s = require("../../component/RoleSpine"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnMonth = null;
            e.btnYear = null;
            e.ylqMonth = null;
            e.ylqYear = null;
            e.buyMonth = null;
            e.buyYear = null;
            e.lblBuyYk = null;
            e.lblBuyNk = null;
            e.dailyCash = null;
            e.buyGetCash = null;
            e.yeadList = null;
            e.monList = null;
            e.nDailyCash = null;
            e.nBuyGetCash = null;
            e.lblYeadLess = null;
            e.lblMonLess = null;
            e.roleSpine = null;
            e.curIndex = 1;
            e.ykData = null;
            e.nkData = null;
            e.lblWeekLess = null;
            e.weekList = null;
            e.getWeek = null;
            e.ylqWeek = null;
            e.buyWeek = null;
            e.specialNode = null;
            e.weekSpecialGet = null;
            e.weekSpecialylq = null;
            e.weekDaily = null;
            e.weekGain = null;
            e.weekBuyCount = null;
            e.lblBuyZk = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("MOON_CARD_UPDATE", this.onDataUpdate, this);
            facade.subscribe(n.welfareProxy.UPDATE_CHANGE_WEEKS, this.updateWeekItemm, this);
            facade.subscribe(n.purchaseProxy.PURCHASE_DATA_UPDATA,this.onZk,this);
            // n.welfareProxy.sendOrderBack();
            // n.purchaseProxy.sendOpenPrince();
            // 增加周卡请求协议的延迟，因为服务器不允许客户端连续快速请求
            
            this.scheduleOnce(()=>{
                n.welfareProxy.sendOrderBack();
            },0.1);
            for (var t = 0; t < n.welfareProxy.rshop.length; t++) {
                2 == n.welfareProxy.rshop[t].type ?
                    (this.ykData = n.welfareProxy.rshop[t]) : 3 == n.welfareProxy.rshop[t].type ?
                        (this.nkData = n.welfareProxy.rshop[t]) : "";
            }
            this.lblBuyYk.string = i18n.t("MONTH_CARD_PRICE", {
                value: this.ykData.rmb
            });
            this.lblBuyNk.string = i18n.t("MONTH_CARD_PRICE", {
                value: this.nkData.rmb
            });
            this.lblBuyZk.string = i18n.t("MONTH_CARD_PRICE", {
                value: ""
            })
            this.onClickTab();
            this.showCloth();
            // this.buyWeek.active = false;
            n.purchaseProxy.sendOpenPrince();
        };
        e.prototype.showCloth = function () {
            var t = n.playerProxy.userData,
                e = {};
            e.head = i.utils.getParamInt("clotheyear_head");
            e.ear = i.utils.getParamInt("clotheyear_ear");
            e.body = i.utils.getParamInt("clotheyear_body");
            e.animal = 0;
            e.effect = 0;
            this.roleSpine.setClothes(t.sex, t.job, t.level, e);
        };

        e.prototype.onZk =function(){
            var weekData;
            for (var e = 0; e < n.purchaseProxy.gift.length; e++) {
                null == n.purchaseProxy.gift[e].type && n.purchaseProxy.gift[e].id == 98 && (
                    weekData = n.purchaseProxy.gift[e]);
            }
            if (weekData) {//保护
                var t =weekData;    
                this.lblBuyZk.string = i18n.t("MONTH_CARD_PRICE", {
                    value: t.sign+t.present
                });
                // this.buyWeek.active = true;
            }else{
                console.log("直冲配置信息里没有配置");
            }
        }
        e.prototype.onClickTab = function () {
            var t,
                e,
                o = n.monthCardProxy.getCardData(1);
            this.buyMonth.active = null == o || 0 == o.type;
            this.btnMonth.active = o && 1 == o.type;
            this.ylqMonth.active = o && 2 == o.type;
            t = i.utils.getParamInt("mooncard_everyday");
            e = i.utils.getParamInt("mooncard_gain");
            this.dailyCash.string = t + "";
            this.buyGetCash.string = e + "";
            this.lblMonLess.string = o ?
                i18n.t("MONTH_CARD_LESS_DAY", {
                    num: o.days
                }) :
                "";
            var l,
                r,
                a = n.monthCardProxy.getCardData(2);
            this.buyYear.active = null == a || 0 == a.type;
            this.btnYear.active = a && 1 == a.type;
            this.ylqYear.active = a && 2 == a.type;
            l = i.utils.getParamInt("yearcard_everyday");
            r = i.utils.getParamInt("yearcard_gain");
            this.nDailyCash.string = l + "";
            this.nBuyGetCash.string = r + "";
            this.lblYeadLess.string = a ?
                i18n.t("MONTH_CARD_LESS_DAY", {
                    num: a.days
                }) :
                "";
            var s = localcache.getItem(localdb.table_yuekaReward, 1);
            if (s) {
                for (var c = null, _ = 0; _ < s.rwd.length; _++) {
                    if (
                        parseInt(s.rwd[_].moon) ==
                        (o && o.moon && 0 != o.moon ?
                            o.moon :
                            i.timeUtil.getCurMonth())
                    ) {
                        c = s.rwd[_];
                        break;
                    }
                }
                var d = [];
                for (_ = 0; _ < s.rwdday.length; _++) d.push(s.rwdday[_]);
                c && !n.playerProxy.isHaveBlank(c.id) && d.push(c);
                this.monList.data = d;
                // this.monList.node.x = -141 - this.monList.node.width / 2;
            }
            var u = localcache.getItem(localdb.table_yuekaReward, 2);
            if (u) {
                this.yeadList.data = u.rwdday;
                // this.yeadList.node.x = 155 - this.yeadList.node.width / 2;
            }


            //add by Ocean
            var weekBuyCount;
            var weekSdata = n.monthCardProxy.getCardData(3);
            weekBuyCount = weekSdata && weekSdata.buycount || 0;
            this.getWeek.active = weekSdata && weekSdata.type == 1;
            this.ylqWeek.active = weekSdata && weekSdata.type == 2;
            this.buyWeek.active = weekSdata == null || weekSdata.days <= 0;
            this.weekDaily.string = i.utils.getParamInt("weekcard_everyday");
            this.weekGain.string = i.utils.getParamInt("weekcard_gain");
            this.lblWeekLess.string = weekSdata ? weekSdata.days > 0 ? i18n.t("MONTH_CARD_LESS_DAY", { num: weekSdata.days }) : "" : "";
            this.specialNode.active = weekSdata ? !weekSdata.gotrwd : true//特殊奖励节点是否存在
            this.weekSpecialGet.interactable = weekSdata ? weekSdata.buycount >= 5 && !weekSdata.gotrwd : false;//可领取状态
            this.weekSpecialGet.node.active = weekSdata ? weekSdata.gotrwd ? false : true : true;
            //cfg 数据
            var itemData = localcache.getItem(localdb.table_yuekaReward, 3);
            this.weekList.data = itemData.rwdday;
            this.weekBuyCount.string = weekBuyCount + "/" + itemData.rwd[0].buycount;     //购买次数
        };
        e.prototype.onClickGetReward = function (t, e) {
            n.monthCardProxy.sendGetMoonCard(parseInt(e));
        };
        e.prototype.onBuyMonthCard = function () {
            this.ykData &&
                l.apiUtils.recharge(
                    n.playerProxy.userData.uid,
                    r.Config.serId,
                    this.ykData.diamond,
                    this.ykData.ormb,
                    this.ykData.diamond + n.playerProxy.getKindIdName(1, 1),
                    0
                );
        };
        e.prototype.onBuyYearCard = function () {
            this.nkData &&
                l.apiUtils.recharge(
                    n.playerProxy.userData.uid,
                    r.Config.serId,
                    this.nkData.diamond,
                    this.nkData.ormb,
                    this.nkData.diamond + n.playerProxy.getKindIdName(1, 1),
                    0
                );
        };
        //活动走直冲
        e.prototype.onBuyWeekCard = function () {
            // this.zkData&&
            //     l.apiUtils.recharge(
            //         n.playerProxy.userData.uid,
            //         r.Config.serId,
            //         this.zkData.diamond,
            //         this.zkData.ormb,
            //         this.zkData.diamond + n.playerProxy.getKindIdName(1,1),
            //         0
            //     );
            var weekData;
            for (var e = 0; e < n.purchaseProxy.gift.length; e++) {
                null == n.purchaseProxy.gift[e].type && n.purchaseProxy.gift[e].id == 98 && (
                    weekData = n.purchaseProxy.gift[e]);
            }
            if (weekData) {//保护
                var _ = 10 * weekData.grade + 1e6 + 1e4 * weekData.id;
                l.apiUtils.recharge(
                    n.playerProxy.userData.uid,
                    r.Config.serId,
                    _,
                    weekData.grade,
                    i18n.t("CHAOZHI_LIBAO_TIP"),
                    0
                );
            }else{
                console.log("直冲配置信息里没有配置");
            }

        };
        e.prototype.onSpecialItems = function () {
            var item = n.monthCardProxy.getCardData(3);
            if (item) {
                var count = item.buycount;
                var itemData = localcache.getItem(localdb.table_yuekaReward, 3);
                !item.gotrwd && count >= itemData.rwd[0].buycount && n.welfareProxy.sendWeekItems(0);
            }
        }
        e.prototype.updateWeekItemm = function () {
            this.specialNode.active = true;
            this.weekSpecialGet.active = false;
        }
        e.prototype.onDataUpdate = function () {
            this.onClickTab();
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
        };
        __decorate([d(cc.Node)], e.prototype, "btnMonth", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnYear", void 0);
        __decorate([d(cc.Node)], e.prototype, "ylqMonth", void 0);
        __decorate([d(cc.Node)], e.prototype, "ylqYear", void 0);
        __decorate([d(cc.Node)], e.prototype, "buyMonth", void 0);
        __decorate([d(cc.Node)], e.prototype, "buyYear", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblBuyYk", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblBuyNk", void 0);
        __decorate([d(cc.Label)], e.prototype, "dailyCash", void 0);
        __decorate([d(cc.Label)], e.prototype, "buyGetCash", void 0);
        __decorate([d(a.default)], e.prototype, "yeadList", void 0);
        __decorate([d(a.default)], e.prototype, "monList", void 0);
        __decorate([d(cc.Label)], e.prototype, "nDailyCash", void 0);
        __decorate([d(cc.Label)], e.prototype, "nBuyGetCash", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblYeadLess", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblMonLess", void 0);
        __decorate([d(s.default)], e.prototype, "roleSpine", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblWeekLess", void 0);//周卡剩余时间
        __decorate([d(a.default)], e.prototype, "weekList", void 0);//周卡奖励列表
        __decorate([d(cc.Node)], e.prototype, "getWeek", void 0);//领取当日奖励
        __decorate([d(cc.Node)], e.prototype, "ylqWeek", void 0);//已领取 当日奖励
        __decorate([d(cc.Node)], e.prototype, "buyWeek", void 0);//周卡 购买
        __decorate([d(cc.Node)], e.prototype, "specialNode", void 0);//整个节点 特殊领取
        __decorate([d(cc.Button)], e.prototype, "weekSpecialGet", void 0);//周卡特殊物品领取
        __decorate([d(cc.Node)], e.prototype, "weekSpecialylq", void 0);//周卡特殊物品已领取
        __decorate([d(cc.Label)], e.prototype, "weekDaily", void 0); //每天
        __decorate([d(cc.Label)], e.prototype, "weekGain", void 0);//购买获得
        __decorate([d(cc.Label)], e.prototype, "weekBuyCount", void 0);//购买次数
        __decorate([d(cc.Label)], e.prototype, "lblBuyZk", void 0);//   周卡文字显示
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;