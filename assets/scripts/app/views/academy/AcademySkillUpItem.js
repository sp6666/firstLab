var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.role = null;
            e.lblName = null;
            e.lblSkillName = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.role.url = l.uiHelps.getServantSpine(t.heroid);
                var e = localcache.getItem(localdb.table_hero, t.heroid);
                this.lblName.string = e.name;
                var o = localcache.getItem(
                        localdb.table_governmentSkill,
                        t.skillid
                    ),
                    i = localcache.getItem(localdb.table_pkSkill, o.skillId);
                this.lblSkillName.string = i.name + "  Lv+1";
            }
        };
        __decorate([s(n.default)], e.prototype, "role", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblSkillName", void 0);
        return (e = __decorate([a], e));
    })(i.default);
o.default = c;
