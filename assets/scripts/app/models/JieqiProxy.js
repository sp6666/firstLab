var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../component/RedDot"),
    l = (function() {
        function t() {
            this.UPDATE_JIEQI_INFO = "UPDATE_JIEQI_INFO";
            this.UPDATE_JIEQI_PURCASE = "UPDATE_JIEQI_PURCASE";
            this.info = null;
            this.purcase = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.solarterms.cfg, this.onJieqiInfo, this);
            JsonHttp.subscribe(
                proto_sc.solarterms.purchase,
                this.onJieqiPurcase,
                this
            );
        };
        t.prototype.onJieqiInfo = function(t) {
            this.info = t;
            facade.send(this.UPDATE_JIEQI_INFO);
        };
        t.prototype.onJieqiPurcase = function(t) {
            this.purcase = t;
            n.default.change("jieqi", this.hasRed());
            facade.send(this.UPDATE_JIEQI_PURCASE);
        };
        t.prototype.senOpenJieqi = function() {
            JsonHttp.send(new proto_cs.huodong.hd6211Info());
        };
        t.prototype.senGetFree = function(t) {
            var e = new proto_cs.huodong.hd6211free();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.senBuyCase = function(t, e) {
            var o = new proto_cs.huodong.hd6211cash();
            o.id = t;
            o.num = e;
            JsonHttp.send(o, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.hasRed = function() {
            for (var t = !1, e = 0; e < this.purcase.length; e++) {
                var o = this.purcase[e];
                0 == o.type && o.limit > 0 && (t = !0);
            }
            return t;
        };
        return t;
    })();
o.JieqiProxy = l;
var r = function() {};
o.purchaseBuyInfo = r;
