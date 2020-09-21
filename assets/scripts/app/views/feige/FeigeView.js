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
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.unown = null;
            e.seColor = null;
            e.norColor = null;
            e.lblservant = null;
            e.lblson = null;
            e.selectImg = null;
            e.servantImg = null;
            e.sonImg = null;
            e.sonFeigeTip = null;
            e.topBtns = null;
            e.btnDelete = null;
            e.btnOneKey = null;
            e.scroll = null;
            e.curIndex = "0";
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(l.feigeProxy.UPDATE_READ, this.updateShow, this);
            facade.subscribe("UPDATE_READ_SON", this.updateSonFeige, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            this.topBtns.active = l.feigeProxy.getSonFeige().length > 0;
            var t = this.node.openParam;
            t && t.flag
                ? this.onClickTab(null, "1")
                : l.feigeProxy.hasSonFeige() && !l.feigeProxy.getIsHaveUnread()
                ? this.onClickTab(null, "1")
                : this.onClickTab(null, "0");
            for (var e = 0; e < 200; e++) Math.ceil(2 * Math.random());
        };
        e.prototype.updateShow = function() {
            this.list.data = l.feigeProxy.getOpenFeige();
        };
        e.prototype.onClickClost = function() {
            l.feigeProxy.readingSonMail
                ? i.alertUtil.alert18n("SON_IS_READING_MAIL")
                : i.utils.closeView(this, !0);
        };
        e.prototype.onClickTab = function(t, e) {
            if (l.feigeProxy.readingSonMail)
                i.alertUtil.alert18n("SON_IS_READING_MAIL");
            else {
                l.feigeProxy.lookSonFeige = "1" == e;
                this.lblservant.node.color =
                    "0" == e ? this.seColor : this.norColor;
                this.lblson.node.color =
                    "1" == e ? this.seColor : this.norColor;
                this.servantImg.spriteFrame = "0" == e ? this.selectImg : null;
                this.sonImg.spriteFrame = "1" == e ? this.selectImg : null;
                if ("0" == e) this.updateShow();
                else if ("1" == e) {
                    l.feigeProxy.getSonFeige().length > 100 &&
                        i.utils.showConfirm(
                            i18n.t("SON_FEI_GE_SHAN_CHU"),
                            function() {
                                l.sonProxy.sendDeleteMail();
                            }
                        );
                    this.updateSonFeige();
                }
                this.sonFeigeTip.active =
                    "1" == e && 0 == l.feigeProxy.getSonFeige().length;
                this.btnDelete.active =
                    "1" == e &&
                    l.feigeProxy.getSonFeige().length > 0 &&
                    this.hasReadedMail();
                this.btnOneKey.active =
                    "1" == e &&
                    l.feigeProxy.getSonFeige().length > 0 &&
                    null != l.feigeProxy.getUnReadSonMail();
                this.unown.active =
                    "0" == e &&
                    (null == this.list.data || 0 == this.list.data.length);
                this.scroll.scrollToTop();
            }
        };
        e.prototype.updateSonFeige = function() {
            this.list.data = l.feigeProxy.sonFeigeList;
            this.btnDelete.active =
                l.feigeProxy.getSonFeige().length > 0 &&
                l.feigeProxy.lookSonFeige &&
                this.hasReadedMail();
            this.btnOneKey.active =
                l.feigeProxy.getSonFeige().length > 0 &&
                null != l.feigeProxy.getUnReadSonMail();
        };
        e.prototype.onClickDelete = function() {
            l.feigeProxy.readingSonMail
                ? i.alertUtil.alert18n("SON_IS_READING_MAIL")
                : l.sonProxy.sendDeleteMail();
        };
        e.prototype.hasReadedMail = function() {
            for (var t = !1, e = 0; e < l.feigeProxy.sonFeigeList.length; e++)
                if (l.feigeProxy.sonFeigeList[e].select.length > 0) {
                    t = !0;
                    break;
                }
            return t;
        };
        e.prototype.onClickOneKeyRead = function() {
            l.playerProxy.userData.vip < 5
                ? i.alertUtil.alert18n("SON_FEI_GE_ONE_KEY_OPEN")
                : l.feigeProxy.sendOneKeyRead();
        };
        e.prototype.randomSelect = function(t) {
            var e = l.playerProxy.getEmailGroup(t.id, "group"),
                o = Math.ceil(2 * Math.random());
            return e[0]["award" + o];
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "unown", void 0);
        __decorate([s(cc.Color)], e.prototype, "seColor", void 0);
        __decorate([s(cc.Color)], e.prototype, "norColor", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblservant", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblson", void 0);
        __decorate([s(cc.SpriteFrame)], e.prototype, "selectImg", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "servantImg", void 0);
        __decorate([s(cc.Sprite)], e.prototype, "sonImg", void 0);
        __decorate([s(cc.Node)], e.prototype, "sonFeigeTip", void 0);
        __decorate([s(cc.Node)], e.prototype, "topBtns", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnDelete", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnOneKey", void 0);
        __decorate([s(cc.ScrollView)], e.prototype, "scroll", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
