var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.giftList = null;
            e.buyList = null;
            e.lblTime = null;
            e.btns = [];
            e.scroll1 = null;
            e.scroll2 = null;
            e.red = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                l.levelGiftProxy.LEVEL_GIFT_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            l.levelGiftProxy.sendOpenActivity();
            this.onClickTab(null, "0");
        };
        e.prototype.onDataUpdate = function() {
            var t = this,
                e = l.levelGiftProxy.data;
            if (e) {
                var o = [],
                    i = [];
                for (var a in e.free) o.push(e.free[a]);
                for (var a in e.charge) i.push(e.charge[a]);
                o.sort(function(t, e) {
                    return t.isget == e.isget ? t.lv - e.lv : t.isget - e.isget;
                });
                this.giftList.data = o;
                this.buyList.data = i;
                r.uiUtils.countDown(e.info.showTime, this.lblTime, function() {
                    n.timeUtil.second >= e.info.showTime &&
                        (t.lblTime.string = i18n.t("ACTHD_OVERDUE"));
                });
                this.red.active = l.levelGiftProxy.hasRed();
            }
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickTab = function(t, e) {
            for (var o = 0; o < this.btns.length; o++)
                this.btns[o].interactable = o != parseInt(e);
            this.scroll1.active = "0" == e;
            this.scroll2.active = "1" == e;
        };
        __decorate([c(i.default)], e.prototype, "giftList", void 0);
        __decorate([c(i.default)], e.prototype, "buyList", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([c([cc.Button])], e.prototype, "btns", void 0);
        __decorate([c(cc.Node)], e.prototype, "scroll1", void 0);
        __decorate([c(cc.Node)], e.prototype, "scroll2", void 0);
        __decorate([c(cc.Node)], e.prototype, "red", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
