var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeScroll = null;
            e.lblName = null;
            e.lblLead = null;
            e.lblLv = null;
            e.lblRich = null;
            e.lblShili = null;
            e.lblCount = null;
            e.lblDes = null;
            e.editorCid = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.editorCid.placeholder = i18n.t("COMMON_INPUT_TXT");
            facade.subscribe(
                "UPDATE_SEARCH_INFO",
                this.UPDATE_SEARCH_INFO,
                this
            );
            this.nodeScroll.active = !1;
        };
        e.prototype.eventClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.eventLookUp = function() {
            i.unionProxy.sendSearchUnion(parseInt(this.editorCid.string));
        };
        e.prototype.eventApply = function() {
            i.unionProxy.sendApplyUnion(parseInt(this.editorCid.string));
        };
        e.prototype.UPDATE_SEARCH_INFO = function() {
            this.nodeScroll.active = null != i.unionProxy.clubInfo;
            var t = i.unionProxy.clubInfo;
            if (t) {
                var e = i.unionProxy.getMengzhu(t.members);
                this.lblCount.string =
                    i18n.t("UNION_MENBER_COUNT") +
                    i18n.t("COMMON_NUM", {
                        f: t.members.length,
                        s: i.unionProxy.getUnionLvMaxCount(t.level)
                    });
                this.lblName.string = i18n.t("UINON_NAME_TXT") + t.name;
                this.lblLead.string =
                    i18n.t("UNION_MASTER_TXT") + (e ? e.name : "");
                this.lblLv.string = i18n.t("UNION_EXP_TXT") + t.exp;
                this.lblRich.string = i18n.t("UNION_MONEY_TXT") + t.fund;
                this.lblShili.string =
                    i18n.t("UNION_TOTAL_POWER") +
                    "：" +
                    i.unionProxy.getAllShili(t.members);
                this.lblDes.string =
                    i18n.t("UNION_GONG_GAO_2") +
                    (i18n.has(t.outmsg) ? i18n.t(t.outmsg) : t.outmsg);
            }
        };
        __decorate([a(cc.Node)], e.prototype, "nodeScroll", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblLead", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblRich", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([a(cc.EditBox)], e.prototype, "editorCid", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
