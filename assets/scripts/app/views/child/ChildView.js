var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../Initializer"),
    r = require("../../component/List"),
    a = require("../../component/UrlLoad"),
    s = require("../../component/StateImg"),
    c = require("../servant/ServantStarShow"),
    _ = require("../../component/ChildSpine"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.scrollChild = null;
            e.lblName = null;
            e.lblLevel = null;
            e.lblExp = null;
            e.lblTime = null;
            e.lblAllProp = null;
            e.lblEp1 = null;
            e.lblEp2 = null;
            e.lblEp3 = null;
            e.lblEp4 = null;
            e.lblMonther = null;
            e.lblLover = null;
            e.lblChildNum = null;
            e.list = null;
            e.nodeRename = null;
            e.nodeFeed = null;
            e.nodeInfo = null;
            e.nodeChildName = null;
            e.nodeLimit = null;
            e.nodeResume = null;
            e.nodeKeju = null;
            e.urlLoad = null;
            e.prg = null;
            e.stateImg = null;
            e.lblSex = null;
            e.lblHuoLi_Time = null;
            e.starShow = null;
            e.techangImg = null;
            e.imgArr = [];
            e.checkPeiYang = null;
            e.checkHuiFu = null;
            e.childSpine = null;
            e.cdNode = null;
            e.cdPrg = null;

            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(
                l.sonProxy.UPDATE_SON_INFO,
                this.updateSonInfo,
                this
            );
            facade.subscribe(l.sonProxy.UPDATE_SON_CHOSE, this.updateSeatByChose, this);
            facade.subscribe(l.sonProxy.UPDATE_SON_SEAT, this.updateSeat, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            this.prg.progress = 0;
            this.wholeData = null;
            var t = this;
            this.list.selectHandle = function (e) {
                t.updateSon();
            };

            l.sonProxy.actList.sort(this.sortChild);
            this.list.selectIndex = 0;
            this.updateSeat();
            
        };
        e.prototype.updateSonInfo = function () {
            //this.updateSon();
            this.updateSeat();

        };
        e.prototype.updateSeat = function () {
            var t = [],
                e = l.sonProxy.base.seat;
            if (l.sonProxy.actList)
                for (var o = 0; o < l.sonProxy.actList.length; o++)
                    t.push(l.sonProxy.actList[o]);
            for (o = t.length; o < e; o++) t.push({});
            localcache.getItem(localdb.table_seat, e + 1) &&
                t.push({
                    isLock: !0
                });
            this.wholeData = t;
            this.list.data = t;
            this.lblChildNum.string = i18n.t("SON_SEAT_NUM", {
                value1: l.sonProxy.actList.length,
                value2: e
            });
            this.updateSon();
            this.updateSeatByChose();

        };

        e.prototype.updateSeatByChose = function () {
            var curData = [];
            for (var sonSet of this.wholeData) {
                if (sonSet.id === undefined) {
                    curData.push(sonSet);
                    continue;
                }
                //判断星数
                var starLevel = 1;
                for (var check of l.sonProxy.selectMsg.star) {
                    if (check && sonSet.talent === starLevel) {
                        if (sonSet.sex === 1 && l.sonProxy.selectMsg.sex[0]) {
                            curData.push(sonSet);
                        } else if (sonSet.sex === 2 && l.sonProxy.selectMsg.sex[1]) {
                            curData.push(sonSet);
                        }
                    }
                    starLevel++;
                }

            }

            this.list.data = curData;
            //this.list.selectIndex = 0;
            this.scrollChild.stopAutoScroll();
            this.scrollChild.scrollToTop(0);
            this.updateSon();
        };

        e.prototype.onClickClost = function () {
            i.utils.closeView(this, !0);
        };
        e.prototype.updateSon = function () {
            var t = this.list.selectData;
            if (t && null != t.sex) {
                t = l.sonProxy.getSon(t.id);
                this.nodeInfo.active = !0;
                this.nodeChildName.active = !0;
                this.nodeLimit.active = !1;
                var e = localcache.getItem(localdb.table_minor, t.talent),
                    o = localcache.getItem(localdb.table_lvUp, t.level),
                    r = localcache.getItem(
                        localdb.table_vip,
                        l.playerProxy.userData.vip
                    ),
                    a = l.wifeProxy.getWifeData(t.mom),
                    s = t.exp / o.exp;
                this.lblLevel.string = i18n.t("SON_LEVEL", {
                    l: t.level,
                    m: e.level_max
                });
                this.nodeFeed.active =
                    (t.state == proto_sc.SomState.baby ||
                        t.state == proto_sc.SomState.Child) &&
                    t.power > 0;
                this.nodeResume.active =
                    (t.state == proto_sc.SomState.baby ||
                        t.state == proto_sc.SomState.Child) &&
                    0 == t.power;
                this.nodeKeju.active = t.state == proto_sc.SomState.Student;
                this.childSpine.setKid(t.id, t.sex, !1);
                this.lblExp.string = i18n.t("COMMON_NUM", {
                    f: t.exp,
                    s: o.exp
                });
                if (t.state != proto_sc.SomState.Student) {
                    if (this.prg.progress != s) {
                        var c = this;
                        n.uiUtils.showPrgChange(
                            this.prg,
                            this.prg.progress,
                            0 == s ? 0 : s,
                            1,
                            5,
                            function () {
                                c.prg.progress = s;
                            }
                        );
                    }
                } else {
                    this.prg.progress = 1;
                    this.lblExp.string = "";
                }
                t.power < r.sonpow ?
                    n.uiUtils.countDown(
                        t.cd.next,
                        this.lblTime,
                        function () {
                            t.cd.label = "sonpow";
                            l.playerProxy.sendAdok(t.cd.label);
                        },
                        0 == t.power
                    ) :
                    this.lblTime.unscheduleAllCallbacks();
                if (t.power > 0) {
                    this.lblTime.string = i18n.t("COMMON_NUM", {
                        f: t.power,
                        s: r.sonpow
                    });
                    this.lblHuoLi_Time.string = i18n.t("SON_CUR_HUO_LI");
                    this.cdNode.active = !1;
                } else {
                    this.lblHuoLi_Time.string = i18n.t("SON_HUI_FU_TIME");
                    this.cdNode.active = !0;
                    var _ = 10800 - (t.cd.next - i.timeUtil.second);
                    this.cdPrg.progress = _ / 10800;
                }
                this.stateImg.total = r.sonpow;
                this.stateImg.value = t.power;
                this.nodeRename.active = t.state == proto_sc.SomState.tName;
                this.lblSex.string =
                    1 == t.sex ? i18n.t("CREATE_NAN") : i18n.t("CREATE_NV");
                this.nodeRename.active ?
                    (this.lblName.string = i18n.t("SON_NAME_NEED")) :
                    (this.lblName.string = t.name);
                this.lblAllProp.string = i18n.t("SON_ZONG_HE_SHU_XING", {
                    value: t.ep.e1 + t.ep.e2 + t.ep.e3 + t.ep.e4
                });
                this.lblEp1.string = t.ep.e1 + "";
                this.lblEp2.string = t.ep.e2 + "";
                this.lblEp3.string = t.ep.e3 + "";
                this.lblEp4.string = t.ep.e4 + "";
                this.lblLover.string = a.love + "";
                this.lblMonther.string =
                    i18n.t("SON_MONTHER") +
                    " " +
                    l.playerProxy.getWifeName(t.mom);
                this.starShow.setValue(t.talent);
                var d = localcache.getItem(localdb.table_wife, t.mom);
                this.techangImg.spriteFrame = this.imgArr[d.type - 1];
                0 == l.sonProxy.getChengList().length &&
                    t.state == proto_sc.SomState.Student &&
                    facade.send(l.guideProxy.UPDATE_TRIGGER, 15e3);
            } else {
                this.childSpine.clearKid();
                this.nodeChildName.active = !1;
                this.nodeInfo.active = !1;

                if (t && t.isLock === undefined) {
                    this.nodeLimit.active = true;
                } else {
                    this.nodeLimit.active = false;
                }
            }
        };
        e.prototype.onClickLvUp = function () {
            var t = this.list.selectData;
            t &&
                null != t.sex &&
                (this.checkPeiYang.isChecked ?
                    l.sonProxy.sendAllPlay() :
                    l.sonProxy.sendPlay(t.id));
        };
        e.prototype.onClickWeiShi = function () {
            var t = this,
                e = this.list.selectData;
            if ((e = l.sonProxy.getSon(e.id)).power <= 0) {
                var o = i.utils.getParamInt("zs_cost_item_hl");
                i.utils.showConfirmItem(
                    i18n.t("SON_RESUME_CONFIRM", {
                        t: n.uiUtils.getItemNameCount(o, 1)
                    }),
                    o,
                    l.bagProxy.getItemCount(o),
                    function () {
                        l.bagProxy.getItemCount(o) <= 0 ?
                            i.alertUtil.alertItemLimit(o) :
                            t.checkHuiFu.isChecked ?
                            l.sonProxy.sendAllFood() :
                            l.sonProxy.sendOnFood(e.id);
                    },
                    "SON_RESUME_CONFIRM"
                );
            }
        };


        e.prototype.onClickName = function () {
            var t = this.list.selectData;
            if (t && null != t.sex) {
                l.sonProxy.renameId = t.id;
                i.utils.openPrefabView("child/RenameView");
            }
        };

        e.prototype.onClickName = function () {
            var t = this.list.selectData;
            if (t && null != t.sex) {
                l.sonProxy.renameId = t.id;
                i.utils.openPrefabView("child/RenameView");
            }
        };
        e.prototype.onClickKeju = function () {
            var t = this.list.selectData;
            if (t && null != t.sex) {
                0 == l.sonProxy.getChengList().length &&
                    t.state == proto_sc.SomState.Student &&
                    facade.send(l.guideProxy.UPDATE_TRIGGER, 15001);
                l.sonProxy.sendKeJu(t.id);
            }
        };
        e.prototype.onClickGoTo = function () {
            i.utils.closeView(this);
            i.utils.openPrefabView("wife/WifeSelectView");
        };
        e.prototype.sortChild = function (t, e) {
            return e.level - t.level;
        };
        __decorate([p(cc.ScrollView)], e.prototype, "scrollChild", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblLevel", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblAllProp", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblEp1", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblEp2", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblEp3", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblEp4", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblMonther", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblLover", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblChildNum", void 0);
        __decorate([p(r.default)], e.prototype, "list", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeRename", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeFeed", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeInfo", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeChildName", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeLimit", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeResume", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeKeju", void 0);
        __decorate([p(a.default)], e.prototype, "urlLoad", void 0);
        __decorate([p(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([p(s.default)], e.prototype, "stateImg", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblSex", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblHuoLi_Time", void 0);
        __decorate([p(c.default)], e.prototype, "starShow", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "techangImg", void 0);
        __decorate([p([cc.SpriteFrame])], e.prototype, "imgArr", void 0);
        __decorate([p(cc.Toggle)], e.prototype, "checkPeiYang", void 0);
        __decorate([p(cc.Toggle)], e.prototype, "checkHuiFu", void 0);
        __decorate([p(_.default)], e.prototype, "childSpine", void 0);
        __decorate([p(cc.Node)], e.prototype, "cdNode", void 0);
        __decorate([p(cc.ProgressBar)], e.prototype, "cdPrg", void 0);
        return (e = __decorate([u], e));
    })(cc.Component);
o.default = h;