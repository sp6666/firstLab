var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/List"),
    l = require("../../utils/Utils"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
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
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.zhongyuanProxy.ZHONGYUAN_OPEN_PAIHANG,
                this.onRank,
                this
            );
            facade.subscribe(
                i.zhongyuanProxy.ZHONGYUAN_MY_RID,
                this.onMyRid,
                this
            );
            this.onRank();
            this.onMyRid();
            this.onTimer();
            this.schedule(this.onTimer, 1);
        };
        e.prototype.onRank = function() {
            this.list.data = i.zhongyuanProxy.rank;
            var t = i.limitActivityProxy.getActivityData(
                    i.limitActivityProxy.ZHONGYUAN_ID
                ),
                e =
                    !!t &&
                    (l.timeUtil.second >= t.sTime &&
                        l.timeUtil.second <= t.eTime);
            this.btnRe.node.active = e;
        };
        e.prototype.onMyRid = function() {
            this.lblMyName.string = i.playerProxy.userData.name;
            var t =
                null == i.zhongyuanProxy.myRid
                    ? 0
                    : null == i.zhongyuanProxy.myRid.rid
                    ? 0
                    : i.zhongyuanProxy.myRid.rid;
            this.lblMyRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
            this.lblMyScore.string = i.zhongyuanProxy.myRid
                ? i.zhongyuanProxy.myRid.score + ""
                : "0";
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickRe = function() {
            i.rankProxy.sendRefresh(i.zhongyuanProxy.data.info.id);
        };
        e.prototype.onTimer = function() {
            var t = l.timeUtil.second - i.rankProxy.lastTime;
            t >= 60 && (this.btnRe.interactable = !0);
            this.btnRe.interactable = t >= 60;
            this.lblRe.string =
                t >= 60
                    ? i18n.t("COMMON_REFRESH")
                    : i18n.t("FLOWER_SHENG_YU_SHI_JIAN", {
                          num: 60 - t
                      });
            var e = i.limitActivityProxy.getActivityData(
                i.limitActivityProxy.ZHONGYUAN_ID
            );
            (!!e &&
                (l.timeUtil.second >= e.sTime &&
                    l.timeUtil.second <= e.eTime)) ||
                (this.btnRe.node.active = !1);
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyScore", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRe", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
