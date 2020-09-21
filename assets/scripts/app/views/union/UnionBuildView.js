var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    uIUtils = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    taskRwd = require("./UnionTaskDayRwdItem"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lblGold = null;
            e.lblDj = null;
            e.lblGj = null;
            e.lblCoin = null;
            e.lblScore = null;
            e.rwds = [];
            e.prg = null;
            //e.pers = [0.1, 0.32, 0.53, 0.75, 0.95];
            e.pers = [0.1, 0.53, 0.95];
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                "UPDATE_MEMBER_INFO",
                this.updateMemberInfo,
                this
            );
            facade.subscribe("PLAYER_USER_UPDATE", this.UserInfoUp, this);
            facade.subscribe("UPDATE_BAG_ITEM", this.itemUpdate, this);

            l.unionProxy.sendApplyList();





            this.dj = l.bagProxy.getItemCount(128);
            this.gj = l.bagProxy.getItemCount(132);
            this.cash = l.playerProxy.userData.cash;
            this.food = l.playerProxy.userData.food;

            this.tempData = [];
            this.itemUpdate();
            this.updateMemberInfo();
            this.UserInfoUp();
        };
        e.prototype.eventClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.UserInfoUp = function () {

            uIUtils.uiUtils.showNumChange(
                this.lblGold,
                this.cash,
                l.playerProxy.userData.cash
            );
            this.cash = l.playerProxy.userData.cash;


            uIUtils.uiUtils.showNumChange(
                this.lblCoin,
                this.food,
                l.playerProxy.userData.food
            );
            this.cash = l.playerProxy.userData.cash;
            this.food = l.playerProxy.userData.food;
        };
        e.prototype.updateMemberInfo = function () {
            var t = localcache.getList(localdb.table_construction);
            this.tempData = t;
            this.updateTask();
        };
        e.prototype.itemUpdate = function () {

            uIUtils.uiUtils.showNumChange(
                this.lblGj,
                this.gj,
                l.bagProxy.getItemCount(132)
            );
            uIUtils.uiUtils.showNumChange(
                this.lblDj,
                this.dj,
                l.bagProxy.getItemCount(128)
            );

            this.dj = l.bagProxy.getItemCount(128);
            this.gj = l.bagProxy.getItemCount(132);
        };


        e.prototype.updateTask = function () {
            for (
                var t = localcache.getList(localdb.table_clubDailyTask),
                    e = {},
                    o = [],
                    i = 0; i < t.length; i++
            ) {
                o.push(t[i]);
            }
            o.sort(function (t, o) {
                var i = e[t.id],
                    n = e[o.id],
                    l = i ? i.num : 0,
                    r = n ? n.num : 0;
                return (
                    (l >= t.num ? -1e3 : 0) +
                    (i && 1 == i.rwd ? 1e4 : 0) +
                    t.id -
                    ((r >= o.num ? -1e3 : 0) +
                        (n && 1 == n.rwd ? 1e4 : 0) +
                        o.id)
                );
            });
            this.list.data = null;
            this.list.data = this.tempData.concat(o);

            this.lblScore.string = i18n.t("ACHIEVE_DAILY_SCORE", {
                c: l.unionProxy.memberInfo.ae
            });

            this.table_clubDailyRwd = localcache.getItem(localdb.table_clubDailyRwd, l.unionProxy.clubInfo.level).active;
            //这里按策划要求,只保留三个
            this.table_clubDailyRwd.splice(3, this.table_clubDailyRwd.length - 3);
            for (var e = 0; e < this.rwds.length; e++)
                this.rwds[e].data = this.table_clubDailyRwd.length > e ? this.table_clubDailyRwd[e] : null;
            this.prg.progress = this.getPrg();
        };

        e.prototype.getPrg = function () {
            var t = this.table_clubDailyRwd;
            for (var e = l.unionProxy.memberInfo.ae, o = 0; o < t.length; o++)
                if (t[o].min > e) {
                    var i = o > 0 ? t[o].min - t[o - 1].min : t[o].min;
                    return (
                        (o > 0 ? this.pers[o - 1] : 0) +
                        (o > 0 ? (e - t[o - 1].min) / i : e / i) *
                        (o > 0 ?
                            this.pers[o] - this.pers[o - 1] :
                            this.pers[0])
                    );
                }
            return 1;
        };


        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblCoin", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblDj", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblGj", void 0);

        __decorate([s(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([s([taskRwd.default])], e.prototype, "rwds", void 0);
        __decorate([s(cc.ProgressBar)], e.prototype, "prg", void 0);

        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;