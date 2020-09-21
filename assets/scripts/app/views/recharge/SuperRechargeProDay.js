var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    l = require("../../Initializer"),
    srp = require("./SuperRechargePro"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle1 = null;
            e.lblTitle = null;
            e.srpCom = null;
            e.day = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            this.lblTitle1.string = i18n.t("LIMIT_SUPER_RECHARGE_DAYS", {
                day: this.day
            });
            this.lblTitle.string = i18n.t("LIMIT_SUPER_RECHARGE_DAYS", {
                day: this.day
            });

            this.node.on('toggle', this.chosen, this);

            this.first = true;
            facade.subscribe(
                l.limitActivityProxy.SUPER_RECHARGE_PRO_UPDATE,
                this.onDataUpdate,
                this
            );
        };

        e.prototype.onDataUpdate = function () {
            if (this.first) {
                this.node.getComponent(cc.Toggle).isChecked = this.day === l.limitActivityProxy.superRechargePro.now;
                if (this.node.getComponent(cc.Toggle).isChecked) {
                    this.chosen();
                }
                this.first = false;
            }
        };

        e.prototype.chosen = function () {

            this.srpCom.onDataUpdate(this.day);
        }

        __decorate([s(srp.default)], e.prototype, "srpCom", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTitle1", void 0);
        __decorate([s(cc.Integer)], e.prototype, "day", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;