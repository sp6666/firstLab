var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblMyRank = null;
            e.lblMyName = null;
            e.lblMyScore = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.lblMyName.string = l.playerProxy.userData.name;
            this.lblMyRank.string = l.qingMingProxy.myRid.rid + "";
            this.lblMyScore.string = l.qingMingProxy.myRid.score + "";
            this.list.data = l.qingMingProxy.ranks;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyScore", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
