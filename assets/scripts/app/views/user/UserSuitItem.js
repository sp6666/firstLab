var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.prop = null;
            e.nodeSelect = null;
            return e;
        }
        Object.defineProperty(e.prototype, "select", {
            set: function(t) {
                this.nodeSelect.active = t;
            },
            enumerable: !0,
            configurable: !0
        });
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = i18n.t("COMMON_ADD_2", {
                    n: t.name,
                    c: r.playerProxy.getSuitCount(t.id)
                });
                for (var e = 0; e < t.clother.length; e++) {
                    var o = localcache.getItem(
                        localdb.table_userClothe,
                        t.clother[e]
                    );
                    switch (o.part) {
                        case 2:
                            var i = o.model.split("|");
                            this.prop.url = l.uiHelps.getRolePart(i[0]);
                    }
                }
            }
        };
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(n.default)], e.prototype, "prop", void 0);
        __decorate([c(cc.Node)], e.prototype, "nodeSelect", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
