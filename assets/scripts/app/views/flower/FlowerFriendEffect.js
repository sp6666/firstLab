var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    ut = require("../../utils/Utils"),
    l = require("../../component/UrlLoad"),
    r = require("../../models/TimeProxy"),
    a = require("../../Initializer"),
    s = require("../../utils/UIUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnimg = null;
            e.btnEff = null;
            return e;
        }
        e.prototype.onClose = function () {
            ut.utils.closeView(this);
        };

        e.prototype.onEnable = function () {
            this.showData(a.flowerFriendProxy.effectId);
            this.scheduleOnce(this.onClose, 5);
        };

        e.prototype.showData = function (id) {
            this.btnimg.url = s.uiHelps.getFlowerEffectPic('huafang' + id);
            this.btnEff.url = s.uiHelps.getFlowerEffectSpine('' + id);
        };
        __decorate([d(l.default)], e.prototype, "btnimg", void 0);
        __decorate([d(l.default)], e.prototype, "btnEff", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;