/**
 * 星雨灯罗
 */
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
            this.base = null;
            this.XINGYUDENGLUO_DATA_UPDATE = "XINGYUDENGLUO_DATA_UPDATE";
            this.XINGYUDENGLUO_SHOW_EFF = "XINGYUDENGLUO_SHOW_EFF";
            this.XINGYUDENGLUO_TRUN_RWD = "XINGYUDENGLUO_TRUN_RWD";
            this.XINGYUDENGLUO_RECORDS = "XINGYUDENGLUO_RECORDS";
            this.XINGYUDENGLUO_SHOW_RWD_END = "XINGYUDENGLUO_SHOW_RWD_END";
            this.XINGYUDENGLUO_MY_RANK = "XINGYUDENGLUO_MY_RANK";
            this.XINGYUDENGLUO_SHOP = "XINGYUDENGLUO_SHOP";
            this.XINGYUDENGLUO_LEIJI_UPDATE = "XINGYUDENGLUO_LEIJI_UPDATE";
            this.tenNum = 10;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.xingYuDengLuo.mirror,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.base, this.onBaseUpdate, this);
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.res, this.onRes, this);
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.rwd, this.onRwd, this);
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.records, this.onRecords, this);
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.shop, this.onShop, this);
            JsonHttp.subscribe(
                proto_sc.xingYuDengLuo.allrwd,
                this.onAllReward,
                this
            );
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.xingYuDengLuo.exchange, this.onDhShop, this);
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            this.shop = this.data.shop;
            this.tenNum = this.data.tenNum;
            a.default.change("xingYuDengLuoLeiji", this.hasRedLeiji());
            facade.send(this.XINGYUDENGLUO_DATA_UPDATE);
        };
        t.prototype.onBaseUpdate = function(t) {
            this.base = t;
            a.default.change("xingYuDengLuoLeiji", this.hasRedLeiji());
            facade.send(this.XINGYUDENGLUO_LEIJI_UPDATE);
        }
        t.prototype.onRes = function(t) {
            1 == t.TorF && facade.send(this.XINGYUDENGLUO_SHOW_EFF);
        };
        t.prototype.onRwd = function(t) {
            this.trunRwd = t;
            facade.send(this.XINGYUDENGLUO_TRUN_RWD);
        };
        t.prototype.onShop = function (t) {
            this.shop = t;
        }
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.XINGYUDENGLUO_RECORDS);
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
            this.base = null;
        };
        t.prototype.sendOpenGrilsDay = function() {
            JsonHttp.send(new proto_cs.huodong.hd6803Info(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendReard = function(t) {
            var e = new proto_cs.huodong.hd6803Rwd();
            e.num = t;
            JsonHttp.send(e, ()=> {
                facade.send(this.XINGYUDENGLUO_SHOW_RWD_END);
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
            facade.send(this.XINGYUDENGLUO_MY_RANK);
        };

        t.prototype.onDhShop = function(t) {
            this.dhShop.hid =
                this.data && this.data.info ? this.data.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime =
                this.data && this.data.info ? this.data.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        };

        t.prototype.sendLookRank = function(cb) {
            JsonHttp.send(new proto_cs.huodong.hd6803Rank(), ()=> {
                if(cb) cb();
            });
        };
        
        //领取累计奖励
        t.prototype.getReward = function (t) {
            var e = new proto_cs.huodong.hd6803GetReward();
            e.id = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            })
        };
        //积分超过阈值 并且没有领取过
        t.prototype.hasRedLeiji = function () {
            var jifen = this.base.count || 0;
            var cfg = this.data && this.data.total;
            var hasGetArr = this.base && this.base.getRewardArr
            var flag = false;
            if (cfg) {
                for (var i = 0; i < cfg.length; i++) {
                    var data = cfg[i];
                    if (data.need <= jifen) {
                        flag = hasGetArr && hasGetArr.indexOf(data.id) == -1 ? true : false;
                        if (flag) {
                            break;
                        }
                    }
                }
            }
            return flag;
        };

        return t;
    })();
o.XingYuDengLuoProxy = s;
