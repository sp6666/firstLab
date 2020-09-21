var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../component/UrlLoad"),
    a = require("../../component/JiBanShow"),
    s = require("../../formula"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function (t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblLove = null;
            e.lblMeili = null;
            e.urlLoad = null;
            e.lblTalk = null;
            e.nodeWife = null;
            e.btnNode = null;
            e.btn_node = null;
            e.lblSonNum = null;
            e.lblWifeExp = null;
            e.lblWifeInfo = null;
            e.lblWifeInfo_2 = null;
            e.btnLeft = null;
            e.btnRight = null;
            e.speakAnie = null;
            e.luckImg = null;
            e.lblJbValue = null;
            e.changeNode = null;
            e.btnGuanShi = null;
            //add by cjf
            e.lblGuanShi = null;
            e.techangIcon = null;
            e.techangArr = [];
            e.skillRed = null;
            e._marryList = null;
            e._unMarryList = null;
            e._curIndex = 0;
            e._isMarry = !0;
            e.curWifeData = null;
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe("WIFE_LIST_UPDATE", this.updateShow, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
            facade.subscribe("PLAYER_HERO_SHOW", this.onHeroShow, this);
            facade.subscribe("UPDATE_WIFE_JB", this.updateCurShow, this);
            facade.subscribe(
                n.wifeProxy.WIFE_TALK_UPDATE,
                this.onWifeTalk,
                this
            );
            var t = this.node.openParam;
            this._curIndex = t.index;
            this.updateShow();
            this.btn_node.active = n.wifeProxy.getMarryList(!1).length > 1;
            l.uiUtils.scaleRepeat(this.btnLeft, 0.9, 1.2);
            l.uiUtils.scaleRepeat(this.btnRight, 0.9, 1.2);
            i.utils.showEffect(this.speakAnie, 0);
            this.changeNode.active = n.wifeProxy.getMarryList(!1).length > 1;
            this.onPlayVoice(null, null);
            this.onHeroShow();
            t.openSkill && this.onClickSkill();
        };
        e.prototype.updateShow = function () {
            if (null == this._marryList) {
                this._marryList = n.wifeProxy.getMarryList(!1);
                this._unMarryList = n.wifeProxy.getMarryList(!0);
            }
            this.btnNode.active = this._isMarry;
            this.updateCurShow();
        };
        e.prototype.updateCurShow = function () {
            var t = this._isMarry
                ? this._marryList[this._curIndex]
                : this._unMarryList[this._curIndex];
            this.nodeWife.active = null != t;
            if (t) {
                var e = localcache.getItem(localdb.table_wife, t.wid),
                    o = n.wifeProxy.getWifeData(t.wid);
                this.techangIcon.spriteFrame = this.techangArr[t.type - 1];
                n.wifeProxy.curSelectWife = o;
                this.urlLoad.url = l.uiHelps.getWifeBody(e.res);
                if (o) {
                    this.lblLove.string = o.love + "";
                    this.lblMeili.string = o.flower + "";
                    this.lblWifeExp.string = o.exp + "";
                    this.lblSonNum.string = n.sonProxy.getWifeSonNum(o.id) + "";
                    this.lblTalk.string = (n.playerProxy.userData.sex,
                        t.talk[Math.floor(Math.random() * t.talk.length)]);
                    var i = (2 == n.playerProxy.userData.sex
                        ? e.info2
                        : e.info
                    ).split("|");
                    this.lblWifeInfo.string = i[0];
                    this.lblWifeInfo_2.string = i.length >= 2 ? i[1] : "";
                }
                var r = n.jibanProxy.getWifeJbLv(e.wid).level % 1e3;
                this.luckImg.setValue(5, r);
                var a = n.jibanProxy.getWifeNextJb(r),
                    s =
                        r > 1
                            ? i18n.t("WIFE_SKILL_EFF_2", {
                                num:
                                    n.jibanProxy.getWifeJbLv(e.wid).prop / 100
                            })
                            : "";
                this.lblJbValue.string =
                    null == a
                        ? s
                        : n.jibanProxy.getWifeJB(e.wid) +
                        "/" +
                        (a ? a.yoke : "8000") +
                        s;
                this.skillRed.active = n.wifeProxy.hasSkillUp(e.wid);
            }
        };
        e.prototype.getFrom = function (t, e) {
            switch (t) {
                case "juqing":
                    return i18n.t("WIFE_JUQING");

                case "xf":
                    return i18n.t("WIFE_XF");

                case "shili":
                    return i18n.t("WIFE_SHILI", {
                        d: i.utils.formatMoney(e)
                    });

                case "vip":
                    return i18n.t("WIFE_VIP", {
                        d: e
                    });

                case "huodong":
                    return i18n.t("WIFE_HUODONG");
            }
            return "";
        };
        e.prototype.wifeBtn = function () {
            this._isMarry = !0;
            this.updateShow();
        };
        e.prototype.flanceeBtn = function () {
            this._isMarry = !1;
            this.updateShow();
        };
        e.prototype.onClickLeft = function () {
            this.onClickTrun(-1);
            i.utils.showEffect(this.speakAnie, 0);
            this.onPlayVoice(null, null);
            this.onHeroShow();
        };
        e.prototype.onClickRight = function () {
            this.onClickTrun(1);
            i.utils.showEffect(this.speakAnie, 0);
            this.onPlayVoice(null, null);
            this.onHeroShow();
        };
        e.prototype.onClickTrun = function (t) {
            var e = this._isMarry
                ? this._marryList.length
                : this._unMarryList.length;
            this._curIndex += t;
            this._curIndex = this._curIndex < 0 ? e - 1 : this._curIndex;
            this._curIndex = this._curIndex >= e ? 0 : this._curIndex;
            this.updateCurShow();
        };
        e.prototype.helpBtn = function () { };
        e.prototype.randomBtn = function () {
            n.wifeProxy.jingliData.num <= 0
                ? i.alertUtil.alert(i18n.t("WIFE_JINGLING_LIMIT"))
                : n.wifeProxy.sendSJXO();
        };
        e.prototype.resetBtn = function () {
            var t = i.utils.getParamInt("hg_cost_item_jl");
            n.bagProxy.getItemCount(t) <= 0
                ? i.alertUtil.alertItemLimit(t)
                : i.utils.showConfirmItem(
                    i18n.t("WIFE_USE_JING_LI_DAN", {
                        num: 1
                    }),
                    t,
                    1,
                    function () {
                        n.wifeProxy.sendWeige();
                    },
                    "WIFE_USE_JING_LI_DAN"
                );
        };
        e.prototype.onClickOpen = function (t, e) { };
        e.prototype.onClickLove = function () {
            var t = s.formula.wife_meet_cost(
                n.wifeProxy.curSelectWife.flower,
                n.wifeProxy.curSelectWife.love
            ),
                e = localcache.getItem(localdb.table_item, 1);
            i.utils.showConfirmItem(
                i18n.t("WIFE_XO_TIP", {
                    name: e.name,
                    price: t
                }),
                1,
                n.playerProxy.userData.cash,
                function () {
                    n.playerProxy.userData.cash < t
                        ? i.alertUtil.alertItemLimit(1)
                        : n.wifeProxy.sendXXOOnoBaby(
                            n.wifeProxy.curSelectWife.id
                        );
                },
                "WIFE_XO_TIP"
            );
        };
        e.prototype.onClickGift = function () {
            n.wifeProxy.wifeGiftId = n.wifeProxy.curSelectWife.id;
            i.utils.openPrefabView("wife/GiftView");
        };
        e.prototype.onClickSkill = function () {
            i.utils.openPrefabView("wife/WifeSkillView");
        };
        e.prototype.onClickYJXO = function () {
            n.wifeProxy.jingliData.num <= 0
                ? i.alertUtil.alert(i18n.t("WIFE_JINGLING_LIMIT"))
                : n.wifeProxy.sendYJXO();
        };
        e.prototype.onClickBack = function () {
            i.utils.closeView(this);
        };
        e.prototype.onClickChuYou = function () {
            var t = s.formula.wife_chuyou_cost(n.wifeProxy.curSelectWife.love),
                e = localcache.getItem(localdb.table_item, 1);
            i.utils.showConfirmItem(
                i18n.t("WIFE_CHU_YOU_TIP", {
                    name: e.name,
                    price: t
                }),
                1,
                n.playerProxy.userData.cash,
                function () {
                    n.playerProxy.userData.cash < t
                        ? i.alertUtil.alertItemLimit(1)
                        : n.wifeProxy.sendXXOO(n.wifeProxy.curSelectWife.id);
                },
                "WIFE_CHU_YOU_TIP"
            );
        };
        e.prototype.onClickGuanBi = function () {
            i.utils.closeNameView("wife/WifeSelectView");
            i.utils.closeView(this);
        };
        e.prototype.onClickJiBan = function () {
            var t = this._isMarry
                ? this._marryList[this._curIndex]
                : this._unMarryList[this._curIndex];
            i.utils.openPrefabView("jiban/JibanView", !1, {
                wifeid: t.wid
            });
        };
        e.prototype.onPlayVoice = function (t, e) {
            if ("1" != e || !i.audioManager.isPlayLastSound()) {
                var o = this._isMarry
                    ? this._marryList[this._curIndex]
                    : this._unMarryList[this._curIndex],
                    l = n.voiceProxy.randomWifeVoice(o.wid);
                if (l) {
                    this.lblTalk.string = l.wifetext;
                    i.audioManager.playSound("wife/" + l.wifevoice, !0, !0);
                }
            }
        };
        e.prototype.onClickSetWife = function () {
            var t = this._isMarry
                ? this._marryList[this._curIndex]
                : this._unMarryList[this._curIndex];
            n.playerProxy.sendHeroShow(t.wid + 200);
            var wife = localcache.getItem(localdb.table_wife, t.wid);
            var str = wife && wife.prince == 3 ? "SERVANT_GUAN_SHI" : "SERVANT_SUI_XING";
            i.alertUtil.alert(
                i18n.t(str, {
                    name: t.wname2
                })
            );
        };
        e.prototype.onHeroShow = function () {
            var t = this._isMarry ? this._marryList[this._curIndex] : this._unMarryList[this._curIndex];
            var isShow = false;
            var isHero = false;
            var wife = localcache.getItem(localdb.table_wife, t.wid);
            if (wife) {
                switch (wife.prince) {
                    case 1:
                    case 2://皇子
                        isShow = false;
                        break;
                    case 3://男性
                        if (n.playerProxy.heroShow < 200) {
                            var hero = localcache.getItem(localdb.table_hero, n.playerProxy.heroShow);
                            if (hero)
                                isHero = wife.wname == hero.name;
                        }
                        isShow = !isHero && (t.wid != n.playerProxy.heroShow - 200);
                        this.lblGuanShi.string = i18n.t("GUAN_TIP_NAME");
                        break;
                    case 4://女性
                        if (n.playerProxy.zwHeroShow < 200) {
                            var hero = localcache.getItem(localdb.table_hero, n.playerProxy.zwHeroShow);
                            if (wife && hero)
                                isHero = wife.wname == hero.name;
                        }
                        isShow = !isHero && (t.wid != n.playerProxy.zwHeroShow - 200);
                        this.lblGuanShi.string = i18n.t("ACCOMPANY_TIP_NAME");
                        break;
                    default:
                        isShow = false;
                        break;
                }
            }
            this.btnGuanShi.active = isShow;
        };

        e.prototype.onWifeTalk = function (t) {
            if (!i.audioManager.isPlayLastSound())
                if (0 == t.chatType) this.onPlayVoice(null, null);
                else {
                    var e = this._isMarry
                        ? this._marryList[this._curIndex]
                        : this._unMarryList[this._curIndex];
                    n.playerProxy.addStoryId(t.stroyid);
                    i.utils.openPrefabView("StoryView", !1, {
                        wifeid: e.wid,
                        type: 4,
                        talkType: 2
                    });
                }
        };
        e.prototype.onClickTalk = function () {
            var t = this._isMarry
                ? this._marryList[this._curIndex]
                : this._unMarryList[this._curIndex];
            n.wifeProxy.sendWifeTalk(t.wid);
        };
        __decorate([d(cc.Label)], e.prototype, "lblLove", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblMeili", void 0);
        __decorate([d(r.default)], e.prototype, "urlLoad", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTalk", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeWife", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "btn_node", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblSonNum", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblWifeExp", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblWifeInfo", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblWifeInfo_2", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnLeft", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnRight", void 0);
        __decorate([d(cc.Animation)], e.prototype, "speakAnie", void 0);
        __decorate([d(a.default)], e.prototype, "luckImg", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblJbValue", void 0);
        __decorate([d(cc.Node)], e.prototype, "changeNode", void 0);
        __decorate([d(cc.Node)], e.prototype, "btnGuanShi", void 0);
        //add by cjf
        __decorate([d(cc.Label)], e.prototype, "lblGuanShi", void 0);
        __decorate([d(cc.Sprite)], e.prototype, "techangIcon", void 0);
        __decorate([d([cc.SpriteFrame])], e.prototype, "techangArr", void 0);
        __decorate([d(cc.Node)], e.prototype, "skillRed", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
