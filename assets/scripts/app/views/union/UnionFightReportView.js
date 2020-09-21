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
            e.lblName = null;
            e.lblRank = null;
            e.lblHurt = null;
            e.lblGx = null;
            e.lblTip = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = {};
            t.name = n.unionProxy.fightRank.kill;
            t.lv = n.unionProxy.openCopyParam.id;
            t.exp = n.unionProxy.openCopyParam.rew.exp;
            this.lblTip.string = i18n.t("union_killboss", t);
            this.lblName.string = n.unionProxy.myFightRankInfo.name;
            this.lblRank.string = n.unionProxy.myFightRankInfo.rid + "";
            this.lblGx.string = n.unionProxy.myFightRankInfo.gx + "";
            this.lblHurt.string = n.unionProxy.myFightRankInfo.hit + "";
            this.list.data = n.unionProxy.fightRank.list;
        };
        e.prototype.eventClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblHurt", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGx", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTip", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
