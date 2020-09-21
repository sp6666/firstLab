var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.boss = null;
            e.lblWuli = null;
            e.btn = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.boss.url = r.uiHelps.getServantSmallSpine(t.id);
                this.lblWuli &&
                    (this.lblWuli.string = l.utils.formatMoney(t.aep.e1));
            }
        };
        e.prototype.onLoad = function() {
            this.addBtnEvent(this.btn);
        };
        __decorate([c(n.default)], e.prototype, "boss", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblWuli", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        return (e = __decorate([s], e));
    })(i.default);
o.default = _;
