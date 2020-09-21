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
            e.listView = null;
            e.lbljb = null;
            e.itemArr = [
                {
                    id: 900
                },
                {
                    id: 901
                },
                {
                    id: 902
                }
            ];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_BAG_ITEM", this.showData, this);
            facade.subscribe("UPDATE_HERO_JB", this.updateJiban, this);
            this.showData();
            this.updateJiban();
            this.listView.data = this.itemArr;
        };
        e.prototype.showData = function() {
            this.listView.updateItemShow();
        };
        e.prototype.updateJiban = function() {
            var t = n.jibanProxy.getHeroJB(n.servantProxy.curSelectId);
            this.lbljb.string = t + "";
        };
        e.prototype.closeBtn = function() {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "listView", void 0);
        __decorate([s(cc.Label)], e.prototype, "lbljb", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
