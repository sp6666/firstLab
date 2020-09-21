var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    utils = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../models/TimeProxy"),
    r = require("../user/UserHeadItem"),
    a = require("./ChatBlankItem"),
    s = require("../chenghao/ChengHaoItem"),
    c = require("../../Config"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblNameRight = null;
            e.nodeMask = null;
            e.userHead = null;
            e.lblVip = null;
            e.lblVip1 = null;
            e.nodeVip = null;
            e.nodeVip1 = null;
            e.sysItem = null;
            e.leftItem = null;
            e.rightItem = null;
            e.lblReport = null;
            e.nodeReport = null;
            e.leftchengHao = null;
            e.rightchengHao = null;
            e.leftChengHaoParentNode = null;
            e.last = null;
            return e;
        }


        e.prototype.onLoad = function () {
            facade.subscribe(n.chatProxy.UPDATE_REPORT_MSG, this.updateReport, this);
            facade.subscribe(n.chatProxy.HIDE_OTHER_REPORT_MSG, this.hideReport, this);
            if (this.nodeReport) {
                this.nodeReport.active = false;
            }

            this.updateReport();
        };

        e.prototype.updateReport = function () {
            var data = n.chatProxy.reportData;
            if (data && this.lblReport) {
                this.lblReport.string = i18n.t('REPORT_WORD', {
                    n: (data.max_times - data.times) + '/' + data.max_times
                });
            }

        };

        e.prototype.hideReport = function () {
            if (this.nodeReport && this.nodeReport.active) {
                this.nodeReport.active = false;
                n.chatProxy.spliceReportMsg(this.data);
            }
        };

        e.prototype.onClickRole = function () {
            var t = this.data;
            t &&
                (t.user.uid == n.playerProxy.userData.uid ?
                    n.playerProxy.sendGetOther(n.playerProxy.userData.uid) :
                    n.playerProxy.sendGetOther(t.user.uid));
        };
        e.prototype.onClickContext = function () {
            var t = this.data;
            if (t && 3 == t.type && 0 == t.msg.indexOf("#")) {
                switch (t.msg.split("#")[1]) {
                    case "tangyuan":
                        l.funUtils.openView(l.funUtils.tangyuan.id);
                        return;

                    case "boite":
                        l.funUtils.openView(l.funUtils.jiulouView.id);
                        return;

                    case "childMarry":
                        l.funUtils.openView(l.funUtils.marryView.id);
                        return;

                    case "actqiandao":
                        l.funUtils.openView(l.funUtils.fuli.id);
                        return;

                    case "worldtree":
                        l.funUtils.openView(l.funUtils.worldtree.id);
                        return;

                    case "wishtree":
                        l.funUtils.openView(l.funUtils.wishingTree.id);
                        return;
                    case "linlangPrize":
                        l.funUtils.openView(l.funUtils.lingLang.id);
                        return;
                    case "linlangNotice":
                        l.funUtils.openView(l.funUtils.lingLang.id);
                        return;
                }
            }

            if (t && t.user.uid !== n.playerProxy.userData.uid && this.nodeReport) {

                if (!this.nodeReport.active) {
                    facade.send(n.chatProxy.HIDE_OTHER_REPORT_MSG);
                    this.nodeReport.active = true;
                    n.chatProxy.addReportMsg(this.data);
                    this.updateReport();
                } else {
                    facade.send(n.chatProxy.HIDE_OTHER_REPORT_MSG);
                    this.nodeReport.active = false;
                    n.chatProxy.spliceReportMsg(this.data);
                }

            } else {
                facade.send(n.chatProxy.HIDE_OTHER_REPORT_MSG);
            }
        };

        e.prototype.onClickEnd = function () {
            facade.send(n.chatProxy.HIDE_OTHER_REPORT_MSG);
        };

        e.prototype.onClickReport = function () {

            var data = this.data;
            var self = this;
            if (!n.chatProxy.bReportAble()) {
                utils.alertUtil.alert(i18n.t("REPORT_TIMES_LIMIT"));
                return;
            }
            utils.utils.showConfirmReport('' + n.chatProxy.getSpMsg(data.msg), i18n.t('REPORT_ASK'), function () {
                n.chatProxy.sendReport(data);
                if (self.nodeReport) {
                    self.nodeReport.active = false;
                }
            });

        };

        e.prototype.showData = function () {
            var t = this.data;
            if (t) {
                if (this.nodeReport) {
                    if (n.chatProxy.bReportMsg(this.data)) {
                        this.nodeReport.active = true;
                        this.updateReport();
                    } else {
                        this.nodeReport.active = false;
                    }
                }
                if (this.last == t) return;
                this.last = t;
                this.leftItem.node.active = this.rightItem.node.active = this.nodeMask.active =
                    null != t.user;
                this.sysItem.node.active = null == t.user;
                var e =
                    null != t.user && t.user.uid == n.playerProxy.userData.uid;
                this.nodeVip.active = this.nodeVip1.active = !1;
                if (t.user) {
                    e = t.user.uid == n.playerProxy.userData.uid;
                    this.nodeVip.active = this.nodeVip1.active = t.user.vip > 0;
                    this.lblVip.string = this.lblVip1.string = i18n.t(
                        "COMMON_VIP_NAME", {
                            v: t.user.vip
                        }
                    );
                    this.userHead.node.x =
                        (e ? -1 : 1) * Math.abs(this.userHead.node.x);
                    this.nodeMask.x = (e ? 1 : -1) * Math.abs(this.nodeMask.x);
                    this.leftItem.node.active = this.lblName.node.parent.active = !e;
                    this.rightItem.node.active = this.lblNameRight.node.parent.active = e;
                }
                this.lblName.string = this.lblNameRight.string = t.user ?
                    t.user.name :
                    "";
                this.leftChengHaoParentNode.active = !1;
                if (t.user) {
                    if (
                        c.Config.isShowChengHao &&
                        l.funUtils.isOpenFun(l.funUtils.chenghao)
                    ) {
                        var o = localcache.getItem(
                            localdb.table_fashion,
                            t.user.chenghao
                        );
                        this.leftChengHaoParentNode.active = null != o;
                        this.leftchengHao.data = o;
                        var i = localcache.getItem(
                            localdb.table_fashion,
                            t.user.chenghao
                        );
                        this.rightchengHao.data = i;
                    }
                } else {
                    this.leftchengHao.data = null;
                    this.rightchengHao.data = null;
                }
                this.delayShowHead();
                var r = n.chatProxy.getSpMsg(t.msg),
                    a = this.node.width / 2;
                this.sysItem.node.active ?
                    this.sysItem.setDest(r, 2 * Math.abs(this.sysItem.node.x)) :
                    this.leftItem.node.active ?
                    this.leftItem.setDest(
                        r,
                        a + Math.abs(this.leftItem.node.x)
                    ) :
                    this.rightItem.node.active &&
                    this.rightItem.setDest(
                        r,
                        a + Math.abs(this.rightItem.node.x)
                    );
            }
        };
        e.prototype.delayShowHead = function () {
            var t = this.data;
            t &&
                t.user &&
                this.userHead &&
                this.userHead.setUserHead(t.user.job, t.user.headavatar);
        };
        __decorate([u(cc.Node)], e.prototype, "nodeReport", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblReport", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblNameRight", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeMask", void 0);
        __decorate([u(r.default)], e.prototype, "userHead", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblVip", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblVip1", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeVip", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeVip1", void 0);
        __decorate([u(a.default)], e.prototype, "sysItem", void 0);
        __decorate([u(a.default)], e.prototype, "leftItem", void 0);
        __decorate([u(a.default)], e.prototype, "rightItem", void 0);
        __decorate([u(s.default)], e.prototype, "leftchengHao", void 0);
        __decorate([u(s.default)], e.prototype, "rightchengHao", void 0);
        __decorate([u(cc.Node)], e.prototype, "leftChengHaoParentNode", void 0);
        return (e = __decorate([d], e));
    })(i.default);
o.default = p;