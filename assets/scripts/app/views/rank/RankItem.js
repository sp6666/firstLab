var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../user/UserHeadItem"),
    a = require("../../models/TimeProxy"),
    s = require("../chenghao/ChengHaoItem"),
    c = require("../../Config"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblLv = null;
            e.lblRank = null;
            e.lblContent = null;
            e.headImg = null;
            e.lblNoChenghao = null;
            e.chengHao = null;
            return e;
        }
        e.prototype.onClickItem = function() {
            var t = this.data;
            t &&
                (t.uid == l.playerProxy.userData.uid
                    ? a.funUtils.openView(a.funUtils.userView.id)
                    : l.playerProxy.sendGetOther(t.uid));
        };
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                if (
                    c.Config.isShowChengHao &&
                    a.funUtils.isOpenFun(a.funUtils.chenghao)
                ) {
                    var e = localcache.getItem(
                        localdb.table_fashion,
                        t.chenghao
                    );
                    this.chengHao.data = e;
                    this.lblNoChenghao.active = !e;
                }
                var o = localcache.getItem(localdb.table_officer, t.level);
                this.lblName.string = t.name;
                this.lblLv.string = o ? o.name : "";
                l.rankProxy.isShowGuanKa
                    ? (this.lblContent.string = l.rankProxy.getGuankaString(
                          t.num
                      ))
                    : (this.lblContent.string = i18n.t("MAIN_SHILI", {
                          d: n.utils.formatMoney(t.num)
                      }));
                1 == l.rankProxy.showRankType
                    ? (this.lblContent.string = i18n.t("MAIN_SHILI", {
                          d: n.utils.formatMoney(t.num)
                      }))
                    : 2 == l.rankProxy.showRankType
                    ? (this.lblContent.string = l.rankProxy.getGuankaString(
                          t.num
                      ))
                    : 3 == l.rankProxy.showRankType &&
                      (this.lblContent.string =
                          i18n.t("RANK_TIP_3") +
                          "：" +
                          n.utils.formatMoney(t.num));
                this.lblRank.string = t.rid + "";
                this.headImg && this.headImg.setUserHead(t.job, t.headavatar);
            }
        };
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblRank", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblContent", void 0);
        __decorate([u(r.default)], e.prototype, "headImg", void 0);
        __decorate([u(cc.Node)], e.prototype, "lblNoChenghao", void 0);
        __decorate([u(s.default)], e.prototype, "chengHao", void 0);
        return (e = __decorate([d], e));
    })(i.default);
o.default = p;
