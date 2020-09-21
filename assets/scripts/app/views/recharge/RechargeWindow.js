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
            facade.subscribe("LIMIT_ACTIVITY_UPDATE", this.onDataUpdate, this);
            var t = this.node.openParam;
            t && n.limitActivityProxy.sendLookActivityData(t.id);
        };
        e.prototype.onDataUpdate = function (t) {
            n.limitActivityProxy.curSelectData = t;
            this.lblTitle.string = t.cfg.info.title;
            t.cfg.rwd.sort(this.sortList);
            for (var e = 0, o = 0; o < t.cfg.rwd.length; o++)
                e < t.cfg.rwd[o].items.length &&
                (e = t.cfg.rwd[o].items.length);
            var i = Math.ceil(e / 5),
                l = 150 + 100 * i + 10 * (i - 1);
            this.list.setWidthHeight(630, l);
            this.list.data = t.cfg.rwd;
            this.lblDes.string = t.cfg.msg ? t.cfg.msg : "";
        };
        e.prototype.sortList = function (t, e) {
            var o = t.id > n.limitActivityProxy.curSelectData.rwd ? -1 : 1,
                i = e.id > n.limitActivityProxy.curSelectData.rwd ? -1 : 1;
            return o != i ? o - i : t.id - e.id;
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
            //这里添加 合服活动判断
            l.utils.openPrefabView("limitactivity/RechargeActivity");
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDes", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;