var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.lbldate = null;
            e.lblcd = null;
            e.lblMyRank = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("SUPPORT_RID_UPDATE", this.ridUpdate, this);
            this.lbldate.string =
                l.timeUtil.format(n.supportProxy.cfg.info.sTime, "MM-dd") +
                i18n.t("COMMON_ZHI") +
                l.timeUtil.format(n.supportProxy.cfg.info.eTime, "MM-dd");
            this.list.data = n.supportProxy.cfg.winnerRank;
            this.ridUpdate();
            var t = this;
            r.uiUtils.countDown(
                n.supportProxy.cfg.info.eTime,
                this.lblcd,
                function() {
                    t.lblcd.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
        };
        e.prototype.onTimer = function() {
            var t =
                n.supportProxy.cfg.info.eTime - l.timeUtil.second > 0
                    ? n.supportProxy.cfg.info.eTime - l.timeUtil.second
                    : 0;
            this.lblcd.string = l.timeUtil.second2hms(t);
        };
        e.prototype.ridUpdate = function() {
            this.lblMyRank.string =
                n.supportProxy.myRid.rid > 0
                    ? n.supportProxy.myRid.rid + ""
                    : i18n.t("RAKN_UNRANK");
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickRank = function() {
            l.utils.openPrefabView("support/SupportTotalRank");
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Label)], e.prototype, "lbldate", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblcd", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblMyRank", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
