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
            e.lblMyRank = null;
            e.lblMyName = null;
            e.lblMyScore = null;
            e.btnRe = null;
            e.lblRe = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(l.qixiProProxy.QIXI_PRO_RANK, this.onRank, this);
            facade.subscribe(l.qixiProProxy.QIXI_PRO_MY_RID, this.onMyRid, this);
            this.onRank();
            this.onMyRid();
            this.onTimer();
            this.schedule(this.onTimer, 1);
        };
        e.prototype.onRank = function () {
            this.list.data = l.qixiProProxy.rank;
            var t = l.limitActivityProxy.getActivityData(
                    l.limitActivityProxy.QIXI_PRO_ID
                ),
                e = !!t &&
                (n.timeUtil.second >= t.sTime &&
                    n.timeUtil.second <= t.eTime);
            this.btnRe.node.active = e;
        };
        e.prototype.onMyRid = function () {
            this.lblMyName.string = l.playerProxy.userData.name;
            var t =
                null == l.qixiProProxy.myRid ?
                0 :
                null == l.qixiProProxy.myRid.rid ?
                0 :
                l.qixiProProxy.myRid.rid;
            this.lblMyRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
            this.lblMyScore.string = l.qixiProProxy.myRid ?
                l.qixiProProxy.myRid.score + "" :
                "0";
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.onClickRe = function () {
            l.rankProxy.sendRefresh(l.qixiProProxy.data.info.id);
        };
        e.prototype.onTimer = function () {
            var t = n.timeUtil.second - l.rankProxy.lastTime;
            t >= 60 && (this.btnRe.interactable = !0);
            this.btnRe.interactable = t >= 60;
            this.lblRe.string =
                t >= 60 ?
                i18n.t("COMMON_REFRESH") :
                i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
                    num: 60 - t
                });
            var e = l.limitActivityProxy.getActivityData(
                l.limitActivityProxy.QIXI_PRO_ID
            );
            (!!e &&
                (n.timeUtil.second >= e.sTime &&
                    n.timeUtil.second <= e.eTime)) ||
            (this.btnRe.node.active = !1);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyScore", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRe", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;