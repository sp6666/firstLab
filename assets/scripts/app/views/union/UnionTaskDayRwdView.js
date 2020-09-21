var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLock = null;
            e.list = null;
            e.nodeBg = null;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this.node.openParam;
            this.lblLock.string = i18n.t("ACHIEVE_RWD_TYPE", {
                d: t.min
            });
            this.list.data = t.rwd;
            this.nodeBg.height =
                t.rwd.length > 5 ?
                this.nodeBg.height + 100 :
                this.nodeBg.height;
            this.list.node.x = -this.list.node.width / 2;
        };
        e.prototype.onClickClost = function () {
            l.utils.closeView(this);
        };
        __decorate([c(cc.RichText)], e.prototype, "lblLock", void 0);
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeBg", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;