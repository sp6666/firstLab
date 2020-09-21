var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblGx = null;
            e.list = null;
            e.lblLuck = null;
            e.lblDraw = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("UNION_SHOP_UPDATE", this.onDataUodate, this);
            facade.subscribe("UPDATE_MEMBER_INFO", this.onDataUodate, this);
            this.onDataUodate();
        };
        e.prototype.onDataUodate = function () {
            this.UPDATE_SHOP_LIST();
            this.UPDATE_MEMBER_INFO();
            this.lblLuck.string = '' + l.unionProxy.memberInfo.luck;


            var set = l.unionProxy.getUnionData(l.unionProxy.clubInfo.level);

            this.lblDraw.string = (set.lottery - l.unionProxy.memberInfo.draw_times) + '/' + set.lottery;
        };
        e.prototype.eventClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickConver = function (t, e) {
            var o = e.data;
            if (o) {
                if (l.unionProxy.memberInfo.leftgx < o.payGX) {
                    n.alertUtil.alert(i18n.t("union_gx_limit"));
                    return;
                }
                l.unionProxy.sendCovert(o.id);
            }
        };
        e.prototype.UPDATE_SHOP_LIST = function () {
            this.list.data = l.unionProxy.shopList.sort(function (t, e) {
                return t.lock - e.lock;
            });
        };
        e.prototype.UPDATE_MEMBER_INFO = function () {
            var t = l.unionProxy.memberInfo;
            t && (this.lblGx.string = i18n.t("UNION_CUR_GONG_XIAN") + t.leftgx);
        };
        __decorate([s(cc.Label)], e.prototype, "lblLuck", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDraw", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGx", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;