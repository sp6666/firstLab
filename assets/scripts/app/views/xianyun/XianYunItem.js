var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
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
            e.servantUrl = null;
            e.lblTime = null;
            e.lockNode = null;
            e.lblAnzhi = null;
            e.isLock = !0;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (null != t) {
                var e = t.id,
                    o = l.xianyunProxy.getDeskInfo(t.id);
                this.isLock = e <= l.xianyunProxy.base.desk;
                this.lockNode.active = !this.isLock;
                this.lblTime.node.active = this.servantUrl.node.active =
                    o && o.hid && 0 != o.hid && this.isLock;
                this.lblAnzhi.active = (null == o || 0 == o.hid) && this.isLock;
                if (o && o.hid && 0 != o.hid) {
                    this.servantUrl.url = a.uiHelps.getServantSmallSpine(o.hid);
                    var i = this;
                    a.uiUtils.countDown(
                        o.cd.next,
                        this.lblTime,
                        function() {
                            i.lblTime.string = i18n.t(
                                "XIAN_YUN_YI_GUI_LAI_TXT"
                            );
                        },
                        !0,
                        "XIAN_YUN_GUI_LAI",
                        "time"
                    );
                }
            }
        };
        e.prototype.onClickItem = function() {
            if (this.isLock) {
                var t = this._data;
                l.xianyunProxy.curSelectIndex = t.id;
                var e = l.xianyunProxy.getDeskInfo(t.id);
                if (e && 0 != e.cd.next && 0 != e.hid)
                    if (r.timeUtil.second >= e.cd.next)
                        l.xianyunProxy.sendZhaohui(t.id, 0);
                    else {
                        var o = e.cd.next - r.timeUtil.second,
                            i = Math.ceil(o / 86400),
                            n = l.xianyunProxy.recall.cash * i;
                        r.utils.showConfirmItem(
                            i18n.t("XIAN_YUN_TI_QIAN_TXT", {
                                num: n
                            }),
                            1,
                            l.playerProxy.userData.cash,
                            function() {
                                l.playerProxy.userData.cash < n
                                    ? r.alertUtil.alertItemLimit(1)
                                    : l.xianyunProxy.sendZhaohui(t.id, 1);
                            }
                        );
                    }
                else r.utils.openPrefabView("xianyun/XianYunSelect");
            } else {
                var a = l.xianyunProxy.getDeskPrice(
                    l.xianyunProxy.base.desk + 1
                );
                r.utils.showConfirmItem(
                    i18n.t("XIAN_YUN_KAI_QI_TXT", {
                        num: a.cash
                    }),
                    1,
                    l.playerProxy.userData.cash,
                    function() {
                        l.playerProxy.userData.cash < a.cash
                            ? r.alertUtil.alertItemLimit(1)
                            : l.xianyunProxy.sendAddDesk();
                    }
                );
            }
        };
        __decorate([_(n.default)], e.prototype, "servantUrl", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Node)], e.prototype, "lockNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "lblAnzhi", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
