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
            e.lblNode = null;
            e.btnYJ = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_SON_TI_QIN", this.onTiQin, this);
            facade.subscribe(
                n.sonProxy.UPDATE_SON_SHOW_ERRECT,
                this.onClickClose,
                this
            );
            n.sonProxy.sendRefreshTiQin();
            this.onTiQin();
            n.sonProxy.tiQinObj.marryType = 2;
        };
        e.prototype.onTiQin = function() {
            this.list.data = n.sonProxy.tiQinData;
            this.lblNode.active =
                !n.sonProxy.tiQinData || 0 == n.sonProxy.tiQinData.length;
            this.btnYJ.active =
                !!n.sonProxy.tiQinData && n.sonProxy.tiQinData.length >= 2;
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onOnkeyJuJue = function() {
            n.sonProxy.sendOneKeyJuJueTiQin();
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "lblNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnYJ", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
