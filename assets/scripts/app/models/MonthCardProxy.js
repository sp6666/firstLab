var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../component/RedDot"),
    l = (function() {
        function t() {
            this.cardData = null;
            this.data = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.fuli.mooncard, this.onMoonCard, this);
        };
        t.prototype.clearData = function() {
            this.cardData = null;
        };
        t.prototype.onMoonCard = function(t) {
            this.cardData = t;
            n.default.change("monthCard", this.hasReward());
            facade.send("MOON_CARD_UPDATE");
        };
        t.prototype.sendGetMoonCard = function(t) {
            var e = new proto_cs.fuli.mooncard();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.getCardData = function(t) {
            for (var e = null, o = 0; o < this.cardData.length; o++)
                if (this.cardData[o].id == t) {
                    e = this.cardData[o];
                    break;
                }
            return e;
        };
        t.prototype.hasReward = function() {
            for (var t = !1, e = 0; e < this.cardData.length; e++)
                if (1 == this.cardData[e].type) {
                    t = !0;
                    break;
                }
            return t;
        };
        return t;
    })();
o.MonthCardProxy = l;
