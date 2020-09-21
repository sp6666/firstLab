var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../models/TimeProxy"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle_1 = null;
            e.lblTitle_2 = null;
            e.lblCur = null;
            e.lblTotal = null;
            e.lblDes = null;
            e.btnNode = null;
            e.btnLeft = null;
            e.btnRight = null;
            e.loadIcon = null;
            e.iconUrl = null;
            e.curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function () {
            r.uiUtils.scaleRepeat(this.btnLeft, 0.9, 1.2);
            r.uiUtils.scaleRepeat(this.btnRight, 0.9, 1.2);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
            i.timeProxy.getActivityNotice() && this.showNotice();
        };
        e.prototype.showNotice = function () {
            var t = this,
                e = i.timeProxy.getActivityNotice(),
                o = e[this.curIndex];
            if (o) {
                this.iconUrl.url = o.pictureAddress;
                this.iconUrl.loadHandle = function () {
                    t.loadIcon.active = !1;
                };
                this.lblTitle_1.string = o.title1;
                this.lblTitle_2.string = o.title2;
                this.lblCur.string = this.curIndex + 1 + "";
                this.lblTotal.string = e.length + "";
                this.lblDes.string = o.cuntent;
                this.btnLeft.active = this.curIndex > 0;
                this.btnRight.active = this.curIndex < e.length - 1;
            }
        };
        e.prototype.onClickLeft = function () {
            if (this.curIndex > 0) {
                this.curIndex--;
                this.showNotice();
            }
        };
        e.prototype.onClickRight = function () {
            if (this.curIndex < i.timeProxy.getActivityNotice().length - 1) {
                this.curIndex++;
                this.showNotice();
            }
        };
        e.prototype.onClickGo = function () {
            var t = i.timeProxy.getActivityNotice()[this.curIndex];
            1 == t.isOpenUrl ?
                cc.sys.openURL(t.openUrl) :
                a.funUtils.openView(t.iconOpenID);
            this.onClickClose();
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
            i.flowerProxy.showAutoShow();
            if (i.oldUsersProxy.bOldUser()) {
                l.utils.openPrefabView("oldusers/OldUsersBannerView");
            }
            facade.send("CLOSE_BANNER");
        };
        __decorate([_(cc.Label)], e.prototype, "lblTitle_1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTitle_2", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblCur", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnLeft", void 0);
        __decorate([_(cc.Node)], e.prototype, "btnRight", void 0);
        __decorate([_(cc.Node)], e.prototype, "loadIcon", void 0);
        __decorate([_(n.default)], e.prototype, "iconUrl", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;