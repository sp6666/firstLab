var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("./ServantTalent"),
    r = require("../../Initializer"),
    a = require("../../component/UrlLoad"),
    s = require("../../utils/UIUtils"),
    c = require("../../component/JiBanShow"),
    _ = require("../../models/PlayerProxy"),
    d = require("./ServantStarShow"),
    u = require("../../component/LangSprite"),
    p = cc._decorator,
    h = p.ccclass,
    y = p.property,
    f = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.prg = null;
            e.lblExp = null;
            e.lblLv = null;
            e.lblName = null;
            e.lblEps = [];
            e.tabs = [];
            e.items = [];
            e.nodeUp = null;
            e.imgSpe1 = null;
            e.imgSpe2 = null;
            e.sFrame = [];
            e.servantShow = null;
            e.aniLv = null;
            e.tanlent = null;
            e.btnJiban = null;
            e.lblShiLi = null;
            e.btnNode = null;
            e.btnLvUp = null;
            e.btnTiBa = null;
            e.tanlentNode = null;
            e.skillNode = null;
            e.skillList = null;
            e.skillGhList = null;
            e.lblBtns = [];
            e.luckImg = null;
            e.proNode = null;
            e.nodeHeroShow = null;
            //add by cjf
            e.lblGuanShi = null;
            e.check = null;
            e.lblJbValue = null;
            e.spine = null;
            e.lblYueli = null;
            e.lblGold = null;
            e.lblSkillName = null;
            e.starShow = null;
            e.btnLeft = null;
            e.btnRight = null;
            e.lblTotalZZ = null;
            e.redLv = null;
            e.redTanlent = null;
            e.redSkill = null;
            e.talkNode = null;
            e.lblTalk = null;
            e.btnZhiji = null;
            e.tablentScroll = null;
            e.btnLeader = null;
            e.btnHZ = null;
            e.lblLeadPro = null;
            e.lblLeadLv = null;
            e.lastData = new _.RoleData();
            e.tabIndex = "1";
            e._curHero = null;
            e._curIndex = 0;
            e._oldHeroLv = 0;
            e.voiceSys = null;
            e.nodeConfidante = null;
            e.btnConfidante = null;
            e.lblConfidante = null;
            return e;
        }
        e.prototype.onLoad = function () {
            var t = this;
            facade.subscribe(
                r.playerProxy.PLAYER_USER_UPDATE,
                this.onResUpdate,
                this
            );
            facade.subscribe("PLAYER_HERO_SHOW", this.onHeroShow, this);
            facade.subscribe(
                r.servantProxy.SERVANT_TALK_TDA,
                this.talkData,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickLeft, this);
            facade.subscribe("UI_TOUCH_MOVE_RIGHT", this.onClickRight, this);
            facade.subscribe("UPDATE_HERO_JB", this.onJibanUpdate, this);
            facade.subscribe(r.confidanteProxy.ON_GET_CONFIDANTE_INFO_SER, this.onConfidante, this); //打开蓝颜界面 
            facade.subscribe(r.confidanteProxy.ON_CON_CHANGE_CLOTHE_TO_HAOYOU, this.onConfidanteClose, this); //刷新形象

            s.uiUtils.scaleRepeat(this.btnLeft, 0.9, 1.2);
            s.uiUtils.scaleRepeat(this.btnRight, 0.9, 1.2);
            this.skillList.selectHandle = function (e) {
                var o = e;
                o &&
                    i.utils.openPrefabView("servant/ServantSkillUp", null, {
                        _skill: o,
                        _hero: t._curHero
                    });
            };
            r.servantProxy.sortServantList();
            var e = this.node.openParam,
                o = e.hero,
                n = e.tab;
            if (o) {
                var l = r.servantProxy.getHeroData(o.heroid);
                this._curHero = l;
                this._curIndex = r.servantProxy.servantList.indexOf(l);
                this._oldHeroLv = this._curHero.level;
            }
            this.showData();
            this.onClickTab(null, n);
            this.btnNode.active = r.servantProxy.servantList.length > 1;
            facade.subscribe("SERVANT_UP", this.updateServant, this);
            this.updateServant();

            /*
            var isPrince = false
            var hero = localcache.getItem(localdb.table_hero, this._curHero.id);
            if(hero)
            {
                isPrince = hero.prince == 1;
            }
            */
            this.resetHeroShowBtn(); //管事不能是皇子
            var clothe = r.confidanteProxy.getConUrlId(this._curHero.id);
            var tmp = localcache.getItem(localdb.table_confidante_clothe, clothe);
            if (tmp) {
                this.servantShow.url = s.uiHelps.getServantSpine(tmp.res);
            } else {
                this.servantShow.url = s.uiHelps.getServantSpine(this._curHero.id);
            }
            //this.servantShow.url = s.uiHelps.getServantSpine(this._curHero.id);
            this.starShow.setValue(o.star);
            this.onPlayVoice(null, null);
            this.onResUpdate();
            this.check.isChecked = r.servantProxy.isLevelupTen;
            if (r.guideProxy.guideUI && !r.guideProxy.guideUI.isHideShow()) {
                this.check.isChecked = r.servantProxy.isLevelupTen = true;
            }
            e.isTrain && this.onClickTran();
            localcache.getGroup(
                localdb.table_heroClothe,
                "heroid",
                this._curHero.id
            );
        };
        e.prototype.onClost = function () {
            r.servantProxy.curSelectId = 0;
            i.audioManager.playSound("", !0);
            i.utils.closeView(this, !0);
            r.servantProxy.isRenMaiOpen && (r.servantProxy.isRenMaiOpen = !1);
        };
        e.prototype.onBack = function () {
            r.servantProxy.curSelectId = 0;
            i.audioManager.playSound("", !0);
            i.utils.closeView(this);
            r.servantProxy.isRenMaiOpen ?
                (r.servantProxy.isRenMaiOpen = !1) :
                i.utils.openPrefabView("servant/ServantListView");
        };
        e.prototype.onClickUp = function () {
            if (this._curHero) {
                var t = localcache.getItem(
                    localdb.table_heroLvUp,
                    this._curHero.level + ""
                );
                t && (t.cost, this._curHero.exp);
                if (this._curHero.level >= 400) {
                    i.alertUtil.alert("门客等级上限");
                    return;
                }
                if (0 == r.playerProxy.userData.coin) {
                    i.alertUtil.alertItemLimit(2);
                    return;
                }
                this.check.isChecked ?
                    r.servantProxy.sendLvUpTen(this._curHero.id) :
                    r.servantProxy.sendLvUp(this._curHero.id);
            }
        };
        e.prototype.onHideSpine = function () {
            this.spine.setActive = !1;
        };
        e.prototype.onClickAdd = function (t, e) {
            i.utils.openPrefabView("");
        };
        e.prototype.onClickJiBan = function () {
            i.utils.openPrefabView("jiban/JibanDetailView", !1, {
                heroid: this._curHero.id
            });
        };
        e.prototype.onClickTab = function (t, e) {
            var o = parseInt(e) - 1;
            this.tabIndex = e;
            0 == o ?
                this.tanlent.updateShow(this._curHero) :
                1 == o && (this.skillList.data = this._curHero.pkskill);
            for (var i = 0; i < this.tabs.length; i++)
                this.tabs[i].interactable = i != o;
            this.tanlentNode.active = "1" == e;
            this.skillNode.active = "2" == e;
            this.proNode.active = "4" == e;
            this.resetHeroShowBtn(); //管事不能是皇子
            "1" == e && this.tablentScroll.scrollToLeft();
        };
        e.prototype.updateServant = function () {
            var t = this;
            this._curHero = r.servantProxy.servantList[this._curIndex];
            var e = localcache.getItem(
                    localdb.table_nobility,
                    this._curHero.senior
                ),
                o = localcache.getItem(
                    localdb.table_nobility,
                    this._curHero.senior + 1
                );
            this.btnLvUp.active = this._curHero.level < e.max_level;
            this.btnTiBa.active =
                this._curHero.level == e.max_level &&
                r.playerProxy.userData.level >= e.player_level &&
                null != o;
            this.showData();
            this.skillList.data = this._curHero.pkskill;
            if (this._oldHeroLv < this._curHero.level) {
                var n = this;
                s.uiUtils.showPrgChange(this.prg, 0, 1, 1, 10, function () {
                    n.prg.progress = 0;
                    t.spine.animation = "animation";
                    t.spine.setActive = !0;
                    t.scheduleOnce(t.onHideSpine, 2);
                    i.audioManager.playSound("levelup", !0, !0);
                });
            }
            this._oldHeroLv = this._curHero.level;
            this.redLv.active = r.servantProxy.getLevelUp(this._curHero);
            this.redTanlent.active = r.servantProxy.getTanlentUp(this._curHero);
            this.redSkill.active = r.servantProxy.getSkillUp(this._curHero);
            this.onJibanUpdate();
            this.checkConfidanteState();
        };
        e.prototype.onJibanUpdate = function () {
            var t = r.jibanProxy.getHeroJbLv(this._curHero.id).level % 1e3,
                e = r.jibanProxy.getHeroNextJb(this._curHero.id, t);
            this.luckImg.setValue(5, t);
            var o = r.jibanProxy.getHeroJbLv(this._curHero.id),
                i =
                t > 1 ?
                " (" +
                i18n.t("COMMON_PROP5") +
                "+" +
                o.prop / 100 +
                "%)" :
                "";
            this.lblJbValue.string =
                null == e ?
                i :
                r.jibanProxy.getHeroJB(this._curHero.id) +
                "/" +
                (e ? e.yoke : "") +
                i;
        };
        e.prototype.showData = function () {
            var t = localcache.getItem(
                    localdb.table_hero,
                    this._curHero.id + ""
                ),
                e = localcache.getItem(
                    localdb.table_heroLvUp,
                    this._curHero.level + ""
                );
            r.jibanProxy.getJibanType(1, this._curHero.id);
            if (t) {
                this.lblName.string = t.name;
                t.spec;
                var o = t.spec[0];
                this.imgSpe1.url = s.uiHelps.getLangSp(o);
                this.imgSpe2.node.active = t.spec.length > 1;
                if (t.spec.length > 1) {
                    o = t.spec[1];
                    this.imgSpe2.url = s.uiHelps.getLangSp(o);
                }
            }
            for (var n = 0, l = 0; l < this.lblEps.length; l++) {
                var a = l + 1;
                n += this._curHero.aep["e" + a];
                this.lblEps[l].string = this._curHero.aep["e" + a];
            }
            var c = e ? e.cost - this._curHero.exp : 0;
            this.lblExp.string =
                0 != c ?
                i18n.t("SERVANT_UP_NEED", {
                    exp: i.utils.formatMoney(c)
                }) :
                i18n.t("SERVANT_LV_MAX");
            this.prg.progress = e ? this._curHero.exp / e.cost : 1;
            this.lblLv.string = i18n.t("COMMON_LV", {
                lv: this._curHero.level
            });
            this.lblShiLi.string = i18n.t("RANK_SHILI_TIP") + " " + n;
            var _ =
                this._curHero.zz.e1 +
                this._curHero.zz.e2 +
                this._curHero.zz.e3 +
                this._curHero.zz.e4;
            this.lblTotalZZ.string = i18n.t("SERVANT_PROP_TOTAL", {
                value: _
            });
            r.servantProxy.curSelectId = this._curHero.id;
            var d = localcache.getGroup(
                localdb.table_wifeSkill,
                "heroid",
                this._curHero.id
            );
            this.btnZhiji.active = d && d.length > 0;
            this.btnLeader.active = 0 != t.leaderid;
            var u = r.servantProxy.getLeadLv(t.heroid, this._curHero.leadlv);
            if (u) {
                this.lblLeadPro.string = "+" + u.ep;
                this.lblLeadLv.string = i18n.t("LEADER_LEVEL_TXT", {
                    num: u.id % 1e3
                });
            } else {
                this.lblLeadPro.string = "+0";
                this.lblLeadLv.string = i18n.t("LEADER_NO_JI_HUO");
            }
        };
        e.prototype.onClickLeft = function (t) {
            t < 300 || this.showClickData(-1);
        };
        e.prototype.onClickRight = function (t) {
            t < 300 || this.showClickData(1);
        };
        e.prototype.showClickData = function (t) {
            this._curIndex += t;
            this._curIndex =
                this._curIndex < 0 ?
                r.servantProxy.servantList.length - 1 :
                this._curIndex;
            this._curIndex =
                this._curIndex > r.servantProxy.servantList.length - 1 ?
                0 :
                this._curIndex;
            this._curHero = r.servantProxy.servantList[this._curIndex];
            this._oldHeroLv = this._curHero.level;

            var clothe = r.confidanteProxy.getConUrlId(this._curHero.id);
            var tmp = localcache.getItem(localdb.table_confidante_clothe, clothe);
            if (tmp) {
                this.servantShow.url = s.uiHelps.getServantSpine(tmp.res);
            } else {
                this.servantShow.url = s.uiHelps.getServantSpine(this._curHero.id);
            }
            //this.servantShow.url = s.uiHelps.getServantSpine(this._curHero.id);
            var e = localcache.getItem(localdb.table_hero, this._curHero.id);
            this.starShow.setValue(e.star);
            this.showData();
            this.updateServant();
            this.onClickTab(null, this.tabIndex);
            this.onPlayVoice(null, null);
            localcache.getGroup(
                localdb.table_heroClothe,
                "heroid",
                this._curHero.id
            );
        };
        e.prototype.onClickTiBa = function () {
            i.utils.openPrefabView(
                "servant/ServantAdvance",
                null,
                this._curHero
            );
        };
        e.prototype.onClickTran = function () {
            i.utils.openPrefabView(
                "servant/ServantTrainView",
                null,
                this._curHero
            );
        };
        e.prototype.onClickSetHero = function () {
            if (this._curHero) {
                if (r.xianyunProxy.isXianYun(this._curHero.id)) {
                    i.alertUtil.alert18n("XIAN_YUN_ZHENG_ZAI_DU_JIA");
                    return;
                }
                r.playerProxy.sendHeroShow(this._curHero.id);
                var t = localcache.getItem(
                    localdb.table_hero,
                    this._curHero.id
                );
                var str = t && t.prince == 3 ? "SERVANT_GUAN_SHI" : "SERVANT_SUI_XING";
                i.alertUtil.alert(
                    i18n.t(str, {
                        name: t.name
                    })
                );
            }
        };
        e.prototype.onPlayVoice = function (t, e) {
            if ("1" != e || !i.audioManager.isPlayLastSound()) {
                this.voiceSys = r.voiceProxy.randomHeroVoice(this._curHero.id);

                if (this.voiceSys) {
                    this.lblTalk.string = this.voiceSys.herotext;
                    i.audioManager.playSound(
                        "servant/" + this.voiceSys.herovoice,
                        !0,
                        !0
                    );
                    this.talkNode.active = !0;
                } else {
                    this.talkNode.active = !1;
                }
            }
        };
        e.prototype.onResUpdate = function () {
            s.uiUtils.showNumChange(
                this.lblYueli,
                this.lastData.coin,
                r.playerProxy.userData.coin
            );
            s.uiUtils.showNumChange(
                this.lblGold,
                this.lastData.cash,
                r.playerProxy.userData.cash
            );
            this.lastData.coin = r.playerProxy.userData.coin;
            this.lastData.cash = r.playerProxy.userData.cash;
        };
        e.prototype.onClickZhuanJi = function () {
            i.utils.openPrefabView(
                "servant/ServantZhuanJi",
                null,
                this._curHero
            );
        };
        e.prototype.onClickZhiJi = function () {
            var t = localcache.getGroup(
                    localdb.table_wifeSkill,
                    "heroid",
                    this._curHero.id
                )[0].wid,
                e = r.wifeProxy.getWifeData(t);
            if (null != e)
                0 != e.skill.length ?
                i.utils.openPrefabView(
                    "servant/ServantZhiJiSkill",
                    null,
                    e
                ) :
                i.alertUtil.alert(i18n.t("SERVANT_WITHOUT_WIFE"));
            else {
                var o = localcache.getItem(localdb.table_wife, t);
                i.alertUtil.alert(
                    i18n.t("SERVANT_WITHOUT_NAME", {
                        name: o.wname2
                    })
                );
                i.utils.openPrefabView("wife/WifeInfo", !1, o);
            }
        };
        e.prototype.onHeroShow = function () {
            this.resetHeroShowBtn(); //管事不能是皇子
        };
        e.prototype.onClickGift = function () {
            i.utils.openPrefabView("servant/ServantGiftView");
        };
        e.prototype.onClickCheck = function () {
            r.servantProxy.isLevelupTen = this.check.isChecked;
        };
        e.prototype.onClickTalk = function () {
            r.servantProxy.sendHeroTalk(this._curHero.id);
        };
        e.prototype.talkData = function (t) {
            if (t)
                if (0 == t.chatType) this.onPlayVoice(null, null);
                else {
                    r.playerProxy.addStoryId(t.stroyid);
                    i.utils.openPrefabView("StoryView", !1, {
                        heroid: this._curHero.id,
                        type: 4,
                        talkType: 1
                    });
                }
        };
        e.prototype.onClickDetail = function () {
            i.utils.openPrefabView(
                "servant/ServantProDetail",
                null,
                this._curHero
            );
        };
        e.prototype.onClickLeader = function () {
            i.utils.openPrefabView(
                "servant/ServantLeader",
                null,
                this._curHero
            );
        };
        e.prototype.onClickHuanZhuang = function () {
            i.utils.openPrefabView(
                "servant/ServantHuanZhuang",
                null,
                this._curHero
            );
        };
        e.prototype.onClickConfidante = function () {

            if (r.servantProxy.getHeroData(this._curHero.id) != null) {
                r.confidanteProxy.sendUseHero(this._curHero.id, 1);
            }
        };
        e.prototype.onConfidante = function () {
            i.utils.openPrefabView("confidante/ConfidanteView");
        };
        e.prototype.resetHeroShowBtn = function () {
            var isShow = false;
            var isWife = false;
            var hero = localcache.getItem(localdb.table_hero, this._curHero.id);
            if (hero) {
                switch (hero.prince) {
                    case 1:
                    case 2: //皇子
                        isShow = false;
                        break;
                    case 3: //男性
                        if (r.playerProxy.heroShow > 200) {
                            var wife = localcache.getItem(localdb.table_wife, r.playerProxy.heroShow - 200);
                            if (wife)
                                isWife = wife.wname == hero.name;
                        }
                        isShow = !isWife && this._curHero.id != r.playerProxy.heroShow;
                        this.lblGuanShi.string = i18n.t("GUAN_TIP_NAME");
                        break;
                    case 4: //女性
                        if (r.playerProxy.zwHeroShow > 200) {
                            var wife = localcache.getItem(localdb.table_wife, r.playerProxy.zwHeroShow - 200);
                            if (wife)
                                isWife = wife.wname == hero.name;
                        }
                        isShow = !isWife && this._curHero.id != r.playerProxy.zwHeroShow;
                        this.lblGuanShi.string = i18n.t("ACCOMPANY_TIP_NAME");
                        break;
                    default:
                        break;
                }
            }
            this.nodeHeroShow.active = isShow;
        };
        e.prototype.checkConfidanteState = function () {
            var princeLv = r.confidanteProxy.checkPrinceCfg(this._curHero.id);
            if (princeLv) {
                this.nodeConfidante.active = true;

                if (princeLv.prince == 2) {
                    var lv = localcache.getItem(localdb.table_confidante_level, princeLv.level);
                    if (lv) {
                        var name = lv.name.split(".");
                        if (name.length > 1) {
                            this.lblConfidante.string = name[1];
                            //this.btnConfidante.interactable = true;
                            return;
                        }
                    }
                } else {
                    this.lblConfidante.string = i18n.t("CONFIDANTE_CUR_NO_OPEN");
                    //this.btnConfidante.interactable = false;
                }
            } else {
                this.nodeConfidante.active = false;
            }

            this.lblConfidante.string = i18n.t("CONFIDANTE_CUR_NO_OPEN");
            //this.btnConfidante.interactable = false;
        };
        __decorate([y(cc.ProgressBar)], e.prototype, "prg", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblExp", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([y([cc.Label])], e.prototype, "lblEps", void 0);
        __decorate([y([cc.Button])], e.prototype, "tabs", void 0);
        __decorate([y([cc.Node])], e.prototype, "items", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeUp", void 0);
        __decorate([y(a.default)], e.prototype, "imgSpe1", void 0);
        __decorate([y(a.default)], e.prototype, "imgSpe2", void 0);
        __decorate([y([cc.SpriteFrame])], e.prototype, "sFrame", void 0);
        __decorate([y(a.default)], e.prototype, "servantShow", void 0);
        __decorate([y(cc.Animation)], e.prototype, "aniLv", void 0);
        __decorate([y(l.default)], e.prototype, "tanlent", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnJiban", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblShiLi", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnLvUp", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnTiBa", void 0);
        __decorate([y(cc.Node)], e.prototype, "tanlentNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "skillNode", void 0);
        __decorate([y(n.default)], e.prototype, "skillList", void 0);
        __decorate([y(n.default)], e.prototype, "skillGhList", void 0);
        __decorate([y([cc.Label])], e.prototype, "lblBtns", void 0);
        __decorate([y(c.default)], e.prototype, "luckImg", void 0);
        __decorate([y(cc.Node)], e.prototype, "proNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeHeroShow", void 0);
        //add by cjf
        __decorate([y(cc.Label)], e.prototype, "lblGuanShi", void 0);
        __decorate([y(cc.Toggle)], e.prototype, "check", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblJbValue", void 0);
        __decorate([y(u.default)], e.prototype, "spine", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblYueli", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblGold", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblSkillName", void 0);
        __decorate([y(d.default)], e.prototype, "starShow", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnLeft", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnRight", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblTotalZZ", void 0);
        __decorate([y(cc.Node)], e.prototype, "redLv", void 0);
        __decorate([y(cc.Node)], e.prototype, "redTanlent", void 0);
        __decorate([y(cc.Node)], e.prototype, "redSkill", void 0);
        __decorate([y(cc.Node)], e.prototype, "talkNode", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblTalk", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnZhiji", void 0);
        __decorate([y(cc.ScrollView)], e.prototype, "tablentScroll", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnLeader", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnHZ", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblLeadPro", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblLeadLv", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeConfidante", void 0);
        __decorate([y(cc.Button)], e.prototype, "btnConfidante", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblConfidante", void 0);
        return (e = __decorate([h], e));
    })(cc.Component);
o.default = f;