var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = (function() {
        function t() {
            this.data = null;
            this.THIRTY_DAY_DATA_UPDATE = "THIRTY_DAY_DATA_UPDATE";
            this.THIRTY_DAY_SHOW_DATA = "THIRTY_DAY_SHOW_DATA";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.thirtyCheck.hdQianDaoConfig,
                this.onDataUpdate,
                this
            );
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            facade.send(this.THIRTY_DAY_DATA_UPDATE);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6500Info());
        };
        t.prototype.sendGet = function() {
            var t = this;
            JsonHttp.send(new proto_cs.huodong.hd6500Get(), function() {
                i.timeProxy.floatReward();
                // facade.send(t.THIRTY_DAY_SHOW_DATA);
                t.data.rwd[t.data.days - 1].get = 1;
                facade.send(t.THIRTY_DAY_DATA_UPDATE);
            });
        };
        return t;
    })();
o.ThirtyDaysProxy = n;
