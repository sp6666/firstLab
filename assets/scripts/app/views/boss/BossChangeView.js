var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblScore = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_BOSS_SHOP", this.updateList, this);
            this.lblScore.string = i18n.t("BOSS_SCORE_TXT", {
                value: l.bossPorxy.shop.score
            });
            var t = localcache.getList(localdb.table_scoreChange);
            this.list.data = t;
        };
        e.prototype.updateList = function() {
            this.list.updateItemShow();
            this.lblScore.string = i18n.t("BOSS_SCORE_TXT", {
                value: l.bossPorxy.shop.score
            });
        };
        e.prototype.onClickClose = function() {
            n.utils.closeView(this);
        };
        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
