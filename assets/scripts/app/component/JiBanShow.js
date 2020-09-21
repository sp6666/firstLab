var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./List"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemList = null;
            e.flower = null;
            e.lblNum = null;
            e._total = 0;
            e._value = 0;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.setValue = function(t, e) {
            if (e > 5)
                this.lblNum.string = i18n.t("SERVANT_JI_BAN_FLOWER", {
                    num: e
                });
            else {
                this._total = t;
                this._value = e;
                var o = [];
                if (this._total > 0)
                    for (var i = 0; i < this._total; i++) {
                        var n = {
                            isOpen: i < this._value
                        };
                        o.push(n);
                    }
                this.itemList.data = o;
            }
            this.itemList.node.active = e <= 5;
            this.flower.active = e > 5;
        };
        __decorate([r(i.default)], e.prototype, "itemList", void 0);
        __decorate([r(cc.Node)], e.prototype, "flower", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblNum", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
