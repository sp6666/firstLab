var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblTitle = null;
            e.lblTime = null;
            e.lblContent = null;
            e.list = null;
            e.btnGet = null;
            e.btnDelete = null;
            e.bottomImg = null;
            e.scroll = null;
            e.itemNode = null;
            e.nodeOpenUrl = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("MAIL_UPDATE", this.mailUpdate, this);
            var t = this.node.openParam;
            0 == t.mtype &&
                null == t.rts &&
                0 == t.rts &&
                l.mailProxy.sendOpenMail(t.id);
            if (t) {
                this.nodeOpenUrl.active = !n.stringUtil.isBlank(t.openUrl);
                this.lblTitle.string = i18n.has(t.mtitle)
                    ? i18n.t(t.mtitle)
                    : t.mtitle;
                this.lblTime.string = n.timeUtil.format(t.fts, "yyyy-MM-dd");
                this.lblContent.string = l.mailProxy.getMailContent(t.mcontent);
                if (1 == t.mtype && 0 == t.rts) {
                    this.list.node.active = !0;
                    this.list.data = t.items;
                    this.itemNode.x = -this.list.node.width / 2 + 10;
                    if (t.items.length > 4) {
                        this.bottomImg.height = 300;
                        this.lblTime.node.y = -20;
                        this.itemNode.y = 7;
                        this.scroll.node.height = 220;
                    } else {
                        this.itemNode.y = -95;
                        this.bottomImg.height = 400;
                        this.lblTime.node.y = -120;
                        this.scroll.node.height = 320;
                    }
                } else {
                    this.bottomImg.height = 510;
                    this.lblTime.node.y = -232;
                    this.list.node.active = !1;
                    this.scroll.node.height = 440;
                }
                this.btnGet.active =
                    1 == t.mtype && (t.rts <= 0 || null == t.rts);
                this.curId = t.id;
                this.mailUpdate();
            }
        };
        e.prototype.mailUpdate = function() {
            var t = l.mailProxy.getMail(this.curId);
            if (t) {
                this.btnGet.active =
                    1 == t.mtype && (t.rts <= 0 || null == t.rts);
                this.btnDelete.active = 0 == t.mtype || 0 != t.rts;
            }
        };
        e.prototype.onClickDelete = function() {
            var t = this;
            n.utils.showConfirm(i18n.t("MAIN_DELETE_CUR"), function() {
                l.mailProxy.sendDelete(t.curId);
                n.utils.closeView(t);
            });
        };
        e.prototype.onClickGet = function() {
            l.mailProxy.sendReadMail(this.curId);
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.onClickUrl = function() {
            var t = this.node.openParam;
            if(!n.stringUtil.isBlank(t.openUrl))
            {
                cc.sys.openURL(t.openUrl);
            }
        };
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblContent", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnGet", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnDelete", void 0);
        __decorate([s(cc.Node)], e.prototype, "bottomImg", void 0);
        __decorate([s(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([s(cc.Node)], e.prototype, "itemNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeOpenUrl", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
