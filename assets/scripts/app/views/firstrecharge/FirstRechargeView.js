var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../component/UrlLoad"),
    a = require("../../utils/UIUtils"),
    s = require("../../models/TimeProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblZZ = null;
            e.lblTC = null;
            e.list = null;
            e.btnRecharge = null;
            e.btnGet = null;
            e.roleImg = null;
            e.pro_1 = null;
            e.pro_2 = null;
            e.cList = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                "FIRST_RECHARGE_UPDATE",
                this.onFirstRechargeUpdate,
                this
            );
            this.onFirstRechargeUpdate();
            a.uiUtils.scaleRepeat(this.pro_1, 1, 1.25);
            a.uiUtils.scaleRepeat(this.pro_2, 1, 1.25);
        };
        e.prototype.onFirstRechargeUpdate = function () {
            if (l.firstRechargeProxy.data) {
                this.btnRecharge.node.active =
                    0 == l.firstRechargeProxy.data.type;
                this.btnGet.node.active = 1 == l.firstRechargeProxy.data.type;
                var t = n.utils.getParamInt("first_recharge_hero"),
                    e = localcache.getItem(localdb.table_hero, t);
                this.roleImg.url = a.uiHelps.getServantSpine(t);
                this.lblTC.string =
                    i18n.t("SERVANT_TE_CHANG") + "：" + e.specMsg;
                for (var o = 0, i = 0; i < e.skills.length; i++) {
                    o += localcache.getItem(
                        localdb.table_epSkill,
                        e.skills[i].id
                    ).star;
                }
                this.lblZZ.string = i18n.t("SERVANT_ZHZZ", {
                    zz: o
                });
                var r = localcache.getItem(localdb.table_shouchongReward, 1),
                    s = [],
                    c = [];
                for (i = 0; i < r.firstRwd.length; i++) {
                    var _ = new a.ItemSlotData();
                    _.id = r.firstRwd[i].id;
                    _.count = r.firstRwd[i].count;
                    _.kind = r.firstRwd[i].kind;
                    1 == r.firstRwd[i].kind ?
                        s.push(_) :
                        95 == r.firstRwd[i].kind && c.push(_);
                }
                this.list.data = s;
                this.cList.data = c;
                var d = l.voiceProxy.randomHeroVoice(t);
                d && n.audioManager.playSound("servant/" + d.herovoice, !0, !0);
            }
        };
        e.prototype.onClickGetReward = function () {
            l.firstRechargeProxy.sendGetReward();
        };
        e.prototype.onClickRecharge = function () {
            s.funUtils.openView(s.funUtils.recharge.id);
        };
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };
        __decorate([d(cc.Label)], e.prototype, "lblZZ", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTC", void 0);
        __decorate([d(i.default)], e.prototype, "list", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnRecharge", void 0);
        __decorate([d(cc.Button)], e.prototype, "btnGet", void 0);
        __decorate([d(r.default)], e.prototype, "roleImg", void 0);
        __decorate([d(cc.Node)], e.prototype, "pro_1", void 0);
        __decorate([d(cc.Node)], e.prototype, "pro_2", void 0);
        __decorate([d(i.default)], e.prototype, "cList", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;