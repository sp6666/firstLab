var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("./BagProxy"),
    l = require("../utils/UIUtils"),
    r = require("../Config"),
    a = require("../component/RedDot"),
    s = (function() {
        function t() {
            this.data = null;
            this.countNum = 0;
            this.records = null;
            this.allReward = null;
            this.dhShop = {};
            this.shop = null;
            this.ZNCJ_DATA_UPDATE = "ZNCJ_DATA_UPDATE";
            this.ZNCJ_SHOW_EFF = "ZNCJ_SHOW_EFF";
            this.ZNCJ_TRUN_RWD = "ZNCJ_TRUN_RWD";
            this.ZNCJ_RECORDS = "ZNCJ_RECORDS";
            this.ZNCJ_SHOW_RWD_END = "ZNCJ_SHOW_RWD_END";
            this.ZNCJ_MY_RANK = "ZNCJ_MY_RANK";
            this.ZNCJ_SHOP = "ZNCJ_SHOP";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.zhouNianChouJiang.mirror,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(proto_sc.zhouNianChouJiang.res, this.onRes, this);
            JsonHttp.subscribe(proto_sc.zhouNianChouJiang.rwd, this.onRwd, this);
            JsonHttp.subscribe(proto_sc.zhouNianChouJiang.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.zhouNianChouJiang.records, this.onRecords, this);
            JsonHttp.subscribe(proto_sc.zhouNianChouJiang.shop, this.onShop, this);
            JsonHttp.subscribe(
                proto_sc.zhouNianChouJiang.allrwd,
                this.onAllReward,
                this
            );
            JsonHttp.subscribe(proto_sc.zhouNianChouJiang.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.zhouNianChouJiang.exchange, this.onDhShop, this);
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            this.shop = this.data.shop;
            facade.send(this.ZNCJ_DATA_UPDATE);
        };
        t.prototype.onRes = function(t) {
            1 == t.TorF && facade.send(this.ZNCJ_SHOW_EFF);
        };
        t.prototype.onRwd = function(t) {
            this.countNum = t.countNum;
            facade.send(this.ZNCJ_TRUN_RWD);
        };
        t.prototype.onShop = function (t) {
            this.shop = t;
        }
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.ZNCJ_RECORDS);
        };
        t.prototype.onAllReward = function(t) {
            this.allReward = t;
        };
        t.prototype.onRank = function(t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.countNum = 0;
            this.records = null;
            this.dhShop = {};

        };
        t.prototype.sendOpenGrilsDay = function() {
            JsonHttp.send(new proto_cs.huodong.hd6265Info());
        };
        t.prototype.sendReard = function(t) {
            var e = new proto_cs.huodong.hd6265Rwd();
            e.num = t;
            JsonHttp.send(e, ()=> {
                facade.send(this.ZNCJ_SHOW_RWD_END);
            });
        };
        t.prototype.getShowItem = function() {
            for (var t = null, e = 0; e < this.allReward.length; e++)
                if (this.allReward[e].kind == n.DataType.CLOTHE) {
                    var o = localcache.getItem(
                        localdb.table_userClothe,
                        this.allReward[e].id
                    );
                    if (
                        1 == o.part ||
                        2 == o.part ||
                        4 == o.part ||
                        6 == o.part
                    ) {
                        if (!i.playerProxy.isUnlockCloth(o.id)) return o;
                        null == t && (t = o);
                    }
                }
            return t;
        };
        t.prototype.getItemUrl = function(t) {
            return null == t
                ? ""
                : 1 == t.part
                ? r.Config.skin + "/prefabs/role/" + t.model
                : 2 == t.part
                ? r.Config.skin + "/prefabs/role/" + t.model
                : 4 == t.part
                ? l.uiHelps.getStoryBg(t.model)
                : 6 == t.part
                ? r.Config.skin + "/prefabs/role/" + t.model
                : void 0;
        };
        t.prototype.updateItemNum = function() {
            if (this.data) {
                var t = i.bagProxy.getItemCount(this.data.need);
                a.default.change("zhouNianChouJiang_num", t > 0);
            }
        };

        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.ZNCJ_MY_RANK);
        };

        t.prototype.onDhShop = function(t) {
            this.dhShop.hid =
                this.data && this.data.info ? this.data.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime =
                this.data && this.data.info ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };

        t.prototype.sendLookRank = function() {
            JsonHttp.send(new proto_cs.huodong.hd6265Rank());
        };
        
        return t;
    })();
o.ZhouNianChouJiangProxy = s;
