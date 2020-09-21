var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../utils/Utils"),
    a = require("../../Initializer"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.nodeTip = null;
            e.urlLoad = null;
            return e;
        }
        e.prototype.onClickSelect = function() {
            var t = this._data;
            t &&
                (0 == t.hid || null == t.hid
                    ? r.utils.openPrefabView("book/BookSelectView", !1, t)
                    : t.cd && t.cd.next <= r.timeUtil.second
                    ? a.bookProxy.sendOver(t.id)
                    : r.alertUtil.alert18n("BOOK_TIME_LIMIT"));
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.nodeTip.active = 0 == t.hid || null == t.hid;
                this.urlLoad.node.active = this.lblTime.node.active = !this
                    .nodeTip.active;
                this.lblTime.node.active &&
                0 != t.cd.next &&
                t.cd.next > r.timeUtil.second
                    ? l.uiUtils.countDown(
                          t.cd.next,
                          this.lblTime,
                          function() {
                              facade.send(a.bookProxy.UPDATE_BOOK_LIST);
                          },
                          !0
                      )
                    : this.lblTime.unscheduleAllCallbacks();
                t.cd.next <= r.timeUtil.second &&
                    (this.lblTime.string = i18n.t("ACHIEVE_OVER"));
                this.urlLoad.url =
                    0 != t.hid ? l.uiHelps.getServantSmallSpine(t.hid) : "";
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeTip", void 0);
        __decorate([_(n.default)], e.prototype, "urlLoad", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
