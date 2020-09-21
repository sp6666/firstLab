var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.snowmanProxy.SNOWMAN_DATA_UPDATE,
                this.onDataUpdate,
                this
            );
            this.onDataUpdate();
        };
        e.prototype.onDataUpdate = function () {
            l.snowmanProxy.data.snowman_rwd.sort(function (t, e) {
                return t.get == e.get ? t.lv - e.lv : t.get - e.get;
            });
            this.list.data = l.snowmanProxy.data.snowman_rwd;
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;