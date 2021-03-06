var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../models/TimeProxy"),
    s = require("../../component/List"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblDes = null;
            e.lblTarget = null;
            e.nodeGo = null;
            e.nodeGet = null;
            e.nodeFin = null;
            e.urlload = null;
            e.rwdGroup = null;
            return e;
        }
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                var e = l.unionProxy.getDailyTask(t.id),
                    o = e ? e.num : 0;
                if (o > t.num) {
                    o = t.num;
                }
                this.lblDes.string = t.title;
                this.lblTarget.string = i18n.t("ACHIEVE_TARGET", {
                    c: o,
                    m: t.num
                });
                this.rwdGroup.data = t.rwd;
                if (!e) {
                    this.nodeGo.active = true;
                    this.nodeGet.active = false;
                    this.nodeFin.active = false;
                } else {
                    this.nodeGo.active = o < t.num && 1 != e.status;
                    this.nodeGet.active = o >= t.num && 1 != e.status;
                    this.nodeFin.active = 1 == e.status;
                }

                this.urlload.url = r.uiHelps.getTaskIcon('u' + t.id);
            }
        };
        e.prototype.onClickGo = function () {
            var t = this._data;
            t && a.funUtils.openView(t.jumpTo);
        };
        e.prototype.onClickGet = function () {
            var t = this._data;
            t && l.unionProxy.sendDailyTask(t.id);
        };
        __decorate([d(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTarget", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeGo", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeGet", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeFin", void 0);
        __decorate([d(n.default)], e.prototype, "urlload", void 0);
        __decorate([d(s.default)], e.prototype, "rwdGroup", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;