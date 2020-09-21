var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = (function() {
        function t() {
            this.data = null;
            this.rule = null;
            this.rewards = null;
            this.ranks = null;
            this.myRank = null;
            this.todayRanks = null;
            this.GUO_LI_DATA_UPDATE = "GUO_LI_DATA_UPDATE";
            this.GUO_LI_RULE_DATA = "GUO_LI_RULE_DATA";
            this.GUO_LI_RREWARDS_DATA = "GUO_LI_RREWARDS_DATA";
            this.GUO_LI_RANK_DATA = "GUO_LI_RANK_DATA";
            this.GUO_LI_MY_RANK = "GUO_LI_MY_RANK";
            this.GUO_LI_TODAY_RANKS = "GUO_LI_TODAY_RANKS";
            this.lookType = 0;
            this.dhShop = {};
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.celebration,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.rule,
                this.ruleUpdate,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.cbrwd,
                this.onRewardData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.paihangZl,
                this.onTodayRanks,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.cashlist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.yuelilist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.yinlianglist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.mingshenglist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.treasurelist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.banchailist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.xunfanglist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.lianyinlist,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.totalRankList,
                this.onRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myCashRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myYueLiRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myYinLiangRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myMingShengRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myTreaRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myBanChaiRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myXunFangRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.myLianYinRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.mytotalRankRid,
                this.onMyRankData,
                this
            );
            JsonHttp.subscribe(
                proto_sc.glqdhuodong.exchange,
                this.onActivityShop,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.rule = null;
            this.rewards = null;
            this.ranks = null;
            this.myRank = null;
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            facade.send(this.GUO_LI_DATA_UPDATE);
        };
        t.prototype.ruleUpdate = function(t) {
            this.rule = t;
            facade.send(this.GUO_LI_RULE_DATA);
        };
        t.prototype.onRewardData = function(t) {
            this.rewards = t;
            facade.send(this.GUO_LI_RREWARDS_DATA);
        };
        t.prototype.onTodayRanks = function(t) {
            this.todayRanks = t;
            facade.send(this.GUO_LI_TODAY_RANKS);
        };
        t.prototype.onRankData = function(t) {
            this.ranks = t;
            facade.send(this.GUO_LI_RANK_DATA);
        };
        t.prototype.onMyRankData = function(t) {
            this.myRank = t;
            facade.send(this.GUO_LI_MY_RANK);
        };
        t.prototype.onActivityShop = function(t) {
            var e = {
                rwd: []
            };
            e.hid = this.data ? this.data.info.id : 1;
            e.rwd = t;
            e.stime = this.data ? this.data.info.showTime : 0;
            this.dhShop = e;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6187Info());
        };
        t.prototype.sendGetReward = function(t) {
            var e = new proto_cs.huodong.hd6187Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendLookRank = function(t) {
            var e = new proto_cs.huodong.hd6187Paihang();
            e.type = t;
            JsonHttp.send(e);
        };
        t.prototype.sendLookDayRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd6187dayPaihang());
        };
        t.prototype.sendRefreshRank = function(t) {
            var e = new proto_cs.huodong.hd6187flush();
            e.type = t;
            JsonHttp.send(e, function() {
                i.rankProxy.lastTime = n.timeUtil.second;
                n.alertUtil.alert18n("RANK_REFRESH_SUCCESS");
            });
        };
        t.prototype.getFontColor = function(t) {
            switch (t) {
                case 1:
                    return cc.color(83, 106, 127);

                case 2:
                    return cc.color(83, 128, 119);

                case 3:
                    return cc.color(83, 106, 127);

                case 4:
                    return cc.color(87, 83, 127);

                case 5:
                    return cc.color(113, 111, 59);

                case 6:
                    return cc.color(127, 105, 83);

                case 7:
                    return cc.color(127, 83, 83);

                case 8:
                    return cc.color(127, 83, 104);
            }
            return null;
        };
        t.prototype.getTodayRank = function(t) {
            if (this.todayRanks)
                for (var e = 0; e < this.todayRanks.length; e++)
                    if (this.todayRanks[e].id == t)
                        return this.todayRanks[e].rid;
            return 0;
        };
        return t;
    })();
o.GuoliProxy = l;
