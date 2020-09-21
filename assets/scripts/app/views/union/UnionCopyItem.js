var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblPer = null;
            e.lblPro = null;
            e.lblRwd1 = null;
            e.lblRwd2 = null;
            e.lblTime = null;
            e.btnOpen = null;
            e.btnEnter = null;
            e.btnLook = null;
            e.btnRank = null;
            e.imgNpc = null;
            e.roleUrl = null;
            e.eff = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this.data;
            if (t) {
                for (
                    var e = null, o = 0;
                    n.unionProxy.bossInfo && o < n.unionProxy.bossInfo.length;
                    o++
                )
                    if (n.unionProxy.bossInfo[o].id == t.id) {
                        e = n.unionProxy.bossInfo[o];
                        break;
                    }
                this.lblName.string = t.name;
                this.lblRwd1.string =
                    i18n.t("UNION_TOTAL_GONG_XIAN") + "+" + t.rwd.fund;
                this.lblRwd2.string =
                    i18n.t("UNION_EXP_TXT_2") + "+" + t.rwd.exp;
                this.btnOpen.node.active = !0;
                this.btnRank.node.active = !1;
                this.btnEnter.node.active = !1;
                this.btnLook.node.active = !1;
                this.roleUrl.url = a.uiHelps.getServantSmallSpine(t.image);
                if (e && e.id == t.id) {
                    this.btnOpen.node.active = !1;
                    this.btnEnter.node.active = 1 == e.type;
                    this.btnRank.node.active = 1 == e.type;
                    this.btnLook.node.active = 2 == e.type;
                    var i = e.hp < 0 ? 0 : e.hp;
                    this.lblPro.progress = i / t.hp;
                    var r = ((i / t.hp) * 100).toFixed(2);
                    this.lblPer.string =
                        1 == e.type
                            ? r + "%"
                            : 3 == e.type
                            ? i18n.t("union_scaped")
                            : i18n.t("union_killed");
                    var s =
                        l.timeUtil.second > l.timeUtil.getTodaySecond(0) &&
                        l.timeUtil.second < l.timeUtil.getTodaySecond(23.5);
                    this.eff.node.active = 1 == e.type && s;
                    this.eff.animation = "animation";
                } else {
                    this.lblPro.progress = 1;
                    this.lblPer.string = "100%";
                    this.eff.node.active = !1;
                }
            }
        };
        e.prototype.onClickEnter = function() {
            if (
                l.timeUtil.second > l.timeUtil.getTodaySecond(0) &&
                l.timeUtil.second < l.timeUtil.getTodaySecond(23.5)
            ) {
                n.unionProxy.openCopyParam = this.data;
                l.utils.openPrefabView("union/UnionFight");
                l.utils.closeNameView("union/UnionCopy");
            } else l.alertUtil.alert18n("UNION_COPY_TIME_PASS");
        };
        e.prototype.onClickOpen = function() {
            if (n.unionProxy.memberInfo.post > 2)
                l.alertUtil.alert18n("UNION_COPY_OPEN_LIMIT");
            else {
                n.unionProxy.openCopyParam = this.data;
                l.utils.openPrefabView("union/UnionOpenCopy");
            }
        };
        e.prototype.onClickLook = function() {
            n.unionProxy.openCopyParam = this.data;
            var t = this.data;
            t && n.unionProxy.sendHitList(t.id);
        };
        e.prototype.onClickRank = function() {
            n.unionProxy.openCopyParam = this.data;
            var t = this.data;
            t && n.unionProxy.sendHitList(t.id);
        };
        e.prototype.onClickReopen = function() {
            n.unionProxy.openCopyParam = this.data;
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblPer", void 0);
        __decorate([_(cc.ProgressBar)], e.prototype, "lblPro", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRwd1", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblRwd2", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnOpen", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnEnter", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnLook", void 0);
        __decorate([_(cc.Button)], e.prototype, "btnRank", void 0);
        __decorate([_(cc.Sprite)], e.prototype, "imgNpc", void 0);
        __decorate([_(r.default)], e.prototype, "roleUrl", void 0);
        __decorate([_(sp.Skeleton)], e.prototype, "eff", void 0);
        return (e = __decorate([c], e));
    })(i.default);
o.default = d;
