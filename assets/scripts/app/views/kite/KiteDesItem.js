var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblKiteDes = null;
            e.lblKiteHp = null;
            e.lblKiteSpeed = null;
            e.lblKiteStatus = null;
            e.iID = 0;
            return e;
        }
        e.prototype.onEnable = function () {

            var kite = n.kiteProxy.getKiteById(this.iID);
            var kiteConfig = localcache.getItem(
                localdb.table_kite,
                this.iID
            );

            this.lblKiteDes.string = kiteConfig.des;
            this.lblKiteHp.string = i18n.t('KITE_MAX_HP', {
                n: kite.durability
            });
            this.lblKiteSpeed.string = i18n.t('KITE_SPEED', {
                n: kite.height
            });
            this.lblKiteStatus.node.active = kite.need !== 0;
            this.lblKiteStatus.string = i18n.t('KITE_PROGRESS', {
                n: kite.windCount + '/' + kite.need
            });
        };

        __decorate([a(cc.Integer)], e.prototype, "iID", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblKiteDes", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblKiteHp", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblKiteSpeed", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblKiteStatus", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;