var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.sonList = null;
            e.lvliList = null;
            e.lvliScroll = null;
            e.tipNode = null;
            e.btnOneKeyLilian = null;
            e._sonList = [];
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("SON_LI_LIAN_LIST", this.onSonList, this);
            facade.subscribe("SON_LI_LIAN_SEAT", this.onSonList, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            this.sonList.selectHandle = function (t) {
                if (!(l.sonProxy.lilianSeat.desk + 1 < t.id))
                    if (l.sonProxy.lilianSeat.desk < t.id) {
                        var e = localcache.getItem(
                            localdb.table_practiceSeat,
                            l.sonProxy.lilianSeat.desk + 1
                        );
                        i.utils.showConfirmItem(
                            i18n.t("SON_LI_LIAN_JIE_SUO_XI_WEI", {
                                value: e.cost
                            }),
                            1,
                            l.playerProxy.userData.cash,
                            function () {
                                var t = localcache.getItem(
                                    localdb.table_practiceSeat,
                                    l.sonProxy.lilianSeat.desk + 1
                                );
                                l.playerProxy.userData.cash < t.cost
                                    ? i.alertUtil.alertItemLimit(1)
                                    :l.playerProxy.userData.vip >= t.VIP?//add by Ocean
                                    l.sonProxy.sendBuyLilianSeat()
                                    :i.alertUtil.alert18n("LOOK_FOR_VIP_LEVEL_SHORT");
                            },
                            "SON_LI_LIAN_JIE_SUO_XI_WEI"
                        );
                    } else {
                        var o = t.data;
                        if (null == o || 0 == o.sid) {
                            l.sonProxy.lilianData = new proto_cs.son.liLianSon();
                            l.sonProxy.lilianData.sid = 0;
                            l.sonProxy.lilianData.travel = 0;
                            l.sonProxy.lilianData.luggage = 0;
                            l.sonProxy.lilianData.did = parseInt(t.id);
                            i.utils.openPrefabView(
                                "child/ChildLilianSelectWin"
                            );
                        } else
                            0 == o.cd.next
                                ? l.sonProxy.sendLilianReward(o.id, o.sid)
                                : i.alertUtil.alert18n("SON_LI_LIAN_ZHENG_ZAI");
                    }
            };
            l.sonProxy.sendInfoLilian();
            this.showLvli();
            this.schedule(this.onLvli, 60);
        };
        e.prototype.onSonList = function () {
            this._sonList = [];
            //fix by Ocean
            var cfg =localcache.getList(localdb.table_practiceSeat);
            var length =cfg.length;
            for (var t = 1; t <= length; t++)
                this._sonList.push({
                    id: t,
                    data: l.sonProxy.getLilianData(t)
                });
            this.sonList.data = this._sonList;
        };
        e.prototype.onLvli = function () {
            for (
                var t = localcache.getList(localdb.table_practiceLvli),
                e = [],
                o = [],
                i = 0;
                i < t.length;
                i++
            )
                1 == t[i].sex || 0 == t[i].sex
                    ? e.push(t[i])
                    : (2 != t[i].sex && 0 != t[i].sex) || o.push(t[i]);
            for (i = 0; i < l.sonProxy.lilianList.length; i++) {
                var n = l.sonProxy.lilianList[i];
                if (n.sid) {
                    var r = l.sonProxy.getSon(n.sid),
                        a = null;
                    if (1 == r.sex) {
                        a = e[Math.floor(Math.random() * e.length)];
                    } else if (2 == r.sex) {
                        a = o[Math.floor(Math.random() * o.length)];
                    }
                    var s = {
                        name: r.name,
                        sys: a
                    };
                    l.sonProxy.lilianLvli.push(s);
                }
            }
            this.showLvli();
        };
        e.prototype.showLvli = function () {
            this.tipNode.active = 0 == l.sonProxy.lilianLvli.length;
            var t = [];
            t =
                l.sonProxy.lilianLvli.length <= 25
                    ? l.sonProxy.lilianLvli
                    : l.sonProxy.lilianLvli.splice(
                        l.sonProxy.lilianLvli.length - 25,
                        25
                    );
            this.lvliList.data = t;
            t.length > 8 && this.lvliScroll.scrollToBottom();
        };
        e.prototype.onClickClose = function () {
            i.utils.closeView(this, !0);
        };
        e.prototype.onClickOnekeyLilian = function () {
            if (l.playerProxy.userData.vip < 5)
                i.alertUtil.alert18n("SON_LI_LIAN_ONE_KEY_VIP_OPEN");
            else {
                var t = l.timeProxy.getLoacalValue("CHILD_ONE_KEY_LI_LIAN"),
                    e = JSON.parse(t);
                var isShowError = false;
                if (null != e) {
                    var o = [],//不需要元宝最终结果数组
                        cashArr = [],//需要元宝的结果
                        n = 0,//全部银两
                        r = 0,//全部元宝
                        a = {};//全部道具
                    for (var s in e)
                        if (null != e[s]) {
                            var c = {};
                            c.did = e[s].did;
                            //add by cjf 只传空位
                            if (this._sonList && this._sonList[~~s - 1]) {
                                if (this._sonList[~~s - 1].data && this._sonList[~~s - 1].data.sid > 0)
                                    continue;
                            }
                            c.sid = e[s].sid;
                            c.travel = e[s].travel;
                            c.luggage = e[s].luggage;
                            c.localep2 = l.playerProxy.userEp.e2;
                            var _ = localcache.getItem(
                                localdb.table_practiceItem,
                                e[s].luggage
                            );
                            if (null != _) {
                                if (0 == _.itemid) {
                                    var d = l.sonProxy.getSon(e[s].sid);
                                    n += Math.ceil(
                                        ((30 * _.max) /
                                            Math.ceil(
                                                l.playerProxy.userEp.e2 / 800
                                            )) *
                                        0.5 *
                                        l.playerProxy.userEp.e2 *
                                        d.talent *
                                        0.3
                                    );
                                } else {
                                    if (l.bagProxy.getItemCount(_.itemid) < (a[_.itemid] || 0) + 1) {
                                        //道具不足
                                        // i.alertUtil.alertItemLimit(_.itemid);
                                        isShowError = true;
                                        continue;
                                    }
                                    a[_.itemid] = (a[_.itemid] || 0) + 1;
                                }
                                var u = localcache.getItem(
                                    localdb.table_practiceTravel,
                                    e[s].travel
                                );
                                if (null != u) {
                                    if (1 == u.type) {
                                        if (l.playerProxy.userData.cash < (r + u.money)) {
                                            //元宝不足
                                            // i.alertUtil.alertItemLimit(1);
                                            isShowError = true;
                                            continue;
                                        }
                                        r += u.money
                                        cashArr.push(c);
                                        continue;
                                    } else if (2 == u.type) {
                                        if (l.playerProxy.userData.food < (n + u.money)) {
                                            //银两不足
                                            // i.alertUtil.alertItemLimit(3);
                                            isShowError = true;
                                            continue;
                                        }
                                        n += u.money
                                    }
                                } else {
                                    i.alertUtil.alert(
                                        i18n.t("SON_LI_LIAN_CHU_XING_LIMIT", {
                                            num: e[s].travel
                                        })
                                    );
                                    continue;
                                }
                            } else
                                i.alertUtil.alert(
                                    i18n.t("SON_LI_LIAN_XING_LI_LIMIT", {
                                        num: e[s].luggage
                                    })
                                );
                            o.push(c);
                        }
                    if (isShowError) {
                        i.alertUtil.alert(
                            i18n.t("SON_YIJIAN_LI_LIAN_LIMIT")
                        );
                    }
                    if (r > 0 && cashArr.length) {
                        //扣元宝提示
                        i.utils.showConfirmItem(
                            i18n.t("SON_YIJIAN_LI_LIAN_CONFIRM", {
                                value: r,
                            }),
                            1,
                            l.playerProxy.userData.cash,
                            function () {
                                l.playerProxy.userData.cash >= r ?
                                    l.sonProxy.sendOneKeyLilian(cashArr)
                                    : i.alertUtil.alert(
                                        i18n.t("SON_YIJIAN_LI_LIAN_LIMIT")
                                    );;
                            },
                            "SON_YIJIAN_LI_LIAN_CONFIRM"
                        );
                    }
                    if (o.length)
                        l.sonProxy.sendOneKeyLilian(o)
                } else i.alertUtil.alert18n("SON_LI_LIAN_XIAN_AN_PAI");
            }
        };
        e.prototype.onClickOneKeyGuilai = function () {
            if (l.playerProxy.userData.vip < 4)
                i.alertUtil.alert18n("SON_LI_LIAN_FINNISH_VIP_OPEN");
            else {
                for (var t = !1, e = 0; e < l.sonProxy.lilianList.length; e++)
                    l.sonProxy.lilianList[e].sid && 0 != l.sonProxy.lilianList[e].sid && (t = !0);
                t ? l.sonProxy.sendOneKeyLilianFinish() : i.alertUtil.alert18n("SON_LI_LIAN_NO_BODY");
            }
        };
        __decorate([s(n.default)], e.prototype, "sonList", void 0);
        __decorate([s(n.default)], e.prototype, "lvliList", void 0);
        __decorate([s(cc.ScrollView)], e.prototype, "lvliScroll", void 0);
        __decorate([s(cc.Node)], e.prototype, "tipNode", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnOneKeyLilian", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
