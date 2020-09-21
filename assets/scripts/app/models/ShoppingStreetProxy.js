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
            this.trunRwd = null;
            this.records = null;
            this.allReward = null;
            this.dhShop = {};
            this.shop = null;
            this.SHOPPINGSTREET_DATA_UPDATE = "SHOPPINGSTREET_DATA_UPDATE";
            this.SHOPPINGSTREET_SHOW_EFF = "SHOPPINGSTREET_SHOW_EFF";
            this.SHOPPINGSTREET_TRUN_RWD = "SHOPPINGSTREET_TRUN_RWD";
            this.SHOPPINGSTREET_RECORDS = "SHOPPINGSTREET_RECORDS";
            this.SHOPPINGSTREET_SHOW_RWD_END = "SHOPPINGSTREET_SHOW_RWD_END";
            this.SHOPPINGSTREET_MY_RANK = "SHOPPINGSTREET_MY_RANK";
            this.SHOPPINGSTREET_SHOP = "SHOPPINGSTREET_SHOP";
            this.tenNum = 10;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.shoppingStreet.mirror,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(proto_sc.shoppingStreet.res, this.onRes, this);
            JsonHttp.subscribe(proto_sc.shoppingStreet.rwd, this.onRwd, this);
            JsonHttp.subscribe(proto_sc.shoppingStreet.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.shoppingStreet.records, this.onRecords, this);
            JsonHttp.subscribe(proto_sc.shoppingStreet.shop, this.onShop, this);
            JsonHttp.subscribe(
                proto_sc.shoppingStreet.allrwd,
                this.onAllReward,
                this
            );
            JsonHttp.subscribe(proto_sc.shoppingStreet.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.shoppingStreet.exchange, this.onDhShop, this);
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            this.shop = this.data.shop;
            this.tenNum = this.data.tenNum;
            facade.send(this.SHOPPINGSTREET_DATA_UPDATE);
        };
        t.prototype.onRes = function(t) {
            1 == t.TorF && facade.send(this.SHOPPINGSTREET_SHOW_EFF);
        };
        t.prototype.onRwd = function(t) {
            this.trunRwd = t;
            facade.send(this.SHOPPINGSTREET_TRUN_RWD);
        };
        t.prototype.onShop = function (t) {
            this.shop = t;
        }
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.SHOPPINGSTREET_RECORDS);
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
            this.trunRwd = null;
            this.records = null;
            this.dhShop = {};
        };
        t.prototype.sendOpenGrilsDay = function() {
            JsonHttp.send(new proto_cs.huodong.hd6262Info());
        };
        t.prototype.sendReard = function(t) {
            var e = new proto_cs.huodong.hd6262Rwd();
            e.num = t;
            JsonHttp.send(e, ()=> {
                facade.send(this.SHOPPINGSTREET_SHOW_RWD_END);
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
                a.default.change("shoppingStreet_num", t > 0);
            }
        };

        t.prototype.onMyRank = function(t) {
            this.myRank = t;
            facade.send(this.SHOPPINGSTREET_MY_RANK);
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
            JsonHttp.send(new proto_cs.huodong.hd6262Rank());
        };
        
        return t;
    })();
o.ShoppingStreetProxy = s;
