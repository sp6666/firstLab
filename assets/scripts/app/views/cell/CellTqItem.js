var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblDes = null;
            e.head = null;
            e.btnGo = null;
            e.btnYjs = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = t.model.split("|");
                this.head.url = a.uiHelps.getRolePart(e[0]);
                this.lblName.string = t.name;
                this.lblDes.string = r.cellProxy.getTqStr(t);
                this.btnYjs.active = r.playerProxy.isUnlockCloth(t.id);
                this.btnGo.active = !r.playerProxy.isUnlockCloth(t.id);
            }
        };
        e.prototype.onClickGo = function() {
            l.utils.openPrefabView("user/UserClothe", null, {
                tab: 6
            });
            l.utils.closeNameView("cell/CellView");
            l.utils.closeNameView("cell/CellTqWindow");
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(n.default)], e.prototype, "head", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnGo", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnYjs", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
