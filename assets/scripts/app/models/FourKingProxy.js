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
            this.FOURKING_DATA_UPDATE = "FOURKING_DATA_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.sidafanwanghd.fanwang,
                this.onDataUpdate,
                this
            );
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            n.default.change("fourking", this.hasRed());
            facade.send(this.FOURKING_DATA_UPDATE);
        };
        t.prototype.sendOpenPrince = function() {
            JsonHttp.send(new proto_cs.huodong.hd6233Info());
        };
        t.prototype.sendGetReward = function(t) {
            var e = new proto_cs.huodong.hd6233Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.hasRed = function() {};
        return t;
    })();
o.FourKingProxy = l;
