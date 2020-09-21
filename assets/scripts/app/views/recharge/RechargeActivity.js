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
            var t = this;
            this.list.selectHandle = function () {
                n.utils.closeView(t);
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

            var data1 = l.limitActivityProxy.getHuodongList(
                l.limitActivityProxy.RECHARGE_TYPE
            );
            var data2 = l.limitActivityProxy.getHuodongListByGID(
                l.limitActivityProxy.RECHARGE_TYPE
            );
            var data = new Array(0);
            data1.forEach(element => {
                data.push(element);
            });
            data2.forEach(element => {
                data.push(element);
            });
            data.sort(this.sortHuodong);
            this.list.data = data;
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;