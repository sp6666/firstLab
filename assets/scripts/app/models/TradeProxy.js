var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = (function() {
        function t() {
            this.UPDATE_TRADE_FAIL = "UPDATE_TRADE_FAIL";
            this.UPDATE_TRADE_MYRAND = "UPDATE_TRADE_MYRAND";
            this.UPDATE_TRADE_INFO = "UPDATE_TRADE_INFO";
            this.UPDATE_TRADE_FIGHT = "UPDATE_TRADE_FIGHT";
            this.UPDATE_TRADE_SCORERANK = "UPDATE_TRADE_SCORERANK";
            this.UPDATE_TRADE_WIN = "UPDATE_TRADE_WIN";
            this.fail = null;
            this.myRand = null;
            this.info = null;
            this.fight = null;
            this.scoreRank = null;
            this.win = null;
        }
        t.prototype.ctor = function() {
            JsonHttp.subscribe(proto_sc.trade.fail, this.onFail, this);
            JsonHttp.subscribe(proto_sc.trade.myRand, this.onMyRand, this);
            JsonHttp.subscribe(proto_sc.trade.Info, this.onInfo, this);
            JsonHttp.subscribe(proto_sc.trade.fight, this.onFight, this);
            JsonHttp.subscribe(
                proto_sc.trade.scoreRank,
                this.onScoreRank,
                this
            );
            JsonHttp.subscribe(proto_sc.trade.win, this.onWin, this);
        };
        t.prototype.clearData = function() {
            this.fail = null;
            this.myRand = null;
            this.info = null;
            this.fight = null;
            this.scoreRank = null;
            this.win = null;
        };
        t.prototype.onWin = function(t) {
            this.win = t;
            facade.send(this.UPDATE_TRADE_WIN);
        };
        t.prototype.onScoreRank = function(t) {
            this.scoreRank = t;
            facade.send(this.UPDATE_TRADE_SCORERANK);
        };
        t.prototype.onFight = function(t) {
            this.fight = t;
            facade.send(this.UPDATE_TRADE_FIGHT);
        };
        t.prototype.onInfo = function(t) {
            this.info = t;
            facade.send(this.UPDATE_TRADE_INFO);
        };
        t.prototype.onMyRand = function(t) {
            this.myRand = t;
            facade.send(this.UPDATE_TRADE_MYRAND);
        };
        t.prototype.onFail = function(t) {
            this.fail = t;
            facade.send(this.UPDATE_TRADE_FAIL);
        };
        t.prototype.sendPaihang = function() {
            JsonHttp.send(new proto_cs.silkroad.paihang(), function() {
                i.utils.openPrefabView("trade/TradeRank");
            });
        };
        t.prototype.sendPlay = function(t) {
            var e = new proto_cs.silkroad.play();
            e.gid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendOnePlay = function(t) {
            var e = new proto_cs.silkroad.rootPlay();
            e.gid = t;
            JsonHttp.send(e);
        };
        t.prototype.sendInfo = function() {
            JsonHttp.send(new proto_cs.silkroad.trade(), function() {
                i.utils.openPrefabView("trade/TradeView");
            });
        };
        return t;
    })();
o.TradeProxy = n;
