var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblRank = null;
            e.lblScore = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("JIU_LOU_MY_RANK_DATA", this.myRankData, this);
            this.list.data = l.jiulouProxy.rankList;
            this.myRankData();
        };
        e.prototype.myRankData = function() {
            this.lblRank.string = l.jiulouProxy.myRank.rid + "";
            this.lblScore.string = l.jiulouProxy.myRank.score + "";
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
