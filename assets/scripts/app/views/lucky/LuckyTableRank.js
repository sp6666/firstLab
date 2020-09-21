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
            e.lblScore = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (1 == t.type) {
                this.list.data = n.luckyTableProxy.dayRank;
                this.lblScore.string = i18n.t("LUCKY_TABLE_JIN_RI");
            } else if (2 == t.type) {
                this.list.data = n.luckyTableProxy.totalRank;
                this.lblScore.string = i18n.t("LUCKY_TABLE_ZONG_YUAN_FEN");
            }
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
