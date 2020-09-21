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
            this.LEVEL_GIFT_DATA_UPDATE = "LEVEL_GIFT_DATA_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.sfhuodong.sfGift,
                this.onDataUpdate,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            n.default.change("levelgift", this.hasRed());
            facade.send(this.LEVEL_GIFT_DATA_UPDATE);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6182Info());
        };
        t.prototype.sendGetReward = function(t) {
            var e = new proto_cs.huodong.hd6182Rwd();
            e.lv = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.sendBuyReward = function(t) {
            var e = new proto_cs.huodong.hd6182RwdCharge();
            e.lv = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.hasRed = function() {
            var t = !1;
            if (this.data)
                for (var e in this.data.free) {
                    var o = this.data.free[e];
                    if (0 == o.isget && i.playerProxy.userData.level >= o.lv) {
                        t = !0;
                        break;
                    }
                }
            return t;
        };
        return t;
    })();
o.LevelGiftProxy = l;
