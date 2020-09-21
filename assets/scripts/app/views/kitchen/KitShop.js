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
            e.lblCost = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = localcache.getList(localdb.table_kitshop);
            this.list.data = t;
            facade.subscribe(
                n.playerProxy.PLAYER_USER_UPDATE,
                this.updateFood,
                this
            );
            this.updateFood();
        };
        e.prototype.updateFood = function() {
            this.lblCost.string = n.playerProxy.userData.food + "";
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCost", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
