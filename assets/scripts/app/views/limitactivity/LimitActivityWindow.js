var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblTitle = null;
            e.lblNewTip = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("LIMIT_ACTIVITY_UPDATE", this.onDataUpdate, this);
            var t = this.node.openParam;
            t && l.limitActivityProxy.sendLookActivityData(t.id);
            this.lblNewTip.node.active = false;
        };
        e.prototype.onDataUpdate = function (t) {
            l.limitActivityProxy.curSelectData = t;
            this.lblNewTip.node.active = t.is_new;
            this.lblTitle.string = t.cfg.info.title;
            t.cfg.rwd.sort(this.sortList);
            for (var e = 0, o = 0; o < t.cfg.rwd.length; o++)
                e < t.cfg.rwd[o].items.length &&
                (e = t.cfg.rwd[o].items.length);
            var i = Math.ceil(e / 5),
                n = 150 + 100 * i + 10 * (i - 1);
            this.list.setWidthHeight(630, n);
            this.list.data = t.cfg.rwd;
        };
        e.prototype.sortList = function (t, e) {
            var o = t.id > l.limitActivityProxy.curSelectData.rwd ? -1 : 1,
                i = e.id > l.limitActivityProxy.curSelectData.rwd ? -1 : 1;
            return o != i ? o - i : t.id - e.id;
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this);
            i.utils.openPrefabView("limitactivity/LimitActivityView");
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblNewTip", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;