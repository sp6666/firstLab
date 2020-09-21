var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = (function() {
        function t() {
            this.data = null;
            this.TRUN_TABLE_DATA_UPDATE = "TRUN_TABLE_DATA_UPDATE";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.dzphuodong.cfg,
                this.onDataUpdate,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            facade.send(i.trunTableProxy.TRUN_TABLE_DATA_UPDATE, t);
        };
        t.prototype.sendOpen = function() {
            JsonHttp.send(new proto_cs.huodong.hd6169Info());
        };
        t.prototype.sendRoll = function(t) {
            var e = new proto_cs.huodong.hd6169Yao();
            e.num = t;
            JsonHttp.send(e);
        };
        return t;
    })();
o.TrunTableProxy = n;
