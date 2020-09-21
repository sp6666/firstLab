var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.roleImage = null;
            e.nameImage = null;
            e.text_Instro = null;
            e.text_ChatContent = null;
            e.lblQinMi = null;
            e.lblZiSi = null;
            e.lblMeiLi = null;
            e.lblJingYan = null;
            return e;
        }
        e.prototype.start = function() {
            facade.subscribe("WIFE_LIST_UPDATE", this.showWifeData, this);
            this.showWifeData();
        };
        e.prototype.showWifeData = function() {
            var t = localcache.getItem(
                localdb.table_wife,
                n.wifeProxy.curSelectWife.id
            );
            this.text_Instro.string = t.info;
            this.text_ChatContent.string = t.talk[0];
            this.lblQinMi.string = i18n.t("WIFE_QIN_MI_DU", {
                value: n.wifeProxy.curSelectWife.love
            });
            this.lblMeiLi.string = i18n.t("WIFE_MEILI", {
                value: n.wifeProxy.curSelectWife.flower
            });
            this.lblZiSi.string = i18n.t("WIFE_ZI_SI", {
                value: n.wifeProxy.curSelectWife.num
            });
            this.lblJingYan.string = i18n.t("WIFE_JING_YAN", {
                value: n.wifeProxy.curSelectWife.exp
            });
        };
        e.prototype.onClickLove = function() {
            var t =
                    10 * n.wifeProxy.curSelectWife.love > 1e3
                        ? 1e3
                        : 10 * n.wifeProxy.curSelectWife.love,
                e = localcache.getItem(localdb.table_item, 1);
            i.utils.showConfirmItem(
                i18n.t("WIFE_XO_TIP", {
                    name: e.name,
                    price: t
                }),
                1,
                n.playerProxy.userData.cash,
                function() {
                    n.playerProxy.userData.cash < t
                        ? i.alertUtil.alertItemLimit(1)
                        : n.wifeProxy.sendXXOO(n.wifeProxy.curSelectWife.id);
                },
                "WIFE_XO_TIP"
            );
        };
        e.prototype.onClickGift = function() {
            i.utils.openPrefabView("GiftView");
        };
        e.prototype.onClickSkill = function() {};
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([a(cc.Sprite)], e.prototype, "roleImage", void 0);
        __decorate([a(cc.Sprite)], e.prototype, "nameImage", void 0);
        __decorate([a(cc.Label)], e.prototype, "text_Instro", void 0);
        __decorate([a(cc.Label)], e.prototype, "text_ChatContent", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblQinMi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblZiSi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblMeiLi", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblJingYan", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
