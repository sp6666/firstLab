var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/Utils"),
    l = (function() {
        function t() {
            this.cfg = null;
            this.records = null;
            this.SPELL_DATA_UPDAT = "SPELL_DATA_UPDAT";
            this.SPELL_DATA_RECORDS = "SPELL_DATA_RECORDS";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.jigsaw.cfg, this.onCfg, this);
            JsonHttp.subscribe(proto_sc.jigsaw.rwdLog, this.onRecords, this);
        };
        t.prototype.clearData = function() {
            this.cfg = null;
            this.records = null;
        };
        t.prototype.onCfg = function(t) {
            this.cfg = t;
            facade.send(this.SPELL_DATA_UPDAT);
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.SPELL_DATA_RECORDS);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6223Info());
        };
        t.prototype.sendGive = function(t, e) {
            var o = new proto_cs.huodong.hd6223give();
            o.fuid = t;
            o.itemId = e;
            JsonHttp.send(o, function(t) {
                1 == t.s && n.alertUtil.alert18n("SPELL_SEND_SUCCESS");
            });
        };
        t.prototype.sendGetRwd = function() {
            JsonHttp.send(new proto_cs.huodong.hd6223Rwd(), function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.isEnough = function() {
            if (this.cfg)
                for (var t = !0, e = 0; e < this.cfg.debris.length; e++)
                    if (
                        null == this.cfg.debris[e].num ||
                        0 == this.cfg.debris[e].num
                    ) {
                        t = !1;
                        break;
                    }
            return t;
        };
        return t;
    })();
o.SpellProxy = l;
