var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../user/UserHeadItem"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblname = null;
            e.lblhaogan = null;
            e.userHead = null;
            e.lblrank = null;
            e.rankNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblname.string = t.name;
                this.lblhaogan.string = i18n.t("BOSS_XIAN_LI_TXT") + t.num;
                this.userHead.setUserHead(t.job, t.headavatar);
                this.lblrank.string = t.id + "";
                this.rankNode.active = t.id > 3;
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblname", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblhaogan", void 0);
        __decorate([a(n.default)], e.prototype, "userHead", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblrank", void 0);
        __decorate([a(cc.Node)], e.prototype, "rankNode", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
