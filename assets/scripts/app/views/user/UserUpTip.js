var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UserUpTipItem"),
    n = cc._decorator,
    l = n.ccclass,
    r = n.property,
    a = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeOne = null;
            e.lblOne = null;
            e.nodeMore = null;
            e.lblName = null;
            e.item = null;
            e.context = null;
            return e;
        }
        e.prototype.setOne = function(t) {
            this.nodeOne.active = !0;
            this.nodeMore.active = !1;
            this.lblOne.string = t.content;
        };
        e.prototype.setMode = function(t) {
            this.context.removeAllChildren();
            var e = localcache.getItem(localdb.table_officer, t.id + 1);
            this.lblName.string = e ? e.name : t.name;
            this.item.active = !1;
            this.nodeOne.active = !1;
            this.nodeMore.active = !0;
            for (var o = t.condition.split("|"), n = 0; n < o.length; n++) {
                var l = cc.instantiate(this.item);
                if (null != l) {
                    var r = l.getComponent(i.default);
                    if (r) {
                        l.active = !0;
                        r.data = localcache.getItem(
                            localdb.table_officerType,
                            o[n]
                        );
                        this.context.addChild(l);
                    }
                }
            }
        };
        e.prototype.onClickClost = function() {
            this.node.active = !1;
        };
        __decorate([r(cc.Node)], e.prototype, "nodeOne", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblOne", void 0);
        __decorate([r(cc.Node)], e.prototype, "nodeMore", void 0);
        __decorate([r(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([r(cc.Node)], e.prototype, "item", void 0);
        __decorate([r(cc.Node)], e.prototype, "context", void 0);
        return (e = __decorate([l], e));
    })(cc.Component);
o.default = a;
