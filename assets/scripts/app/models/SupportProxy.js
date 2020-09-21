var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function() {
        function t() {
            this.cfg = null;
            this.yyShop = null;
            this.changeShop = null;
            this.bag = null;
            this.small_list = null;
            this.big_list = null;
            this.totalList = null;
            this.myRid = null;
            this.record = null;
            this.myChangeScore = 0;
            this.myGongXian = 0;
            this.rewardType = 0;
            this.winId = 0;
            this.result = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.yyhuodong.shop, this.onShop, this);
            JsonHttp.subscribe(
                proto_sc.yyhuodong.exchange,
                this.onExchange,
                this
            );
            JsonHttp.subscribe(proto_sc.yyhuodong.bag, this.onBag, this);
            JsonHttp.subscribe(
                proto_sc.yyhuodong.small_list,
                this.onSmallList,
                this
            );
            JsonHttp.subscribe(
                proto_sc.yyhuodong.big_list,
                this.onBigList,
                this
            );
            JsonHttp.subscribe(
                proto_sc.yyhuodong.TotalRank_list,
                this.onTotalRankList,
                this
            );
            JsonHttp.subscribe(proto_sc.yyhuodong.myYyRid, this.onMyRid, this);
            JsonHttp.subscribe(proto_sc.yyhuodong.cfg, this.onCfg, this);
            JsonHttp.subscribe(
                proto_sc.yyhuodong.records,
                this.onYyRecord,
                this
            );
            JsonHttp.subscribe(
                proto_sc.yyhuodong.score,
                this.onCHangeScore,
                this
            );
            JsonHttp.subscribe(
                proto_sc.yyhuodong.contribution,
                this.onGongXianScore,
                this
            );
            JsonHttp.subscribe(
                proto_sc.yyhuodong.VictoryOrDefeat,
                this.onResult,
                this
            );
        };
        t.prototype.clearData = function() {
            this.cfg = null;
            this.yyShop = null;
            this.changeShop = null;
            this.bag = null;
            this.small_list = null;
            this.big_list = null;
            this.totalList = null;
            this.myRid = null;
            this.record = null;
            this.myChangeScore = 0;
            this.myGongXian = 0;
            this.rewardType = 0;
            this.winId = 0;
            this.result = null;
        };
        t.prototype.onShop = function(t) {
            this.yyShop = t;
            facade.send("SUPPORT_BUY_SHOP_UPDATE");
        };
        t.prototype.onExchange = function(t) {
            this.changeShop = t;
            facade.send("SUPPORT_CHANGE_SHOP_UPDATE");
        };
        t.prototype.onBag = function(t) {
            this.bag = t;
            facade.send("SUPPORT_BAG_UPDATE");
        };
        t.prototype.onMyRid = function(t) {
            this.myRid = t;
            facade.send("SUPPORT_RID_UPDATE");
        };
        t.prototype.onCfg = function(t) {
            this.cfg = t;
            l.default.change("support", 2 == t.state && 0 == t.get);
            facade.send("SUPPORT_CFG_UPDATE");
        };
        t.prototype.onYyRecord = function(t) {
            this.record = t;
            facade.send("SUPPORT_RECORD_UPDATE");
        };
        t.prototype.onSmallList = function(t) {
            this.small_list = t;
            facade.send("SUPPORT_END_LIST");
        };
        t.prototype.onTotalRankList = function(t) {
            this.totalList = t;
        };
        t.prototype.onBigList = function(t) {
            this.big_list = t;
            facade.send("SUPPORT_END_LIST");
        };
        t.prototype.onCHangeScore = function(t) {
            this.myChangeScore = t.score ? t.score : 0;
            facade.send("SUPPORT_YY_SCORE_UPDATE");
        };
        t.prototype.onGongXianScore = function(t) {
            this.myGongXian = t.contribution ? t.contribution : 0;
            facade.send("SUPPORT_GONG_XIAN_UPDATE");
        };
        t.prototype.onResult = function(t) {
            this.result = t;
            this.winId = t.winID;
            facade.send("SUPPORT_RESULT_UPDATE");
        };
        t.prototype.sendOpenYyhuodong = function(t) {
            var e = this;
            void 0 === t && (t = !1);
            JsonHttp.send(new proto_cs.huodong.hd6136Info(), function() {
                t &&
                    2 == e.cfg.state &&
                    0 == e.cfg.get &&
                    n.utils.showConfirm(
                        i18n.t("SUPPORT_QIAN_WANG_LING_JIANG"),
                        function() {
                            n.utils.openPrefabView("support/SupportView");
                        }
                    );
            });
        };
        t.prototype.sendBuyItem = function(t, e) {
            var o = new proto_cs.huodong.hd6136buy();
            o.id = t;
            o.num = e;
            JsonHttp.send(o, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendChangeId = function(t, e) {
            var o = new proto_cs.huodong.hd6136exchange();
            o.id = t;
            o.num = e;
            JsonHttp.send(o, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetReward = function() {
            JsonHttp.send(new proto_cs.huodong.hd6136Rewards(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendGift = function(t, e) {
            var o = new proto_cs.huodong.hd6136play();
            o.id = t;
            o.pkID = e;
            JsonHttp.send(o);
        };
        t.prototype.sendLookRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd6136paihang(), function() {
                n.utils.openPrefabView("support/SupportRankView");
            });
        };
        t.prototype.sendLookRecord = function(t) {
            var e = new proto_cs.huodong.hd6136Journal();
            e.id = t;
            JsonHttp.send(e);
        };
        return t;
    })();
o.SupportProxy = r;
