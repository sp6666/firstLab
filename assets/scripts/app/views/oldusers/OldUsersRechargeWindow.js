var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTitle = null;
            e.lblDes = null;
            return e;
        }
        e.prototype.onLoad = function () {

            facade.subscribe(
                n.oldUsersProxy.OLD_USERS_BACK,
                this.onDataUpdate,
                this
            );

            this.onDataUpdate();
        };
        e.prototype.onDataUpdate = function () {
            var order_rwd = n.oldUsersProxy.data.order_rwd;
            var regression = n.oldUsersProxy.regression;

            order_rwd.sort(this.sortList);

            this.curSelectData = regression.cons != undefined ? regression.cons : 0;
            this.lblTitle.string = i18n.t('OLD_USERS_CHARGE_TITLE');

            for (var e = 0, o = 0; o < order_rwd.length; o++) {
                if (e < order_rwd[o].items.length) {
                    e = order_rwd[o].items.length
                }
            }
            var i = Math.ceil(e / 5),
                l = 150 + 100 * i + 10 * (i - 1);
            this.list.setWidthHeight(630, l);

            this.list.data = order_rwd;
            //this.lblDes.string = t.cfg.msg ? t.cfg.msg : "";
        };
        e.prototype.sortList = function (t, e) {

            var regression = n.oldUsersProxy.regression;

            var o = t.id > regression.rwd ? -1 : 1,
                i = e.id > regression.rwd ? -1 : 1;
            return o != i ? o - i : t.id - e.id;
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;