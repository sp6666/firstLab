var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../utils/Utils"),
    n = cc._decorator,
    l = n.ccclass,
    r = (n.property,
    (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e._data = null;
            return e;
        }
        Object.defineProperty(e.prototype, "data", {
            get: function() {
                return this._data;
            },
            set: function(t) {
                this._data = t;
                if (null != this._data) {
                    this.node.active = !0;
                    this.showData();
                } else this.node.active = !1;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {},
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showNodeAnimation = function() {
            this.node.getComponent(cc.Animation) &&
                i.utils.showNodeEffect(this.node, -1);
        };
        e.prototype.showData = function() {};
        e.prototype.addBtnEvent = function(t) {
            t &&
                t.clickEvents &&
                t.clickEvents.length > 0 &&
                (t.clickEvents[0].customEventData = this);
        };
        e.prototype.onDestroy = function() {
            this._data = null;
        };
        e.prototype.setWidthHeigth = function(t, e) {};
        return (e = __decorate([l], e));
    })(cc.Component));
o.default = r;
