var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.selectImg = null;
            e.icon = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.selectImg.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.onLoad = function() {};
        e.prototype.showData = function() {};
        e.prototype.onClickItem = function(t, e) {
            if (n.qingMingProxy.isSelf)
                l.alertUtil.alert18n("QING_MING_ZHENG_ZAI_ZI_DONG");
            else {
                var o = parseInt(e);
                if (
                    n.qingMingProxy.vehicleIndex != o &&
                    n.qingMingProxy.cfg.vehicle.length > o
                )
                    if (
                        n.qingMingProxy.rollData.cons >=
                        n.qingMingProxy.cfg.vehicle[o].score
                    ) {
                        n.qingMingProxy.vehicleIndex = o;
                        l.alertUtil.alert(
                            i18n.t("QING_MING_QIE_HUAN", {
                                name: n.qingMingProxy.cfg.vehicle[o].name
                            })
                        );
                        facade.send(n.qingMingProxy.QING_MING_UPDATE_VEHICLE);
                    } else
                        l.alertUtil.alert(
                            i18n.t("QING_MING_SCORE_LOCK", {
                                num: n.qingMingProxy.cfg.vehicle[o].score,
                                name: n.qingMingProxy.cfg.vehicle[o].name
                            })
                        );
            }
        };
        __decorate([s(cc.Node)], e.prototype, "selectImg", void 0);
        __decorate([s(cc.Node)], e.prototype, "icon", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
