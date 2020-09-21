var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblCurEff = null;
            e.lblNextEff = null;
            e.lblUpNeed = null;
            e.btnUp = null;
            e.skillIcon = null;
            e.lblLevel = null;
            e.redNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btnUp);
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_pkSkill, t.id);
                this.lblName.string = e.name;
                localcache.getItem(localdb.table_pkLvUp, t.level);
                t.level < e.maxLevel
                    ? (this.lblNextEff.string =
                          i18n.t("SERVANT_NEXT_EFF") +
                          (e.base + e.upgrade * (t.level + 1)) / 100 +
                          "%" +
                          e.comm)
                    : (this.lblNextEff.string = i18n.t("SERVANT_MAX_LEVEL"));
                this.lblLevel.string = t.level + "";
                var o = l.servantProxy.getHeroData(l.servantProxy.curSelectId);
                this.redNode.active = l.servantProxy.skillIsEnouhghUp(o, t);
                this.skillIcon.url = r.uiHelps.getServantSkillIcon(t.id);
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblCurEff", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblNextEff", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblUpNeed", void 0);
        __decorate([c(cc.Button)], e.prototype, "btnUp", void 0);
        __decorate([c(n.default)], e.prototype, "skillIcon", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([c(cc.Node)], e.prototype, "redNode", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
