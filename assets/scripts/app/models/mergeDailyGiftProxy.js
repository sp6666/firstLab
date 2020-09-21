var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../component/RedDot"),
    l = (function () {
        function t() {
            this.UPDATE_MERGE_DAILY_GIFT_INFO = "UPDATE_MERGE_DAILY_GIFT_INFO";
            this.UPDATE_MERGE_DAILY_GIFT_PURCASE = "UPDATE_MERGE_DAILY_GIFT_PURCASE";
            this.info = null;
            this.purchase = null;
        }
        t.prototype.ctor = function () {
            JsonHttp.subscribe(proto_sc.mergesolarterms.cfg, this.onJieqiInfo, this);
            JsonHttp.subscribe(
                proto_sc.mergesolarterms.mergepurchase,
                this.onJieqiPurcase,
                this
            );
        };
        t.prototype.onJieqiInfo = function (t) {
            this.info = t;
            facade.send(this.UPDATE_MERGE_DAILY_GIFT_INFO);
        };
        t.prototype.onJieqiPurcase = function (t) {
            this.purchase = t;
            n.default.change("mergejieqi", this.hasRed());
            facade.send(this.UPDATE_MERGE_DAILY_GIFT_PURCASE);
        };
        t.prototype.senOpenJieqi = function () {
            JsonHttp.send(new proto_cs.huodong.hd6274Info());
        };
        t.prototype.senGetFree = function (t) {
            var e = new proto_cs.huodong.hd6274free();
            e.id = t;
            JsonHttp.send(e, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.senBuyCase = function (t, e) {
            var o = new proto_cs.huodong.hd6274cash();
            o.id = t;
            o.num = e;
            JsonHttp.send(o, function () {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.hasRed = function () {
            for (var t = !1, e = 0; e < this.purchase.length; e++) {
                var o = this.purchase[e];
                0 == o.type && o.limit > 0 && (t = !0);
            }
            return t;
        };
        return t;
    })();
o.MergeDailyGiftProxy = l;
var r = function () {};
o.purchaseBuyInfo = r;