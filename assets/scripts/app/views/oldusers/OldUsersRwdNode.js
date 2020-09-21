var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../utils/Utils"),
    List = require("../../component/List"),
    redDot = require("../../component/RedDot"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;


            e.totalList = null;

            return e;
        }
        e.prototype.onLoad = function () {

            this.totalList.data = this.node.openParam;
        };

        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };

        __decorate([_(List.default)], e.prototype, "totalList", void 0);


        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;