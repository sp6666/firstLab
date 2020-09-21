var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    a = require("../../Initializer"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = [];
            e.labels = [];
            e.dayOne = null;
            e.dayNormal = null;
            e.dayAct = null;
            e.titleBar = null;
            return e;
        }
        o = e;

        e.prototype.showData = function () {

            this.list[0].data = this._data[0];
            this.list[1].data = this._data[1];
            this.list[2].data = this._data[2];

            let day = Math.floor(this._data[0].need / (a.oldUsersProProxy.scoreBase * 3));

            this.dayOne.active = day === 0;
            this.dayNormal.active = day !== 0;
            this.titleBar.active = day === 0;

            this.labels[0].string = day * a.oldUsersProProxy.scoreBase * 3 + a.oldUsersProProxy.scoreBase;
            this.labels[1].string = day * a.oldUsersProProxy.scoreBase * 3 + a.oldUsersProProxy.scoreBase * 2;
            this.labels[2].string = day * a.oldUsersProProxy.scoreBase * 3 + a.oldUsersProProxy.scoreBase * 3;

            this.dayAct.string = a.oldUsersProProxy.data.cons + '';
        };

        e.prototype.getRwd = function () {
            a.oldUsersProProxy.sendActivityRwd();
        };

        __decorate([p(cc.Node)], e.prototype, "titleBar", void 0);
        __decorate([p([i.default])], e.prototype, "list", void 0);
        __decorate([p([cc.Label])], e.prototype, "labels", void 0);
        __decorate([p(cc.Label)], e.prototype, "dayAct", void 0);
        __decorate([p(cc.Node)], e.prototype, "dayOne", void 0);
        __decorate([p(cc.Node)], e.prototype, "dayNormal", void 0);
        return (e = o = __decorate([u], e));
    })(i.default);
o.default = h;