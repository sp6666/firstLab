var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.rwdList = null;
            e.oldNum = -1;

            e.isChangeTask = false;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.oldUsersProxy.OLD_USERS_BACK,
                this.onLionData,
                this
            );
            this.onLionData();
        };
        e.prototype.onLionData = function () {
            if (null != l.oldUsersProxy.data) {
                this.rwdList.data = l.oldUsersProxy.data.activity_rwd;
            }
        };

        e.prototype.go = function () {
            n.utils.openPrefabView('achieve/AchieveView', false, 'oldusers');
        };

        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "rwdList", void 0);

        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;