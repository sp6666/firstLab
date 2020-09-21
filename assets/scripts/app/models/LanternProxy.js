var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = (function() {
        function t() {
            this.data = null;
            this.records = null;
            this.LANTERN_DATA_UPDATE = "LANTERN_DATA_UPDATE";
            this.LANTERN_RECORD_UPDATE = "LANTERN_RECORD_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.ddhuodong.lantern,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(
                proto_sc.ddhuodong.records,
                this.onRecords,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            facade.send(this.LANTERN_DATA_UPDATE);
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.LANTERN_RECORD_UPDATE);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6189Info());
        };
        t.prototype.sendLightLantern = function(t) {
            var e = new proto_cs.huodong.hd6189Rwd();
            e.id = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        return t;
    })();
o.LanternProxy = n;
