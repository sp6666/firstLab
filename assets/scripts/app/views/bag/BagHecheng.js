var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/SelectMax"),
    r = require("./BagHeItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.item = null;
            e.silder = null;
            e._data = null;
            return e;
        }
        e.prototype.onClickHeCheng = function() {
            if (this._data) {
                this._data.onHeCheng = 1;
                this.item.onClickHeCheng();
                this.onClickClost();
            }
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickOther = function(t) {
            this._data = t;
            this.updateShow();
        };
        e.prototype.updateShow = function() {
            var t = this._data;
            if (t) {
                this.item.data = t;
                var e = t.need[0],
                    o = n.bagProxy.getItemCount(e.id),
                    i = 99;
                i = Math.floor(o / e.count) < i ? Math.floor(o / e.count) : i;
                0 != t.totonum && (i = t.times < i ? t.times : i);
                this.silder.max = i <= 0 ? 1 : i;
                this.item.nodeGold.active &&
                    (this.item.lblGold.string =
                        this._data.need[1].count * this.silder.curValue + "");
            }
        };
        e.prototype.onLoad = function() {
            var t = this;
            this._data = this.node.openParam;
            this.updateShow();
            var e = this;
            this.silder.changeHandler = function() {
                e.item.nodeGold.active &&
                    (e.item.lblGold.string =
                        e._data.need[1].count * t.silder.curValue + "");
            };
            facade.subscribe("BAG_CLICK_BLANK", this.onClickClost, this);
            facade.subscribe("BAG_CLICK_HECHENG", this.onClickOther, this);
            facade.subscribe("BAG_CLICK_USE", this.onClickClost, this);
        };
        __decorate([c(r.default)], e.prototype, "item", void 0);
        __decorate([c(l.default)], e.prototype, "silder", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
