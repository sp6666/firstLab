var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../component/RedDot"),
    l = (function() {
        function t() {
            this.data = null;
            this.CONTINUITY_RECHARGE_DATA_UPDATE =
                "CONTINUITY_RECHARGE_DATA_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.lxczhuodong.continuity,
                this.onDataUpdate,
                this
            );
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            n.default.change("continuity_recharge", this.hasRed());
            facade.send(this.CONTINUITY_RECHARGE_DATA_UPDATE);
        };
        t.prototype.senOpenData = function() {
            JsonHttp.send(new proto_cs.huodong.hd6184Info());
        };
        t.prototype.sendGetDailyReward = function(t) {
            var e = new proto_cs.huodong.hd6184Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendGetTotalReward = function(t) {
            var e = new proto_cs.huodong.hd6184TotalRwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.hasRed = function() {
            var t = !1,
                e = this.data.cfg.rwd,
                o = this.data.cfg.totalrwd,
                i = this.data.day,
                n = this.data.cons,
                l = this.data.total;
            if (this.data) {
                for (var r = 0; r < o.length; r++)
                    i >= o[r].day &&
                        l >= o[r].need &&
                        0 == o[r].get &&
                        (t = !0);
                for (r = 0; r < e.length; r++)
                    n >= e[r].need && 0 == e[r].get && (t = !0);
            }
            return t;
        };
        return t;
    })();
o.ContinuityRechargeProxy = l;
