var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../Initializer"),
    n = require("../utils/UIUtils"),
    l = require("../Config"),
    r = require("../component/RedDot"),
    a = (function() {
        function t() {
            this.data = null;
            this.records = null;
            this.shop = null;
            this.READING_DAY_DATA_UPDATE = "READING_DAY_DATA_UPDATE";
            this.READING_DAY_SHOW_EFF = "READING_DAY_SHOW_EFF";
            this.READING_DAY_TRUN_RWD = "READING_DAY_TRUN_RWD";
            this.READING_DAY_RECORDS = "READING_DAY_RECORDS";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(
                proto_sc.studyday.mirror,
                this.onDataUpdate,
                this
            );
            JsonHttp.subscribe(proto_sc.studyday.res, this.onRes, this);
            JsonHttp.subscribe(proto_sc.studyday.records, this.onRecords, this);
            JsonHttp.subscribe(proto_sc.studyday.shop, this.onShop, this);
        };
        t.prototype.onDataUpdate = function(t) {
            this.data = t;
            facade.send(this.READING_DAY_DATA_UPDATE);
        };
        t.prototype.onRes = function(t) {
            1 == t.TorF && facade.send(this.READING_DAY_SHOW_EFF);
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.READING_DAY_RECORDS);
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.records = null;
        };
        t.prototype.sendOpenReadingDay = function() {
            JsonHttp.send(new proto_cs.huodong.hd6228Info());
        };
        t.prototype.sendReard = function(t) {
            var e = new proto_cs.huodong.hd6228Rwd();
            e.num = t;
            JsonHttp.send(e, function() {
                i.timeProxy.floatReward();
            });
        };
        t.prototype.getItemUrl = function(t) {
            return null == t
                ? ""
                : 1 == t.part
                ? l.Config.skin + "/prefabs/role/" + t.model
                : 2 == t.part
                ? l.Config.skin + "/prefabs/role/" + t.model
                : 4 == t.part
                ? n.uiHelps.getStoryBg(t.model)
                : 6 == t.part
                ? l.Config.skin + "/prefabs/role/" + t.model
                : void 0;
        };
        t.prototype.updateItemNum = function() {
            if (this.data) {
                var t = i.bagProxy.getItemCount(this.data.need);
                r.default.change("girlsday_num", t > 0);
            }
        };
        return t;
    })();
o.ReadingDayProxy = a;
