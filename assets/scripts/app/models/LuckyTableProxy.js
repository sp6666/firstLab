var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = (function() {
        function t() {
            this.data = null;
            this.records = null;
            this.dayRank = null;
            this.dayRid = null;
            this.totalRank = null;
            this.totalRid = null;
            this.shop = null;
            this.scoreChange = null;
            this.LUCKY_TABLE_DATA_UPDATE = "LUCKY_TABLE_DATA_UPDATE";
            this.LUCKY_TABLE_DAY_RANK = "LUCKY_TABLE_DAY_RANK";
            this.LUCKY_TABLE_TOTAL_RANK = "LUCKY_TABLE_TOTAL_RANK";
            this.LUCKY_TABLE_RECORDS = "LUCKY_TABLE_RECORDS";
            this.LUCKY_TABLE_WIN = "LUCKY_TABLE_WIN";
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.luckydraw.turntable, this.onData, this);
            JsonHttp.subscribe(proto_sc.luckydraw.rwdLog, this.onRecords, this);
            JsonHttp.subscribe(
                proto_sc.luckydraw.dayRank,
                this.onDayRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.luckydraw.mydayRank,
                this.onDayRid,
                this
            );
            JsonHttp.subscribe(
                proto_sc.luckydraw.totalRank,
                this.onTotalRank,
                this
            );
            JsonHttp.subscribe(
                proto_sc.luckydraw.myTotalRank,
                this.onTotalRid,
                this
            );
            JsonHttp.subscribe(proto_sc.luckydraw.shop, this.onShop, this);
            JsonHttp.subscribe(
                proto_sc.luckydraw.scoreExchange,
                this.onScoreChange,
                this
            );
        };
        t.prototype.clearData = function() {
            this.data = null;
            this.records = null;
            this.dayRank = null;
            this.dayRid = null;
            this.totalRank = null;
            this.totalRid = null;
            this.shop = null;
            this.scoreChange = null;
        };
        t.prototype.onData = function(t) {
            this.data = t;
            facade.send(this.LUCKY_TABLE_DATA_UPDATE);
            i.utils.isOpenView("ActivityScoreChange") &&
                facade.send("ACTIVITY_SCORE_CHANEG_SCORE_UPDATE", t.cons);
        };
        t.prototype.onRecords = function(t) {
            this.records = t;
            facade.send(this.LUCKY_TABLE_RECORDS);
        };
        t.prototype.onDayRank = function(t) {
            this.dayRank = t;
        };
        t.prototype.onDayRid = function(t) {
            this.dayRid = t;
            facade.send(this.LUCKY_TABLE_DAY_RANK);
        };
        t.prototype.onTotalRank = function(t) {
            this.totalRank = t;
        };
        t.prototype.onTotalRid = function(t) {
            this.totalRid = t;
            facade.send(this.LUCKY_TABLE_TOTAL_RANK);
        };
        t.prototype.onShop = function(t) {
            this.shop = t;
        };
        t.prototype.onScoreChange = function(t) {
            this.scoreChange = t;
            facade.send("ACTIVITY_SCORE_CHANGE_LIST_UPDATE", t);
        };
        t.prototype.sendOpenActivity = function() {
            JsonHttp.send(new proto_cs.huodong.hd6227Info());
        };
        t.prototype.sendRoll = function(t) {
            var e = new proto_cs.huodong.hd6227Yao();
            e.num = t;
            JsonHttp.send(e, function() {});
        };
        t.prototype.sendLookRank = function(t) {
            var e = new proto_cs.huodong.hd6227Paihang();
            e.type = t;
            JsonHttp.send(e);
        };
        return t;
    })();
o.LuckyTableProxy = n;
