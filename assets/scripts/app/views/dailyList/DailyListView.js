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
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this;
            this.list.selectHandle = function () {
                l.utils.closeView(t);
            };
            facade.subscribe(
                "LIMIT_ACTIVITY_HUO_DONG_LIST",
                this.onHuoDongList,
                this
            );
            this.onHuoDongList();
        };
        e.prototype.sortHuodong = function (t, e) {
            return t.order != undefined && e.order != undefined ? t.order - e.order : 0;
        };
        e.prototype.onHuoDongList = function () {
            var data = n.limitActivityProxy.getHuodongListByGID(n.limitActivityProxy.DAILY_LIST_TYPE);
            data.sort(this.sortHuodong);
            this.list.data = data;
        };
        e.prototype.onClickClose = function () {
            l.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;