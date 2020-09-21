var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btnChenLu = null;
            e.btnYuanBao = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.onChenLu = function() {
            i.utils.openPrefabView("flower/FlowerProtect", !1, {
                type: 1
            });
            i.utils.closeView(this);
        };
        e.prototype.onYuanBao = function() {
            i.utils.openPrefabView("flower/FlowerProtect", !1, {
                type: 2
            });
            i.utils.closeView(this);
        };
        e.prototype.onCloseSelect = function() {
            i.utils.closeView(this);
        };
        __decorate([r(cc.Button)], e.prototype, "btnChenLu", void 0);
        __decorate([r(cc.Button)], e.prototype, "btnYuanBao", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
