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
            e.btn = null;
            e.nodeGai = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.nodeGai.active = this.nodeTip.active =
                    0 == t.wid || null == t.wid;
                this.urlLoad.node.active = this.lblTime.node.active = !this
                    .nodeTip.active;
                this.lblTime.node.active &&
                0 != t.cd.next &&
                t.cd.next > r.timeUtil.second
                    ? l.uiUtils.countDown(
                          t.cd.next,
                          this.lblTime,
                          function() {
                              facade.send(a.kitchenProxy.UPDATE_KITCHEN_LIST);
                          },
                          !0
                      )
                    : this.lblTime.unscheduleAllCallbacks();
                (t.cd.next <= r.timeUtil.second || 0 == t.cd.next) &&
                    (this.lblTime.string = i18n.t("ACHIEVE_OVER"));
                var e = localcache.getItem(localdb.table_wife, t.wid);
                this.urlLoad.url =
                    0 != t.wid && null != t.wid && null != e
                        ? l.uiHelps.getWifeSmallBody(e.res)
                        : "";
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeTip", void 0);
        __decorate([_(n.default)], e.prototype, "urlLoad", void 0);
        __decorate([_(cc.Button)], e.prototype, "btn", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeGai", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
