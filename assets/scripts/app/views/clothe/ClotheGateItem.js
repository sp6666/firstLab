var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/ShaderUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGate = null;
            e.lblName = null;
            e.nodeOver = null;
            e.nodeUnover = null;
            e.bg = null;
            e.bg1 = null;
            e.sp = null;
            e.nodeZhi = null;
            return e;
        }
        e.prototype.onClickBtn = function() {
            var t = this.data;
            if (t) {
                if (
                    l.clothePveProxy.info &&
                    l.clothePveProxy.info.info.eTime < n.timeUtil.second
                ) {
                    n.alertUtil.alert18n("ACTHD_OVERDUE");
                    return;
                }
                n.utils.openPrefabView("clothe/ClotheItem", !1, t);
            }
        };
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                var e = localcache.getItem(localdb.table_clothepve, t.gateid);
                this.lblGate.string = i18n.t("CLOTHE_PVE_GATE", {
                    d: n.utils.getHanzi(t.id)
                });
                this.lblName.string = e ? e.name : "";
                if (null != l.clothePveProxy.base) {
                    this.sp.node.active = this.nodeOver.active =
                        t.id <= l.clothePveProxy.base.gate;
                    this.nodeZhi.active = this.nodeUnover.active =
                        t.id > l.clothePveProxy.base.gate;
                    r.shaderUtils.setImageGray(
                        this.bg,
                        t.id > l.clothePveProxy.base.gate + 1
                    );
                    r.shaderUtils.setImageGray(
                        this.bg1,
                        t.id > l.clothePveProxy.base.gate + 1
                    );
                }
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblGate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeOver", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeUnover", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "bg1", void 0);
        __decorate([c(sp.Skeleton)], e.prototype, "sp", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeZhi", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
