var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("./LanternItemRender"),
    a = require("../../utils/UIUtils"),
    s = require("../../models/TimeProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblCount = null;
            e.lblTRecharge = null;
            e.lblDes = null;
            e.lblTime = null;
            e.items = [];
            e.records = null;
            e.scroll = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.lanternProxy.LANTERN_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            facade.subscribe(
                l.lanternProxy.LANTERN_RECORD_UPDATE,
                this.onRecords,
                this
            );
            l.lanternProxy.sendOpenActivity();
        };
        e.prototype.onDataUpdate = function() {
            if (l.lanternProxy.data) {
                for (var t = 0; t < l.lanternProxy.data.draw.length; t++)
                    t < this.items.length &&
                        (this.items[t].data = l.lanternProxy.data.draw[t]);
                this.lblCount.string = i18n.t("LANTERN_LIGHT_COUNT", {
                    num: l.lanternProxy.data.light
                });
                this.lblDes.string = i18n.t("LAN_TERN_DES_TXT", {
                    num: l.lanternProxy.data.need
                });
                var e = this;
                a.uiUtils.countDown(
                    l.lanternProxy.data.info.showTime,
                    this.lblTime,
                    function() {
                        e.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    },
                    !0,
                    "USER_REMAIN_TIME",
                    "d"
                );
            }
        };
        e.prototype.onRecords = function() {
            this.records.data = l.lanternProxy.records;
            this.scroll.scrollToBottom();
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickRecharge = function() {
            s.funUtils.openView(s.funUtils.recharge.id);
        };
        __decorate([d(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTRecharge", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([d([r.default])], e.prototype, "items", void 0);
        __decorate([d(i.default)], e.prototype, "records", void 0);
        __decorate([d(cc.ScrollView)], e.prototype, "scroll", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
