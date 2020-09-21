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
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.fuli.fchofuli,
                this.onFirstRecharge,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
        };
        t.prototype.onFirstRecharge = function(t) {
            this.data = t;
            n.default.change("firstRecharge", 1 == t.type);
            facade.send("FIRST_RECHARGE_UPDATE");
        };
        t.prototype.sendGetReward = function() {
            JsonHttp.send(new proto_cs.fuli.fcho(), function() {
                i.timeProxy.floatReward();
            });
        };
        return t;
    })();
o.FirstRechargeProxy = l;
