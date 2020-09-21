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
            this.PRINCE_DATA_UPDATE = "PRINCE_DATA_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.jshuodong.unlock,
                this.onDataUpdate,
                this
            );
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            n.default.change("prince", this.hasRed());
            facade.send(this.PRINCE_DATA_UPDATE);
        };
        t.prototype.sendOpenPrince = function() {
            JsonHttp.send(new proto_cs.huodong.hd6181Info());
        };
        t.prototype.sendGetReward = function(t) {
            var e = new proto_cs.huodong.hd6181Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.hasRed = function() {
            var t = !1;
            if (0 == this.data.get && this.data.cons >= this.data.cfg.need)
                for (var e = 0; e < this.data.cfg.heros.length; e++) {
                    var o;
                    o = this.data.cfg.heros[e];
                    if (null == i.servantProxy.getHeroData(o)) {
                        t = !0;
                        break;
                    }
                }
            return t;
        };
        return t;
    })();
o.PrinceRecruitProxy = l;
