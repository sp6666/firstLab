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
            this.tenNum = 0;
            this.fiftyNum = 0;
            this.countNum = 0;
            this.records = null;
            this.allReward = null;
            this.dhShop = {};
            this.shop = null;
            this.HDY_DATA_UPDATE = "HDY_DATA_UPDATE";
            this.HDY_SHOW_EFF = "HDY_SHOW_EFF";
            this.HDY_TRUN_RWD = "HDY_TRUN_RWD";
            this.HDY_RECORDS = "HDY_RECORDS";
            this.HDY_SHOW_RWD_END = "HDY_SHOW_RWD_END";
            this.HDY_MY_RANK = "HDY_MY_RANK";
            this.HDY_SHOP = "HDY_SHOP";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.huoDongYueChouJiang.mirror,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.res, this.onRes, this);
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.rwd, this.onRwd, this);
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.records, this.onRecords, this);
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.shop, this.onShop, this);
            JsonHttp.subscribe(
                proto_sc.huoDongYueChouJiang.allrwd,
                this.onAllReward,
                this
            );
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.exchange, this.onDhShop, this);
            JsonHttp.subscribe(proto_sc.huoDongYueChouJiang.num, this.onNum, this);
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            this.shop = this.data.shop;
            facade.send(this.HDY_DATA_UPDATE);
        };
        t.prototype.onRes = function(t) {
            1 == t.TorF && facade.send(this.HDY_SHOW_EFF);
        };
        t.prototype.onRwd = function(t) {
            this.countNum = t.countNum;
            //facade.send(this.HDY_TRUN_RWD);
        };
        t.prototype.onNum = function(t) {
            this.tenNum = t.tenNum;
            this.fiftyNum = t.fiftyNum;
            a.default.change("huodongyue_once", this.tenNum >= 10);
            a.default.change("huodongyue_ten", this.fiftyNum >= 50);
            facade.send(this.HDY_TRUN_RWD);
        };
        t.prototype.onShop = function (t) {
            this.shop = t;
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.HDY_RECORDS);
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
            this.tenNum = 0;
            this.fiftyNum = 0;
            this.records = null;
            this.dhShop = {};

        };
        t.prototype.sendOpenGrilsDay = function() {
            JsonHttp.send(new proto_cs.huodong.hd6801Info(), function(info) {
            });
        };
        t.prototype.sendGetRwd = function(type) {
            var e = new proto_cs.huodong.hd6801Extra();
            e.type = type;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };

        t.prototype.sendReard = function(t) {
            var e = new proto_cs.huodong.hd6801Rwd();
            e.num = t;
            JsonHttp.send(e, ()=> {
                facade.send(this.HDY_SHOW_RWD_END);
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
                a.default.change("huoDongYueChouJiang_num", t > 0);
            }
        };

        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.HDY_MY_RANK);
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
            JsonHttp.send(new proto_cs.huodong.hd6801Rank());
        };
        
        return t;
    })();
o.HuoDongYueChouJiangProxy = s;
