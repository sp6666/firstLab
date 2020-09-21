var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.skillIcon = null;
            e.lblLv = null;
            e.lblEff = null;
            e.lblExp = null;
            e.lblName = null;
            e.btnNode = null;
            e.YZW = null;
            e.WJS = null;
            e.expNode = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = localcache.getItem(localdb.table_epSkill, t.skillId);
                this.lblLv.string = "LV." + t.id;
                this.lblEff.string = i18n.t("ACADEMY_SKILL_LEVEL_ADD", {
                    name: e.name
                });
                this.lblExp.string = t.costExp + "";
                this.lblName.string = e.name;
                this.btnNode.active = this.expNode.active =
                    l.academyProxy.info.level + 1 == t.id;
                this.YZW.active = l.academyProxy.info.level >= t.id;
                this.WJS.active = l.academyProxy.info.level + 1 < t.id;
            }
        };
        e.prototype.onClickButton = function() {
            l.academyProxy.sendUpSkill();
        };
        __decorate([s(n.default)], e.prototype, "skillIcon", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblEff", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "YZW", void 0);
        __decorate([s(cc.Node)], e.prototype, "WJS", void 0);
        __decorate([s(cc.Node)], e.prototype, "expNode", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
