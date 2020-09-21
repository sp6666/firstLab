var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/ShaderUtils"),
    s = require("../../utils/Utils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeUnlock = null;
            e.url = null;
            e.lblName = null;
            e.img = null;
            e.img2 = null;
            return e;
        }
        e.prototype.onClickInfo = function() {
            var t = this.data;
            t && s.utils.openPrefabView("ItemInfo", !1, t);
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = r.playerProxy.isUnlockCloth(t.id),
                    o = localcache.getItem(localdb.table_userClothe, t.id);
                a.shaderUtils.setImageGray(this.img, !e);
                a.shaderUtils.setImageGray(this.img2, !e);
                this.lblName.string = o ? o.name : "";
                this.nodeUnlock.active = !e;
                var i = o.model.split("|");
                this.url.url = l.uiHelps.getRolePart(i[0]);
            }
        };
        __decorate([d(cc.Node)], e.prototype, "nodeUnlock", void 0);
        __decorate([d(n.default)], e.prototype, "url", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "img", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "img2", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
