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
            e.bgNode = null;
            e.dlist = [];
            return e;
        }
        e.prototype.onLoad = function () {
            this.dlist = [];
            if (n.unionProxy.changePosParam) {
                var t = n.unionProxy.getUnionData(n.unionProxy.clubInfo.level),
                    e = [0, 1, t.leader, t.elite];
                2 >= n.unionProxy.memberInfo.post &&
                    this.dlist.push(this.getPosData(2, e));
                this.dlist.push(this.getPosData(3, e));
                this.dlist.push(this.getPosData(4, e));
                this.dlist.push({
                    name: i18n.t("UNION_KICT_MEMBER"),
                    active: 1,
                    pos: 0,
                    index: 5
                });
            }
            this.list.data = this.dlist;
            this.bgNode.height = this.list.node.height + 100;
        };
        e.prototype.getPosData = function (t, e) {
            var o = n.unionProxy.getPostNum(t),
                i = e.length > t ? e[t] : 0,
                l = {};
            l.name =
                i18n.t("UNION_POSITION_" + t) +
                (0 != i ? "(" + o + "/" + i + ")" : "");
            l.active = 4 == t || o < i ? 1 : 0;
            l.pos = o;
            l.index = t;
            return l;
        };
        e.prototype.eventClose = function () {
            l.utils.closeView(this);
        };
        e.prototype.onClickChange = function (t, e) {
            var o = e.data;
            o &&
                n.unionProxy.sendChangePos(
                    n.unionProxy.changePosParam.id,
                    o.index
                );
            this.eventClose();
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "bgNode", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;