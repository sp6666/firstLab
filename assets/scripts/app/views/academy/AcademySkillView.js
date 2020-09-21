var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblExp = null;
            return e;
        }
        e.prototype.onLoad = function() {
            JsonHttp.subscribe(
                "ACADEMY_SKILL_UPDATE",
                this.onSkillListUpdate,
                this
            );
            JsonHttp.subscribe(
                "ACADEMY_PERSON_INFO_UPDATE",
                this.onInfoUpdate,
                this
            );
            this.onSkillListUpdate();
            this.onInfoUpdate();
        };
        e.prototype.onSkillListUpdate = function() {
            var t = localcache.getList(localdb.table_governmentSkill);
            this.list.data = t;
        };
        e.prototype.onInfoUpdate = function() {
            this.lblExp.string = i18n.t("ACADEMY_EXP", {
                value: n.academyProxy.info.exp
            });
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblExp", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
