var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = require("../../models/TimeProxy"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.curSelect = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this;
            this.list.data = l.qingMingProxy.pointArr;
            this.list.selectHandle = function(e) {
                e && e.id && (t.curSelect = e.id);
            };
        };
        e.prototype.onClickYes = function() {
            if (0 != this.curSelect) {
                if (0 != l.bagProxy.getItemCount(this.curSelect)) {
                    i.utils.closeView(this);
                    l.qingMingProxy.sendRoll(this.curSelect, 1);
                } else i.alertUtil.alertItemLimit(this.curSelect);
            } else i.alertUtil.alert18n("QING_MING_SELECT_POINT");
        };
        e.prototype.onClickGoGet = function() {
            r.funUtils.openView(r.funUtils.continuityrecharge.id);
            i.utils.closeView(this);
        };
        e.prototype.onCliclClose = function() {
            i.utils.closeView(this);
        };
        __decorate([c(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
