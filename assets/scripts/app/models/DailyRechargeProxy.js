var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../component/RedDot"),
    n = require("../Initializer"),
    l = (function() {
        function t() {
            this.data = null;
            this.DAILY_RECHARGE_DATA_UPDATE = "DAILY_RECHARGE_DATA_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.edczhuodong.everyday,
                this.onDataUpdate,
                this
            );
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            i.default.change("daily_recharge", this.hasRed());
            facade.send(this.DAILY_RECHARGE_DATA_UPDATE);
        };
        t.prototype.clearData = function() {
            this.data = null;
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6168Info());
        };
        t.prototype.sendGetDailyReward = function() {
            JsonHttp.send(new proto_cs.huodong.hd6168Rwd(), function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetTotalReward = function() {
            JsonHttp.send(new proto_cs.huodong.hd6168TotalRwd(), function() {
                n.timeProxy.floatReward();
            });
        };
        t.prototype.hasRed = function() {
            if (null != this.data && null != this.data.cfg)
                return (
                    (this.data.cons >= this.data.cfg.quota &&
                        0 == this.data.consGet) ||
                    (this.data.day >= this.data.cfg.duration &&
                        0 == this.data.dayGet)
                );
        };
        return t;
    })();
o.DailyRechargeProxy = l;
