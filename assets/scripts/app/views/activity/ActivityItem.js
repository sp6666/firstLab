var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/RedDot"),
    l = require("../../component/UrlLoad"),
    r = require("../../models/TimeProxy"),
    a = require("../../Initializer"),
    s = require("../../utils/UIUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.reddot = null;
            e.btnimg = null;
            e.btnEff = null;
            return e;
        }
        e.prototype.onClickItem = function () {
            var t = this._data;
            if (t) {
                var e = a.limitActivityProxy.getActivityData(t.id);
                e &&
                    e.id == a.limitActivityProxy.SNOWMAN_ID &&
                    e.hdtype &&
                    2 == e.hdtype ?
                    r.funUtils.openView(r.funUtils.spring.id) :
                    e && e.id == a.limitActivityProxy.GAO_DIAN_ID ?
                    r.funUtils.openView(r.funUtils.gaodian.id) :
                    r.funUtils.openView(t.funitem.id);
            }
        };
        e.prototype.updateShow = function () {
            var t = this._data;
            t &&
                (this.node.active =
                    a.limitActivityProxy.isHaveTypeActive(t.id) &&
                    r.funUtils.isOpenFun(t.funitem));
        };
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                this.reddot.addBinding(t.binding);
                this.updateShow();
                var e = a.limitActivityProxy.getActivityData(t.id),
                    o =
                    e &&
                    e.id == a.limitActivityProxy.SNOWMAN_ID &&
                    e.hdtype &&
                    2 == e.hdtype,
                    i = t.url.split("|");

                t.isEff = 1;
                2 == t.isEff ?
                    o ?
                    (this.btnimg.url = s.uiHelps.getActivityBtn(i[1])) :
                    (this.btnEff.url = s.uiHelps.getActivityUrl(i[0])) :
                    (this.btnimg.url = s.uiHelps.getActivityBtn(i[0]));
                this.btnimg.node.active = 2 != t.isEff || o;
                this.btnEff.node.active = 2 == t.isEff;
            }
        };
        __decorate([d(n.default)], e.prototype, "reddot", void 0);
        __decorate([d(l.default)], e.prototype, "btnimg", void 0);
        __decorate([d(l.default)], e.prototype, "btnEff", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;