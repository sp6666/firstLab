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
            e.txt_expValue = null;
            e.lblLv = null;
            e.lblEff = null;
            e.listView = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(n.confidanteProxy.ON_CONFIDANTE_SKILL_UPDATE, this.showSkillData, this);
            this.showSkillData();
        };
        e.prototype.showSkillData = function() {
            //亲密度等级
            this.lblEff.string = n.confidanteProxy.hero.heros.level;
            //情愫值
            this.lblLv.string = n.confidanteProxy.hero.heros.sy_num;
            //更新列表
            this.listView.data = n.confidanteProxy.getSkillList();
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "txt_expValue", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblEff", void 0);
        __decorate([s(i.default)], e.prototype, "listView", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
