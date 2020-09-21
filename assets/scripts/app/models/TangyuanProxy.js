var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = require("../component/RedDot"),
    r = (function () {
        function t() {
            this.info = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.TANG_YUAN_INFO_UPDATE = "TANG_YUAN_INFO_UPDATE";
            this.TANG_YUAN_BASE_UPDATE = "TANG_YUAN_BASE_UPDATE";
            this.TANG_YUAN_MY_RANK = "TANG_YUAN_MY_RANK";
            this.TANG_YUAN_CHANGE = "TANG_YUAN_CHANGE"
            this.need = 0;
            this.dhShop = {};
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.tangyuan.info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.tangyuan.rank, this.onRank, this);
            JsonHttp.subscribe(proto_sc.tangyuan.myRank, this.onMyRank, this);
            JsonHttp.subscribe(proto_sc.tangyuan.base, this.onBase, this);
            JsonHttp.subscribe(proto_sc.tangyuan.shop, this.onShop, this);
            JsonHttp.subscribe(proto_sc.tangyuan.exchange, this.onDhShop, this);
        };
        t.prototype.clearData = function () {
            this.info = null;
            this.rank = null;
            this.myRank = null;
            this.base = null;
            this.shop =null;
            this.need = 0;
            this.dhShop = {};
        };
        t.prototype.onInfo = function (t) {
            this.info = t;
            var e = this.getCurTangyuanTime(!0);
            if (e) {
                var o = n.timeUtil.getTodaySecond(e.need),
                    r = n.timeUtil.second,
                    a = o - r > 0 ? o - r + 5 : 0;
                if (e.need != this.need && a > 0) {
                    facade.send("TIME_RUN_FUN", {
                        fun: function () {
                            i.tangyuanProxy.sendOpenActivity();
                        },
                        time: a
                    });
                    this.need = e.need;
                }
            }
            l.default.change("tangyuan", this.hasRed());
            facade.send(this.TANG_YUAN_INFO_UPDATE);
        };
        t.prototype.onRank = function (t) {
            i.limitActivityProxy.cbRankList = t;
            this.rank = t;
        };
        t.prototype.onMyRank = function (t) {
            this.myRank = t;
            facade.send(this.TANG_YUAN_MY_RANK);
        };
        t.prototype.onBase = function (t) {
            this.base = t;
            l.default.change("tangyuanleiji", this.hasRedLeiji());
            l.default.change("tangyuan", t?this.hasRed()||!t.getSpoonTimeId:false);
            facade.send(this.TANG_YUAN_BASE_UPDATE);
        };

        t.prototype.onDhShop=function (t){
            //dhshop
            this.dhShop.hid =
                this.info && this.info.info ? this.info.info.id : 1;
            this.dhShop.rwd = t;
            this.dhShop.stime =
                this.info && this.info.info ? this.info.info.showTime : 0;
            facade.send(i.limitActivityProxy.ACTIVITY_SHOP_UPDATE, this.dhShop);
        }
        t.prototype.sendOpenActivity = function () {
            JsonHttp.send(new proto_cs.huodong.hd6015Info());
        };
        t.prototype.sendLookRank = function () {
            JsonHttp.send(new proto_cs.huodong.hd6015Rank());
        };
        t.prototype.sendQiang = function (t, type) {
            var e = new proto_cs.huodong.hd6015Rwd();
            e.id = t;
            e.count = Number(type);
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        //汤勺领取协议
        t.prototype.getSpoon = function () {
            var e = new proto_cs.huodong.hd6015GetSpoon();
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
                facade.send(i.tangyuanProxy.TANG_YUAN_CHANGE);
            })
        };
        //领取累计奖励
        t.prototype.getReward = function (t) {
            var e = new proto_cs.huodong.hd6015GetReward();
            e.id = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            })
        }
        t.prototype.getCurTangyuanTime = function (t) {
            void 0 === t && (t = !1);
            if (this.info)
                for (
                    var e = n.timeUtil.second,
                    o = n.timeUtil.getTodaySecond(0),
                    i = this.info.times.length,
                    l = i - 1;
                    l >= 0;
                    l--
                )
                    if (o + 3600 * this.info.times[l].need <= e)
                        return t
                            ? i > l + 1
                                ? this.info.times[l + 1]
                                : null
                            : this.info.times[l];
            return t ? this.info.times[0] : null;
        };
        t.prototype.getCurRemain = function (t) {
            if (this.base)
                for (var e = 0; e < this.base.damage.length; e++)
                    if (t == this.base.damage[e].id) return this.base.damage[e];
            return null;
        };
        t.prototype.hasRed = function () {
            var t = this.getCurTangyuanTime();
            if (t) {
                var e = i.tangyuanProxy.getCurRemain(t.need);
                if (this.base.rwd != t.need && t.all - (e ? e.count : 0) > 0)
                    return !0;
            }
            return !1;
        };
        t.prototype.onShop =function(t){
            this.shop =t;
            // facade.send(this.TANG_YUAN_INFO_UPDATE);
        }
        //积分超过阈值 并且没有领取过
        t.prototype.hasRedLeiji = function () {
            var jifen = this.base.count || 0;
            var cfg = this.info && this.info.total;
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
        }

        return t;
    })();
o.TangyuanProxy = r;
