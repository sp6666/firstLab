var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = (function() {
    function t() {
        this.UPDATE_TAOFA_FAIL = "UPDATE_TAOFA_FAIL";
        this.UPDATE_TAOFA_MYRAND = "UPDATE_TAOFA_MYRAND";
        this.UPDATE_TAOFA_PLAYINFO = "UPDATE_TAOFA_PLAYINFO";
        this.UPDATE_TAOFA_ROOTINFO = "UPDATE_TAOFA_ROOTINFO";
        this.UPDATE_TAOFA_SCORERANK = "UPDATE_TAOFA_SCORERANK";
        this.UPDATE_TAOFA_WIN = "UPDATE_TAOFA_WIN";
        this.fail = null;
        this.myRand = null;
        this.playerInfo = null;
        this.rootInfo = null;
        this.scoreRank = null;
        this.win = null;
    }
    t.prototype.ctor = function() {
        JsonHttp.subscribe(proto_sc.taofa.fail, this.onFail, this);
        JsonHttp.subscribe(proto_sc.taofa.myRand, this.onMyRand, this);
        JsonHttp.subscribe(proto_sc.taofa.playInfo, this.onPlayerInfo, this);
        JsonHttp.subscribe(proto_sc.taofa.rootInfo, this.onRootInfo, this);
        JsonHttp.subscribe(proto_sc.taofa.scoreRank, this.onScoreRank, this);
        JsonHttp.subscribe(proto_sc.taofa.win, this.onWin, this);
    };
    t.prototype.clearData = function() {
        this.fail = null;
        this.myRand = null;
        this.playerInfo = null;
        this.rootInfo = null;
        this.scoreRank = null;
        this.win = null;
    };
    t.prototype.onFail = function(t) {
        facade.send(this.UPDATE_TAOFA_FAIL);
    };
    t.prototype.onMyRand = function(t) {
        facade.send(this.UPDATE_TAOFA_MYRAND);
    };
    t.prototype.onPlayerInfo = function(t) {
        facade.send(this.UPDATE_TAOFA_PLAYINFO);
    };
    t.prototype.onRootInfo = function(t) {
        facade.send(this.UPDATE_TAOFA_ROOTINFO);
    };
    t.prototype.onScoreRank = function(t) {
        facade.send(this.UPDATE_TAOFA_SCORERANK);
    };
    t.prototype.onWin = function(t) {
        facade.send(this.UPDATE_TAOFA_WIN);
    };
    return t;
})();
o.TaofaProxy = i;
