var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    uiUtils = require("../../utils/UIUtils"),
    urlLoad = require("../../component/UrlLoad"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.listRwd = null;
            e.lblMyRank = null;
            e.lblMyName = null;
            e.lblMyScore = null;
            e.btnRe = null;
            e.lblRe = null;
            e.rankNode = null;
            e.rwdNode = null;
            e.qihuanHeads = [];
            e.headNames = [];
            return e;
        }
        e.prototype.onLoad = function () {

            this.servantIndex = 0;

            facade.subscribe(l.xiuYunProxy.XIUYUN_RANK, this.onRank, this);
            facade.subscribe(l.xiuYunProxy.XIUYUN_MY_RID, this.onMyRid, this);
            this.changeRankType();
            this.showHeads();
            this.onRank();
            this.onMyRid();
            this.onTimer();
            this.schedule(this.onTimer, 1);
        };
        e.prototype.onRank = function () {

            this.list.data = l.xiuYunProxy.finalRank[this.servantIndex];


            var t = l.limitActivityProxy.getActivityData(
                    l.limitActivityProxy.XIUYUN_ID
                ),
                e = !!t &&
                (n.timeUtil.second >= t.sTime &&
                    n.timeUtil.second <= t.eTime);
            this.btnRe.node.active = e;


            this.listRwd.data = l.xiuYunProxy.data.rwd;

        };
        e.prototype.onMyRid = function () {
            this.lblMyName.string = l.playerProxy.userData.name;
            if (!l.xiuYunProxy.myRid) {
                this.lblMyRank.string = i18n.t("RAKN_UNRANK");
                this.lblMyScore.string = 0;
            } else {
                var t =
                    null == l.xiuYunProxy.myRid[this.servantIndex] ?
                    0 :
                    null == l.xiuYunProxy.myRid[this.servantIndex].rid ?
                    0 :
                    l.xiuYunProxy.myRid[this.servantIndex].rid;
                this.lblMyRank.string = 0 == t ? i18n.t("RAKN_UNRANK") : t + "";
                this.lblMyScore.string = l.xiuYunProxy.myRid[this.servantIndex] ?
                    l.xiuYunProxy.myRid[this.servantIndex].score + "" :
                    "0";
            }

        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        e.prototype.changePerson = function (t, e) {
            this.servantIndex = parseInt(e);
            this.onRank();
            this.onMyRid();
        };
        e.prototype.changeRankType = function (t, e) {
            if (!e) {
                this.rankNode.active = true;
                this.rwdNode.active = false;
            } else {
                this.rankNode.active = false;
                this.rwdNode.active = true;
            }
        };
        e.prototype.onClickRe = function () {
            /*
            JsonHttp.send(new proto_cs.huodong.hd6260paihang());
            l.rankProxy.lastTime = n.timeUtil.second;
            this.onTimer();
            */
            l.rankProxy.sendRefresh(l.xiuYunProxy.data.info.no);
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
                l.limitActivityProxy.XIUYUN_ID
            );
            (!!e &&
                (n.timeUtil.second >= e.sTime &&
                    n.timeUtil.second <= e.eTime)) ||
            (this.btnRe.node.active = !1);
        };

        e.prototype.showHeads = function () {
            for (
                var t = localcache.getList(localdb.table_xiuyun_person),
                    i = 0; i < this.qihuanHeads.length; i++
            ) {

                this.qihuanHeads[i].url = uiUtils.uiHelps.getServantHead(t[i].head);
                this.headNames[i].string = t[i].name;
            }
        };

        __decorate([s([urlLoad.default])], e.prototype, "qihuanHeads", void 0);
        __decorate([s([cc.Label])], e.prototype, "headNames", void 0);
        __decorate([s(cc.Node)], e.prototype, "rankNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "rwdNode", void 0);
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(i.default)], e.prototype, "listRwd", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyRank", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyName", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblMyScore", void 0);
        __decorate([s(cc.Button)], e.prototype, "btnRe", void 0);
        __decorate([s(cc.Label)], e.prototype, "lblRe", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;