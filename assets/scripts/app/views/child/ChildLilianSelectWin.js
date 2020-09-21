var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/ChildSpine"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.sonUrl = null;
            e.xingliUrl = null;
            e.chuxingUrl = null;
            e.lblcost = null;
            e.childSpine = null;
            e.childSpineSmall = null;
            e.jiahao = null;
            e.rightNode = null;
            e.headNode = null;
            e.cost = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                "CHILD_LI_LIAN_SELECT_UPDATE",
                this.onSeletUpdate,
                this
            );
        };
        e.prototype.onClickSelectSon = function() {
            i.utils.openPrefabView("child/ChildLilianSonSelect");
        };
        e.prototype.onClickXingli = function() {
            l.sonProxy.lilianData.sid && 0 != l.sonProxy.lilianData.sid
                ? i.utils.openPrefabView("child/ChildLilianXingliSelect")
                : i.alertUtil.alert18n("SON_LI_LIAN_QING_XIAN_XUAN_ZE");
        };
        e.prototype.onClickFangShi = function() {
            l.sonProxy.lilianData.sid && 0 != l.sonProxy.lilianData.sid
                ? i.utils.openPrefabView("child/ChildLilianTravelSelect")
                : i.alertUtil.alert18n("SON_LI_LIAN_QING_XIAN_XUAN_ZE");
        };
        e.prototype.onClickStart = function() {
            if (0 == l.sonProxy.lilianData.sid)
                i.alertUtil.alert18n("SON_LI_LIAN_QING_XIAN_XUAN_ZE");
            else if (0 == l.sonProxy.lilianData.luggage)
                i.alertUtil.alert18n("SON_LI_LIAN_XUAN_ZE_XING_LI");
            else if (0 == l.sonProxy.lilianData.travel)
                i.alertUtil.alert18n("SON_LI_LIAN_XUAN_ZE_CHU_XING_FANG_SHI");
            else {
                if (l.playerProxy.userData.food < this.cost) {
                    i.alertUtil.alertItemLimit(3);
                    return;
                }
                l.feigeProxy.getSonFeige().length > 100
                    ? i.utils.showConfirm(
                          i18n.t("SON_FEI_GE_SHAN_CHU"),
                          function() {
                              l.sonProxy.sendDeleteMail();
                              l.sonProxy.sendLilianSon(
                                  l.sonProxy.lilianData.sid,
                                  l.sonProxy.lilianData.did,
                                  l.sonProxy.lilianData.luggage,
                                  l.sonProxy.lilianData.travel,
                                  l.playerProxy.userEp.e2
                              );
                          }
                      )
                    : l.sonProxy.sendLilianSon(
                          l.sonProxy.lilianData.sid,
                          l.sonProxy.lilianData.did,
                          l.sonProxy.lilianData.luggage,
                          l.sonProxy.lilianData.travel,
                          l.playerProxy.userEp.e2
                      );
                this.saveOneKeyLilian();
                i.utils.closeView(this);
            }
        };
        e.prototype.onSeletUpdate = function() {
            this.jiahao.active = 0 == l.sonProxy.lilianData.sid;
            this.rightNode.active = 0 != l.sonProxy.lilianData.sid;
            if (0 != l.sonProxy.lilianData.sid) {
                var t = l.sonProxy.getSon(l.sonProxy.lilianData.sid);
                this.childSpine.node.active = t.state > 3;
                this.childSpineSmall.node.active = t.state <= 3;
                t.state > 3
                    ? this.childSpine.setKid(t.id, t.sex)
                    : this.childSpineSmall.setKid(t.id, t.sex, !1);
                this.headNode.x = -191;
            }
            this.cost = 0;
            if (0 != l.sonProxy.lilianData.luggage) {
                var e = localcache.getItem(
                    localdb.table_practiceItem,
                    l.sonProxy.lilianData.luggage
                );
                if (0 == e.itemid) {
                    t = l.sonProxy.getSon(l.sonProxy.lilianData.sid);
                    var o = Math.ceil(
                        ((30 * e.max) /
                            Math.ceil(l.playerProxy.userEp.e2 / 800)) *
                            0.5 *
                            l.playerProxy.userEp.e2 *
                            t.talent *
                            0.3
                    );
                    this.cost += o;
                    this.xingliUrl.url = r.uiHelps.getXingLiIcon(e.id);
                } else this.xingliUrl.url = r.uiHelps.getItemSlot(e.itemid);
            }
            if (0 != l.sonProxy.lilianData.travel) {
                var i = localcache.getItem(
                    localdb.table_practiceTravel,
                    l.sonProxy.lilianData.travel
                );
                this.chuxingUrl.url = r.uiHelps.getChuXingIcon(i.id);
                this.cost += i.money;
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.saveLilian = function() {
            var t = l.timeProxy.getLoacalValue("CHILD_LI_LIAN_DATA"),
                e = JSON.parse(t);
            null == e && (e = {});
            e[l.sonProxy.lilianData.sid.toString()] = l.sonProxy.lilianData;
            l.timeProxy.saveLocalValue("CHILD_LI_LIAN_DATA", JSON.stringify(e));
        };
        e.prototype.saveOneKeyLilian = function() {
            var t = l.timeProxy.getLoacalValue("CHILD_ONE_KEY_LI_LIAN"),
                e = JSON.parse(t);
            null == e && (e = {});
            for (var o in e)
                null != e[o] &&
                    e[o].sid == l.sonProxy.lilianData.sid &&
                    (e[o] = null);
            e[l.sonProxy.lilianData.did] = l.sonProxy.lilianData;
            var i = JSON.stringify(e);
            l.timeProxy.saveLocalValue("CHILD_ONE_KEY_LI_LIAN", i);
        };
        __decorate([_(n.default)], e.prototype, "sonUrl", void 0);
        __decorate([_(n.default)], e.prototype, "xingliUrl", void 0);
        __decorate([_(n.default)], e.prototype, "chuxingUrl", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblcost", void 0);
        __decorate([_(a.default)], e.prototype, "childSpine", void 0);
        __decorate([_(a.default)], e.prototype, "childSpineSmall", void 0);
        __decorate([_(cc.Node)], e.prototype, "jiahao", void 0);
        __decorate([_(cc.Node)], e.prototype, "rightNode", void 0);
        __decorate([_(cc.Node)], e.prototype, "headNode", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
