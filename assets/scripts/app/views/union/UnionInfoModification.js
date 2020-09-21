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
            e.unionName = null;
            e.bangzhuName = null;
            e.unionLv = null;
            e.humanNum = null;
            e.unionWeath = null;
            e.unionNotice = null;
            e.uniManifesto = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.unionNotice.placeholder;
            this.uniManifesto.placeholder = i18n.t("COMMON_INPUT_TXT");
            this.UPDATE_SEARCH_INFO();
            facade.subscribe(
                "UPDATE_SEARCH_INFO",
                this.UPDATE_SEARCH_INFO,
                this
            );
        };
        e.prototype.eventClose = function() {
            n.utils.closeView(this);
        };
        e.prototype.eventModify = function() {
            n.utils.openPrefabView("union/UnionRename");
        };
        e.prototype.onClickSave = function() {
            if (
                n.stringUtil.isBlank(this.unionNotice.string) ||
                n.stringUtil.isBlank(this.uniManifesto.string)
            )
                n.alertUtil.alert18n("UNION_INPUT_NULL");
            else {
                i.unionProxy.sendInfoMod(
                    0,
                    0,
                    this.unionNotice.string,
                    this.uniManifesto.string
                );
                n.utils.closeView(this);
            }
        };
        e.prototype.UPDATE_SEARCH_INFO = function() {
            var t = i.unionProxy.clubInfo;
            if (t) {
                this.unionName.string = t.name;
                this.unionLv.string = t.level + "";
                this.unionWeath.string = t.fund + "";
                this.unionNotice.string = i18n.has(t.notice)
                    ? i18n.t(t.notice)
                    : t.notice;
                this.uniManifesto.string = i18n.has(t.outmsg)
                    ? i18n.t(t.outmsg)
                    : t.outmsg;
                this.humanNum.string = i18n.t("COMMON_NUM", {
                    f: t.members.length,
                    s: i.unionProxy.getUnionLvMaxCount(t.level)
                });
                var e = i.unionProxy.getMengzhu(t.members);
                this.bangzhuName.string = e ? e.name : "";
            }
        };
        __decorate([a(cc.Label)], e.prototype, "unionName", void 0);
        __decorate([a(cc.Label)], e.prototype, "bangzhuName", void 0);
        __decorate([a(cc.Label)], e.prototype, "unionLv", void 0);
        __decorate([a(cc.Label)], e.prototype, "humanNum", void 0);
        __decorate([a(cc.Label)], e.prototype, "unionWeath", void 0);
        __decorate([a(cc.EditBox)], e.prototype, "unionNotice", void 0);
        __decorate([a(cc.EditBox)], e.prototype, "uniManifesto", void 0);
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
