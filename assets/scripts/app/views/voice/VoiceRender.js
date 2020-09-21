var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../utils/Utils"),
    s = require("../../component/LabelShadow"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.leftNameUrl = null;
            e.lefeRoleUrl = null;
            e.leftLblTalk = null;
            e.leftLblPrice = null;
            e.leftPriceNode = null;
            e.leftBtnDown = null;
            e.leftDowned = null;
            e.rightNameUrl = null;
            e.rightRoleUrl = null;
            e.rightLblTalk = null;
            e.rightLblPrice = null;
            e.rightPriceNode = null;
            e.rightBtnDown = null;
            e.rightDowned = null;
            e.bg = null;
            e.bgArr = [];
            e.leftNode = null;
            e.rightNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if (1 == t.type) {
                    this.lefeRoleUrl.url = this.rightRoleUrl.url = l.uiHelps.getServantSpine(
                        t.id
                    );
                    this.leftNameUrl.url = this.rightNameUrl.url = l.uiHelps.getVoiceName(
                        t.type,
                        t.id
                    );
                } else if (2 == t.type) {
                    var e = localcache.getItem(localdb.table_wife, t.id);
                    this.lefeRoleUrl.url = this.rightRoleUrl.url = l.uiHelps.getServantSpine(
                        e.res
                    );
                    this.leftNameUrl.url = this.rightNameUrl.url = l.uiHelps.getVoiceName(
                        t.type,
                        t.id
                    );
                }
                this.lefeRoleUrl.node.y = this.rightRoleUrl.node.y = r.voiceProxy.getPos(
                    t.type,
                    t.id
                );
                this.leftLblPrice.string = this.rightLblPrice.string =
                    t.need + "";
                this.leftLblTalk.string = t.msg;
                this.rightLblTalk.string = t.msg;
                for (var o = !0, i = 0; i < t.voiceid.length; i++)
                    if (!r.voiceProxy.isHaveHeroVoice(t.type, t.voiceid[i])) {
                        o = !1;
                        break;
                    }
                this.leftPriceNode.active = this.rightPriceNode.active = !o;
                var n = a.audioManager.isNeedDown();
                this.leftBtnDown.active = this.rightBtnDown.active = o && n;
                this.leftDowned.active = this.rightDowned.active = o && !n;
                var s = r.voiceProxy.voiceCfg.indexOf(t),
                    c = s % 4;
                this.bg.spriteFrame = this.bgArr[c];
                this.leftNode.active = s % 2 == 0;
                this.rightNode.active = s % 2 == 1;
            }
        };
        e.prototype.onClickBuy = function() {
            var t = this._data,
                e = null;
            1 == t.type
                ? (e = r.servantProxy.getHeroData(t.id))
                : 2 == t.type && (e = r.wifeProxy.getWifeData(t.id));
            null != e
                ? 0 != this.leftPriceNode.active
                    ? a.utils.showConfirmItem(
                          i18n.t("VOICE_BUY_TIP", {
                              num: t.need
                          }),
                          1,
                          r.playerProxy.userData.cash,
                          function() {
                              r.playerProxy.userData.cash < t.need
                                  ? a.alertUtil.alertItemLimit(1)
                                  : r.voiceProxy.sendBugVoice(t.uid);
                          },
                          "VOICE_BUY_TIP"
                      )
                    : a.alertUtil.alert18n("VOICE_ALRAEDY_HAVE")
                : a.alertUtil.alert18n("VOICE_WITHOUT_ROLE");
        };
        e.prototype.onClickDown = function() {
            facade.send("DOWNLOAD_SOUND");
        };
        __decorate([d(n.default)], e.prototype, "leftNameUrl", void 0);
        __decorate([d(n.default)], e.prototype, "lefeRoleUrl", void 0);
        __decorate([d(s.default)], e.prototype, "leftLblTalk", void 0);
        __decorate([d(cc.Label)], e.prototype, "leftLblPrice", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftPriceNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftBtnDown", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftDowned", void 0);
        __decorate([d(n.default)], e.prototype, "rightNameUrl", void 0);
        __decorate([d(n.default)], e.prototype, "rightRoleUrl", void 0);
        __decorate([d(s.default)], e.prototype, "rightLblTalk", void 0);
        __decorate([d(cc.Label)], e.prototype, "rightLblPrice", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightPriceNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightBtnDown", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightDowned", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "bg", void 0);
        __decorate([d([cc.SpriteFrame])], e.prototype, "bgArr", void 0);
        __decorate([d(cc.Node)], e.prototype, "leftNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "rightNode", void 0);
        return (e = __decorate([_], e));
    })(i.default);
o.default = u;
