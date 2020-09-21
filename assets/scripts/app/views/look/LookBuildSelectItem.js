var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/ShaderUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLock = null;
            e.url = null;
            e.img = null;
            e.nodeLock = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                l.shaderUtils.setImageGray(
                    this.img,
                    t.lock < r.playerProxy.userData.bmap
                );
                var e = localcache.getItem(localdb.table_bigPve, t.lock);
                this.lblLock.string = i18n.t("CELL_OPEN_TIP", {
                    n:
                        i18n.t("FIGHT_BIG_TIP", {
                            s: e.id
                        }) + e.name
                });
                this.nodeLock.active = t.lock < r.playerProxy.userData.bmap;
                this.url.url = a.uiHelps.getLookBuild(t.id);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblLock", void 0);
        __decorate([_(n.default)], e.prototype, "url", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "img", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLock", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
