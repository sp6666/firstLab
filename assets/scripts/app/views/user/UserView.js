var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("./UserUpTip"),
    r = require("../../component/RoleSpine"),
    a = require("./UserOfficeItem"),
    s = require("../../models/TimeProxy"),
    c = require("./UserHeadItem"),
    _ = require("../../component/List"),
    d = require("../chenghao/ChengHaoItem"),
    u = require("../../Config"),
    p = cc._decorator,
    h = p.ccclass,
    y = p.property,
    f = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblId = null;
            e.lblName = null;
            e.lblShili = null;
            e.lblWuli = null;
            e.lblZhili = null;
            e.lblZhengzhi = null;
            e.lblMeili = null;
            e.lblExp = null;
            e.progress = null;
            e.scroll = null;
            e.tip = null;
            e.roleSpine = null;
            e.itemNode = null;
            e.officeItem = null;
            e.headItem = null;
            e.detail = null;
            e.list = null;
            e.chengHaoItem = null;
            e.lblWuNode = null;
            e.chenghaoNode = null;
            e.chenghaoParentNode = null;
            e.officeItems = null;
            e.isFirst = !0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.playerProxy.PLAYER_USER_UPDATE,
                this.onUseData,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_EP_UPDATE,
                this.updateEpShow,
                this
            );
            facade.subscribe(
                "USER_CLICK_OFFICETYPE",
                this.onClickOfficeType,
                this
            );
            facade.subscribe("USER_CLICK_OFFICE", this.onClickOfficeItem, this);
            facade.subscribe(
                n.playerProxy.PLAYER_LEVEL_UPDATE,
                this.updateRoleShow,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_SHOW_CHANGE_UPDATE,
                this.updateRoleShow,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_RESET_JOB,
                this.updateRoleJob,
                this
            );
            facade.subscribe(
                n.playerProxy.PLAYER_UPDATE_HEAD,
                this.updateRoleHead,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            facade.subscribe(
                n.playerProxy.PLAYER_ADDITION_UPDATE,
                this.onProDetail,
                this
            );
            this.tip.node.active = !1;
            this.officeItem.node.active = !1;
            this.chenghaoParentNode.active =
                u.Config.isShowChengHao &&
                s.funUtils.isOpenFun(s.funUtils.chenghao);
            this.itemNode.removeAllChildren();
            this.onUseData();
            this.updateEpShow();
        };
        e.prototype.updateRoleJob = function() {
            this.updateRoleHead();
            this.updateRoleShow();
        };
        e.prototype.updateRoleHead = function() {
            this.headItem.updateUserHead();
        };
        e.prototype.updateRoleShow = function() {
            this.roleSpine.updatePlayerShow();
        };
        e.prototype.updateItems = function() {
            null == this.officeItems && (this.officeItems = []);
            if (this.officeItems.length >= n.playerProxy.userData.level + 1) {
                this.updateItemShow();
                this.unscheduleAllCallbacks();
                this.scroll.scrollToTop();
            } else {
                var t = localcache.getItem(
                    localdb.table_officer,
                    this.officeItems.length + 1
                );
                if (null != t) {
                    if (
                        this.officeItems.length <
                            n.playerProxy.userData.level + 1 &&
                        null != t
                    ) {
                        var e = cc.instantiate(this.officeItem.node),
                            o = e.getComponent(a.default);
                        if (o) {
                            o.data = t;
                            e.active = !0;
                            this.itemNode.addChild(e);
                            this.officeItems.push(o);
                        }
                    }
                    this.scroll.scrollToTop();
                } else this.unscheduleAllCallbacks();
            }
        };
        e.prototype.updateItemShow = function() {
            if (null != this.officeItems)
                for (var t = 0; t < this.officeItems.length; t++)
                    this.officeItems[t].data = this.officeItems[t].data;
        };
        e.prototype.onClickOfficeType = function(t) {
            if (t) {
                this.tip.node.active = !0;
                this.tip.setOne(t);
            }
        };
        e.prototype.onClickOfficeItem = function(t) {
            if (t) {
                this.tip.node.active = !0;
                var e = localcache.getItem(localdb.table_officer, t.id - 1);
                this.tip.setMode(e || t);
            }
        };
        e.prototype.onUseData = function() {
            var t = n.playerProxy.userData,
                e = localcache.getItem(localdb.table_officer, t.level);
            this.lblName.string = t.name;
            this.lblId.string = t.uid + "";
            this.lblExp.string = i18n.t("COMMON_NUM", {
                f: t.exp,
                s: e.need_exp
            });
            var o = t.exp / e.need_exp;
            o = o > 1 ? 1 : o;
            this.progress.progress = o;
            if (
                u.Config.isShowChengHao &&
                s.funUtils.isOpenFun(s.funUtils.chenghao)
            ) {
                var i = localcache.getItem(localdb.table_fashion, t.chenghao);
                this.chenghaoNode.active = null != i;
                this.lblWuNode.active = !this.chenghaoNode.active;
                this.chengHaoItem.data = i;
            }
            this.updateItemShow();
            this.schedule(this.updateItems, 0.05);
        };
        e.prototype.updateEpShow = function() {
            var t = n.playerProxy.userEp;
            this.lblMeili.string = t.e4 + "";
            this.lblWuli.string = t.e1 + "";
            this.lblZhili.string = t.e2 + "";
            this.lblZhengzhi.string = t.e3 + "";
            this.lblShili.string = t.e1 + t.e2 + t.e3 + t.e4 + "";
        };
        e.prototype.onClickOpen = function(t, e) {
            s.funUtils.openViewUrl(e);
        };
        e.prototype.onClickUp = function() {
            var t = n.playerProxy.userData,
                e = localcache.getItem(localdb.table_officer, t.level);
            if (null != e) {
                for (
                    var o = i.stringUtil.isBlank(e.condition)
                            ? []
                            : e.condition.split("|"),
                        l = 0;
                    l < o.length;
                    l++
                ) {
                    var r = localcache.getItem(localdb.table_officerType, o[l]);
                    if (!n.playerProxy.officeLvIsOver(r)) {
                        n.playerProxy.officeOpen(r);
                        i.alertUtil.alert(n.playerProxy.getOfficeLvError(r));
                        return;
                    }
                }
                null == e || t.exp < e.need_exp
                    ? i.alertUtil.alert18n("USER_MW_VALUE")
                    : t.level != n.playerProxy.getMaxLv()
                    ? n.playerProxy.sendUserUp()
                    : i.alertUtil.alert18n("USER_MW_MAX");
            } else i.alertUtil.alert18n("COMMON_DATA_ERROR");
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this, !0);
        };
        e.prototype.onClickRenMai = function() {
            i.utils.openPrefabView("renmai/RenMaiView");
        };
        e.prototype.onClickWeiWang = function() {
            i.utils.openPrefabView("stronger/LevelUpView");
        };
        e.prototype.onClickDetail = function() {
            n.playerProxy.sendAddition();
        };
        e.prototype.onClickCloseDetail = function() {
            this.detail.active = !1;
        };
        e.prototype.onProDetail = function() {
            this.list.data = [
                {
                    type: 1,
                    aep: n.playerProxy.addition.hero
                },
                {
                    type: 2,
                    aep: n.playerProxy.addition.son
                },
                {
                    type: 3,
                    aep: n.playerProxy.addition.clothe
                }
            ];
            this.detail.active = !0;
        };
        __decorate([y(cc.Label)], e.prototype, "lblId", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblShili", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblWuli", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblZhili", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblZhengzhi", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblMeili", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([y(cc.ProgressBar)], e.prototype, "progress", void 0);
        __decorate([y(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([y(l.default)], e.prototype, "tip", void 0);
        __decorate([y(r.default)], e.prototype, "roleSpine", void 0);
        __decorate([y(cc.Node)], e.prototype, "itemNode", void 0);
        __decorate([y(a.default)], e.prototype, "officeItem", void 0);
        __decorate([y(c.default)], e.prototype, "headItem", void 0);
        __decorate([y(cc.Node)], e.prototype, "detail", void 0);
        __decorate([y(_.default)], e.prototype, "list", void 0);
        __decorate([y(d.default)], e.prototype, "chengHaoItem", void 0);
        __decorate([y(cc.Node)], e.prototype, "lblWuNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "chenghaoNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "chenghaoParentNode", void 0);
        return (e = __decorate([h], e));
    })(cc.Component);
o.default = f;
