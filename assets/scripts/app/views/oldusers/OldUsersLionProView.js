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
            e.lblTime = null;

            e.isChangeTask = false;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.oldUsersProProxy.OLD_USERS_PRO_BACK,
                this.onLionData,
                this
            );

            l.oldUsersProProxy.sendInfoCmd();

            this.onLionData();
        };
        e.prototype.onLionData = function () {
            if (null != l.oldUsersProProxy.data) {

                var totalRwd = [];
                var dataRwd = l.oldUsersProProxy.data.cfg.rwd;

                for (var i = 0; i < dataRwd.length; i += 3) {
                    var rwd = [];
                    rwd.push(dataRwd[i]);
                    rwd.push(dataRwd[i + 1]);
                    rwd.push(dataRwd[i + 2]);
                    totalRwd.push(rwd);
                }
                this.rwdList.data = totalRwd;


                var t = this;
                r.uiUtils.countDown(
                    l.oldUsersProProxy.data.cfg.info.eTime,
                    this.lblTime,
                    function () {
                        t.lblTime.string = i18n.t("ACTHD_OVERDUE");
                    }, true,
                    i18n.t("ACTIVITY_COUNT_DOWN_TXT") + ": "
                );
            }
        };

        e.prototype.go = function () {
            n.utils.openPrefabView('achieve/AchieveView', false, 'oldusers');
        };

        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([c(i.default)], e.prototype, "rwdList", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTime", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;