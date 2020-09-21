var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.time = [];
            e.day = [];
            e.msg = null;
            e.lblNode = [];
            e.timeBtn = [];
            e.dayBtn = [];
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function () {

            facade.subscribe(
                n.oldUsersProxy.OLD_USERS_BACK,
                this.onShowData,
                this
            );
            this.onShowData();
        };
        e.prototype.onShowData = function () {
            var activity_rwd = n.oldUsersProxy.data.regression_shop;
            // o = n.mergePurchaseProxy.gift;
            if (activity_rwd /*&& o*/ ) {
                this.msg.string = n.oldUsersProxy.data.msg;

                activity_rwd.sort(function (t, e) {
                    var o = t.limit > 0 ? 0 : 1,
                        i = e.limit > 0 ? 0 : 1;
                    return o != i ?
                        o - i :
                        t.type != e.type ?
                        t.type - e.type :
                        t.id - e.id;
                });
                this.list.data = activity_rwd;

                var stage = n.oldUsersProxy.data.count - 1;

                for (var v = 0; v < this.day.length; v++) {
                    this.lblNode[v].active = v == stage;
                    this.timeBtn[v].interactable = v == stage;
                    this.dayBtn[v].interactable = v == stage;
                }
            }
        };
        e.prototype.onclickClose = function () {
            l.utils.closeView(this);
        };
        __decorate([_([cc.Label])], e.prototype, "time", void 0);
        __decorate([_([cc.Label])], e.prototype, "day", void 0);
        __decorate([_(cc.Label)], e.prototype, "msg", void 0);
        __decorate([_([cc.Node])], e.prototype, "lblNode", void 0);
        __decorate([_([cc.Button])], e.prototype, "timeBtn", void 0);
        __decorate([_([cc.Button])], e.prototype, "dayBtn", void 0);
        __decorate([_(i.default)], e.prototype, "list", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;