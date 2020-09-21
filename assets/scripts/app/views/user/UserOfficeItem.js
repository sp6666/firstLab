var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("./UserOfficeTypeItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.item = null;
            e.prg = null;
            e.btn = null;
            e.context = null;
            e.items = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.item.node.active = !1;
                this.lblName.string = t.name;
                var e = t.condition.split("|"),
                    o = 0;
                if (null == this.items) {
                    this.items = [];
                    this.context.removeAllChildren();
                    for (var i = 0; i < e.length; i++) {
                        var l = localcache.getItem(
                                localdb.table_officerType,
                                e[i]
                            ),
                            a = cc.instantiate(this.item.node),
                            s = a.getComponent(r.default);
                        if (s) {
                            a.active = !0;
                            s.data = l;
                            this.items.push(s);
                            this.context.addChild(a);
                            a.x = 20 * Math.random() + (i % 2 == 0 ? 100 : 0);
                            a.y =
                                20 * Math.random() +
                                i * (this.item.node.height + 20);
                        }
                        o += n.playerProxy.officeLvIsOver(l) ? 1 : 0;
                    }
                    this.context.height =
                        e.length * (this.item.node.height + 20) - 50;
                    this.prg.totalLength = this.prg.node.height = this.context.height;
                    this.node.height = this.context.height + 125;
                }
                this.btn.interactable = n.playerProxy.userData.level >= t.id;
                this.prg.progress = o / e.length;
            }
        };
        e.prototype.onClick = function() {
            var t = this._data;
            t &&
                !l.stringUtil.isBlank(t.condition) &&
                facade.send("USER_CLICK_OFFICE", t);
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(r.default)], e.prototype, "item", void 0);
        __decorate([c(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Node)], e.prototype, "context", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
