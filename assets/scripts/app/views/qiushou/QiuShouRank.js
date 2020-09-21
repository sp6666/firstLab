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
            e.myRank = null;
            e.myName = null;
            e.myNum = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.myRank.string =
                l.qiushouProxy.myRid.rid > 0
                    ? l.qiushouProxy.myRid.rid + ""
                    : i18n.t("RAKN_UNRANK");
            this.myName.string = l.playerProxy.userData.name;
            this.myNum.string = l.qiushouProxy.myRid.score + "";
            this.list.data = l.qiushouProxy.finalRank;
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "myRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "myName", void 0);
        __decorate([s(cc.Label)], e.prototype, "myNum", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
