var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("./ChengHaoItem"),
    l = require("../../Initializer"),
    r = require("../../utils/Utils"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTime = null;
            e.chenghaoItem = null;
            e.bgSprite = null;
            e.timeNode = null;
            e.selectNode = null;
            e.lockNodeBg = null;
            e.lockNode = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_fashion, t.chid + "");
                this.chenghaoItem.data = e;
                if (t.getT <= 0) {
                    this.lockNode.active = this.lockNodeBg.active = !0;
                    this.timeNode.active = !1;
                } else {
                    this.timeNode.active = !0;
                    this.lockNode.active = this.lockNodeBg.active = !1;
                }
                this.selectNode.active =
                    t.chid == l.playerProxy.userData.chenghao;
                var o = this;
                0 == t.endT || null == t.endT
                    ? (this.lblTime.string = i18n.t("TITLE_FOREVER"))
                    : a.uiUtils.countDown(
                          t.endT,
                          this.lblTime,
                          function() {
                              o.lblTime.string = i18n.t("TITLE_TIME_END");
                          },
                          !0,
                          "",
                          null
                      );
            }
        };
        e.prototype.onClickSelect = function() {
            var t = this._data;
            if (t) {
                if (t.getT <= 0) {
                    var e = localcache.getItem(
                        localdb.table_fashion,
                        t.chid + ""
                    );
                    if (null == e) return;
                    r.utils.openPrefabView("chenghao/ChengHaoRetry", !0, e);
                    return;
                }
                if (0 != t.endT && l.chengHaoProxy.getLeftCd(t.endT) <= 0) {
                    r.alertUtil.alert18n("TITLE_TIME_END");
                    return;
                }
                l.chengHaoProxy.setChengHao(t.chid);
            }
        };
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(n.default)], e.prototype, "chenghaoItem", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "bgSprite", void 0);
        __decorate([_(cc.Node)], e.prototype, "timeNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "selectNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "lockNodeBg", void 0);
        __decorate([_(cc.Node)], e.prototype, "lockNode", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
