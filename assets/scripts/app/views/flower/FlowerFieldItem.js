var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../utils/UIUtils"),
    r = require("../../component/UrlLoad"),
    a = require("../../Initializer"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeCd = null;
            e.nodeUnlock = null;
            e.lblCd = null;
            e.lblUnlock = null;
            e.nodePlant = null;
            e.unplant = null;
            e.nodeSelect = null;
            e.urlload = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.nodeSelect.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                this.lblCd.string = "";
                this.lblCd.unscheduleAllCallbacks();
                this.nodePlant.active = this.nodeCd.active =
                    0 != t.pid && -1 != t.pid;
                this.unplant.node.active = 0 == t.pid || -1 == t.pid;
                this.nodeUnlock.active =
                    -1 == t.pid && a.flowerProxy.isNextUnlock(t.id);
                this.urlload.url = "";
                s.shaderUtils.setImageGray(this.unplant, -1 == t.pid);
                if (this.nodeCd.active) {
                    var e = localcache.getItem(localdb.table_flowerCore, t.pid),
                        o = t.sTime + e.time;
                    if (n.timeUtil.second > o)
                        this.lblCd.string = i18n.t("FLOWER_PLANT_CD_OVER");
                    else {
                        var i = this;
                        l.uiUtils.countDown(o, this.lblCd, function() {
                            i.lblCd.string = i18n.t("FLOWER_PLANT_CD_OVER");
                        });
                    }
                    this.urlload.url = l.uiHelps.getFlowerPlant(
                        t.pid,
                        a.flowerProxy.getStatu(t.sTime, e.time)
                    );
                }
                if (this.nodeUnlock.active) {
                    var r = this.nodeCd.active
                        ? null
                        : localcache.getItem(localdb.table_flowerFeild, t.id);
                    this.lblUnlock.string = i18n.t("FLOWER_UNLOCK_LEVEL", {
                        d: r.lv
                    });
                }
            }
        };
        __decorate([d(cc.Node)], e.prototype, "nodeCd", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeUnlock", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblCd", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblUnlock", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodePlant", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "unplant", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeSelect", void 0);
        __decorate([d(r.default)], e.prototype, "urlload", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
