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
            e.deskList = null;
            e.roleNode = null;
            return e;
        }
        e.prototype.onLoad = function() {
            JsonHttp.subscribe("ACADEMY_LIST_UPDATE", this.onDeskList, this);
            this.onDeskList();
        };
        e.prototype.onDeskList = function() {
            this.roleNode.active =
                null == n.academyProxy.deskList ||
                0 == n.academyProxy.deskList.length;
            this.deskList.data = n.academyProxy.deskList;
        };
        e.prototype.onClickSkill = function() {
            l.utils.openPrefabView("academy/UpSkillView");
        };
        e.prototype.onClickCreate = function() {
            l.utils.openPrefabView("academy/AcademyAddDesk");
        };
        e.prototype.onClickFind = function() {
            l.utils.openPrefabView("academy/FindView");
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "deskList", void 0);
        __decorate([s(cc.Node)], e.prototype, "roleNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
