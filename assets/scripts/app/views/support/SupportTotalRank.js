var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblrank = null;
            e.lblscore = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.list.data = n.supportProxy.totalList;
            this.lblrank.string =
                i18n.t("RAKN_MY_TIP") + " " + n.supportProxy.myRid.rid;
            this.lblscore.string =
                i18n.t("SUPPORT_MY_SCORE") + " " + n.supportProxy.myRid.score;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblrank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblscore", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
