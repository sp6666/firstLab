var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    red = require("../component/RedDot"),
    n = (function () {
        function t() {
            this.cfg = null;
            this.MERGE_SINGLE_RECHARGE_DATA_UPDATE = "MERGE_SINGLE_RECHARGE_DATA_UPDATE";
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.mergedblchuodong.mergecfg, this.onCfg, this);
        };
        t.prototype.onCfg = function (t) {
            this.cfg = t;

            this.updateRedDot(this.getMainList());

            facade.send(this.MERGE_SINGLE_RECHARGE_DATA_UPDATE);
        };
        t.prototype.sendOpenActivity = function () {
            JsonHttp.send(new proto_cs.huodong.hd6272Info());
        };
        t.prototype.sendReward = function (t, e) {
            var o = new proto_cs.huodong.hd6272Rwd();
            o.id = t;
            o.dc = e;
            JsonHttp.send(o, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.getRewardData = function (t) {
            for (var e = 0; e < this.cfg.rwds.length; e++)
                if (this.cfg.rwds[e].id == t) return this.cfg.rwds[e];
        };
        t.prototype.getBociRed = function (t) {
            for (var e = this.getRewardData(t), o = 0; o < e.rwd.length; o++)
                if (e.rwd[o].cons >= e.rwd[o].need && 0 == e.rwd[o].get)
                    return !0;
            return !1;
        };
        t.prototype.isGetedRwd = function (t) {
            for (
                var e = !0, o = this.getRewardData(t), i = 0; i < o.rwd.length; i++
            )
                if (0 == o.rwd[i].get) {
                    e = !1;
                    break;
                }
            return e;
        };
        t.prototype.getRwdType = function (t) {
            if (this.isGetedRwd(t)) return 3e3;
            if (this.cfg.wave < t) return 2e3;
            for (var e = 0; e < this.cfg.rwds.length; e++) {
                var o = this.cfg.rwds[e];
                if (o.id == t)
                    for (var i = 0; i < o.rwd.length; i++)
                        if (o.rwd[i].cons >= o.rwd[i].need && 0 == o.rwd[i].get)
                            return 0;
            }
            return 1e3;
        };
        t.prototype.getMainList = function () {
            for (var t = [], e = 0; e < this.cfg.rwds.length; e++)
                t.push(this.cfg.rwds[e]);
            t.sort(this.sortList);
            return t;
        };
        t.prototype.sortList = function (t, e) {
            var o = i.mergeSingleRechargeProxy.getRwdType(t.id) + t.id,
                n = i.mergeSingleRechargeProxy.getRwdType(e.id) + e.id;
            return o != n ? o - n : t.id - e.id;
        };
        t.prototype.sortRwd = function (t, e) {
            var o = t.cons >= t.need ? 0 : 1,
                i = e.cons >= e.need ? 0 : 1;
            return t.get != e.get ? t.get - e.get : o - i;
        };

        t.prototype.updateRedDot = function (data) {


            for (var index = 0; data && index < data.length; index++) {

                var single = data[index];

                var name = this.getRedDotName(single.id);
                red.default.change(name, false);


                for (var rwd of single.rwd) {
                    if (rwd.get == 0 && rwd.cons >= rwd.need) {
                        red.default.change(name, true);
                        break;
                    }
                }
            }
        };

        t.prototype.getRedDotName = function (id) {

            return 'mergedaily_recharge' + id;
        };



        return t;
    })();
o.MergeSingleRechargeProxy = n;