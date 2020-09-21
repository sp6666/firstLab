var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../utils/UIUtils"),
    l = require("../../component/List"),
    r = require("../../Initializer"),
    a = require("../../component/UrlLoad"),
    s = require("../../models/TimeProxy"),
    c = require("../../utils/ShaderUtils"),
    _ = require("../../component/RoleSpine"),
    d = require("../../Config"),
    u = require("../../models/JibanProxy"),
    p = cc._decorator,
    h = p.ccclass,
    y = p.property,
    f = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeLeft = null;
            e.nodeCon = null;
            e.nodeTalk = null;
            e.nodeSelect = null;
            e.lblName = null;
            e.lblStone = null;
            e.lblContext = null;
            e.lblSp = null;
            e.imgBg = null;
            e.imgPrefab = null;
            e.list = null;
            e.right = null;
            e.anima = null;
            e.nodeSkil = null;
            e.nodeSkilAnima = null;
            e.nodeImg = null;
            e.nodeImg1 = null;
            e.nodeSp = null;
            e.roleSpine = null;
            e.nodeClost = null;
            e.roleName = null;
            e.animeName = null;
            e.nameNode = null;
            e.record = null;
            e.autoPlayer = null;
            e.autoBg = null;
            e.prgArmy = null;
            e.lblPrgArmy = null;
            e._curId = 0;
            e._curData = null;
            e._isAnima = !1;
            e._heroId = 0;
            e._wifeId = 0;
            e._type = 0;
            e._storyRecords = [];
            e._talkType = 0;
            e.imgbgSprite = null;
            e.nextTime = 1;
            e._isSkip = !1;
            e._skipSelectList = null;
            e._isSkipLook = !1;
            return e;
        }
        o = e;
        e.prototype.onLoad = function () {
            var t = this.node.openParam;
            t && t.heroid && (this._heroId = t.heroid);
            t && t.wifeid && (this._wifeId = t.wifeid);
            t && t.type && (this._type = t.type);
            t && t.talkType && (this._talkType = t.talkType);
            n.uiUtils.scaleRepeat(this.nodeCon, 0.95, 1.05);
            facade.subscribe("SHOW_STORY", this.showNextStory, this);
            facade.subscribe("STORY_SHOW_ARMY", this.showArmy, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onMoveLeft, this);
            this.roleSpine.node.active = !1;
            this.right.node.active = !1;
            this.autoPlayer.isChecked = o.isAutoPlay;
            this.autoBg.active = !this.autoPlayer.isChecked;
            this.showNextStory();
            if (t && 1 == t.isSkip && 5 == this._type) {
                this._isSkipLook = !0;
                this._curData && this.scheduleOnce(this.onClickSkip, 0.5);
            }

            //facade.send("MAIN_TOP_HIDE_PAO_MA");
        };
        e.prototype.onMoveLeft = function () {};
        e.prototype.onClickNext = function () {
            if (!this._isAnima && !this.is_Show_Hide_Effect) {
                if (this._isSkipLook) {
                    this._isSkipLook = !1;
                    this.unscheduleAllCallbacks();
                    facade.send("UNLOCK_AUTO_LOOK");
                }
                if (this.nodeSelect.active);
                else if (this._curData) {
                    this.unscheduleAllCallbacks();
                    if (this.nodeImg.active && this.lblStone.isRunShowText) {
                        this.lblStone.unscheduleAllCallbacks();
                        this.lblStone.string = r.playerProxy.getReplaceName(
                            this._curData.txt
                        );
                        this.lblStone.isRunShowText = !1;
                        o.isAutoPlay &&
                            this.scheduleOnce(this.onClickNext, this.nextTime);
                    } else if (
                        this.nodeImg1.active &&
                        this.lblContext.isRunShowText
                    ) {
                        this.lblContext.unscheduleAllCallbacks();
                        this.lblContext.string = r.playerProxy.getReplaceName(
                            this._curData.txt
                        );
                        this.lblContext.isRunShowText = !1;
                        o.isAutoPlay &&
                            this.scheduleOnce(this.onClickNext, this.nextTime);
                    } else if (this.nodeSp.active && this.lblSp.isRunShowText) {
                        this.lblSp.unscheduleAllCallbacks();
                        this.lblSp.string = r.playerProxy.getReplaceName(
                            this._curData.txt
                        );
                        this.lblSp.isRunShowText = !1;
                        o.isAutoPlay &&
                            this.scheduleOnce(this.onClickNext, this.nextTime);
                    } else this.showNext(this._curData.nextid);
                } else this.showNext("0");
            }
        };
        e.prototype.onClickSkip = function () {
            if (3 != this._type) {
                var t = this._curData.nextid;
                this._isSkip = !0;
                for (;;) {
                    var e = r.playerProxy.getStoryData(t);
                    if (null == e) break;
                    t = e.nextid;
                }
                this.showNext(t);
                i.audioManager.playSound("", !0);
                this._isSkipLook &&
                    this._skipSelectList &&
                    this._skipSelectList.length > 0 &&
                    this.scheduleOnce(this.onClickAutoSelect, 1);
            } else {
                this.showNext("0");
                i.audioManager.playSound("", !0);
            }
        };
        e.prototype.onClickAutoSelect = function () {
            var t = Math.floor(Math.random() * this._skipSelectList.length),
                e = this._skipSelectList[t];
            e && this.clickNextId(e);
        };
        e.prototype.onClickSkipAnima = function () {
            this.unscheduleAllCallbacks();
            this._isAnima = !1;
            this.onClickNext();
        };
        e.prototype.clickNextId = function (t) {
            if (this.isCanSelect(t)) {
                var e = localcache.getItem(localdb.table_storySelect2, t.id);
                if (
                    e &&
                    1 == e.battle1 &&
                    !r.fightProxy.isEnoughArmy() &&
                    e.group.split("_").length <= 1
                ) {
                    i.alertUtil.alertItemLimit(4, r.fightProxy.needArmy());
                    this.nodeClost.active = !0;
                } else {
                    this.nodeSelect.active = !1;
                    if (t)
                        switch (this._type) {
                            case 0:
                            case 3:
                            case 5:
                                r.jibanProxy.sendGetAward(t.id);
                                facade.send("STORY_SELECT", t);
                                3 != this._type &&
                                    5 != this._type &&
                                    r.timeProxy.saveSelectStory(t.id);
                                this.showNext(t.nextid);
                                break;

                            case 1:
                                this.showNext(t.nextid);
                                r.jibanProxy.sendGetJYAward(t.id);
                                break;

                            case 2:
                                this.showNext(t.nextid);
                                r.jingyingProxy.sendZwAct(3, t.id);
                                break;

                            case 4:
                                this.showNext(t.nextid);
                                r.feigeProxy.sendTalkStory(
                                    1 == this._talkType ?
                                    this._heroId :
                                    this._wifeId,
                                    this._talkType,
                                    t.id
                                );
                                break;

                            case 99:
                                this.showNext(t.nextid);
                                r.timeProxy.saveSelectStory(t.id);
                        }
                }
            }
        };
        e.prototype.onClickNextId = function (t, e) {
            if (this._isSkipLook) {
                this._isSkipLook = !1;
                this.unscheduleAllCallbacks();
                facade.send("UNLOCK_AUTO_LOOK");
            }
            var o = e.data;
            this.clickNextId(o);
        };
        e.prototype.isCanSelect = function (t, e) {
            void 0 === e && (e = !0);
            if (99 == this._type) return !0;
            var o = !0,
                n = t.tiaojian,
                l = t.para;
            switch (n) {
                case 1:
                case 2:
                case 3:
                case 4:
                    !(o = r.playerProxy.userEp["e" + n] >= parseInt(l)) &&
                    e &&
                        i.alertUtil.alert(
                            i18n.t("STORY_NEED_PROP", {
                                n: i18n.t("COMMON_PROP" + n),
                                v: l
                            })
                        );
                    break;

                case 5:
                    !(o = r.jibanProxy.belief >= parseInt(l)) &&
                    e &&
                        i.alertUtil.alert(
                            i18n.t("STORY_NEED_PROP", {
                                n: i18n.t("SERVANT_ROLE_SW"),
                                v: l
                            })
                        );
                    break;

                case 6:
                    var a = l.split("|");
                    if (
                        !(o =
                            r.jibanProxy.getHeroJB(parseInt(a[0])) >=
                            parseInt(a[1])) &&
                        e
                    ) {
                        var s = localcache.getItem(localdb.table_hero, a[0]);
                        i.alertUtil.alert(
                            i18n.t("STORY_NEED_PROP", {
                                n: i18n.t("SERVANT_JIBAN_HERO", {
                                    n: s ? s.name : ""
                                }),
                                v: a[1]
                            })
                        );
                    }
                    break;

                case 7:
                    a = l.split("|");
                    !(o =
                        r.jibanProxy.getWifeJB(parseInt(a[0])) >=
                        parseInt(a[1])) &&
                    e &&
                        i.alertUtil.alert(
                            i18n.t("STORY_NEED_PROP", {
                                n: i18n.t("SERVANT_JIBAN_WIFE", {
                                    n: r.playerProxy.getWifeName(parseInt(a[0]))
                                }),
                                v: a[1]
                            })
                        );
            }
            return o;
        };
        e.prototype.showServantSpine = function () {
            if (0 != parseInt(this._curData.img1 + "")) {
                var t =
                    0 != this._heroId ?
                    this._heroId + "" :
                    this._curData.img1 + "";
                if (0 != this._wifeId) {
                    t =
                        localcache.getItem(localdb.table_wife, this._wifeId)
                        .res + "";
                }
                this.right.url =
                    0 != this._wifeId ?
                    n.uiHelps.getWifeBody(t) :
                    n.uiHelps.getServantSpine(t);
                this.roleSpine.node.active = !1;
                this.right.node.active = !0;
                this.right.node.x = this._curData.x;
                this.right.node.scaleX = this._curData.x < 0 ? 1 : -1;
                var e = !1,
                    o = r.timeProxy.getLoacalValue("STORY_SHOW_ID"),
                    l = JSON.parse(o);
                l = null == l ? [] : l;
                for (var a = 0; a < l.length; a++)
                    if (l[a] == t) {
                        e = !0;
                        break;
                    }
                this.nameNode.active = !e;
                if (!e) {
                    this.nameNode.x = this._curData.x < 0 ? -300 : 300;
                    this.roleName.url = n.uiHelps.getStoryRoleName(t);
                    i.utils.showEffect(this.animeName, 0);
                    l.push(t);
                    r.timeProxy.saveLocalValue(
                        "STORY_SHOW_ID",
                        JSON.stringify(l)
                    );
                }
            } else {
                this.roleSpine.node.active = !i.stringUtil.isBlank(
                    this._curData.say
                );
                this.roleSpine.node.x = this._curData.x;
                this.roleSpine.node.scaleX = this._curData.x < 0 ? 1 : -1;
                this.right.node.active = !1;
                this.nameNode.active = !1;
                this.roleSpine &&
                    (i.stringUtil.isBlank(this._curData.face) ?
                        this.roleSpine.actionString() :
                        this.roleSpine.actionString(this._curData.face));
            }
        };
        e.prototype.showLabelStory = function () {
            this.showServantSpine();
            this.nodeTalk.active = !0;
            this.nodeSelect.active = !1;
            var t = "role" == this._curData.say.trim(),
                e = i.stringUtil.isBlank(this._curData.say);
            e || this._storyRecords.push(this._curData);
            this.record.active = this._storyRecords.length > 2;
            if (!i.stringUtil.isBlank(this._curData.sound + "")) {
                if (
                    !(
                        (e && i.audioManager._isBlank) ||
                        (t && i.audioManager._isRole) ||
                        (!e && !t && i.audioManager._isNpc)
                    )
                ) {
                    var l = this;
                    i.audioManager.playSound(
                        this._curData.sound + "",
                        !0,
                        !0,
                        function () {
                            l.soundPlayerOver();
                        }
                    );
                }
            }
            var a = "";
            if (0 != this._heroId) {
                var s = localcache.getItem(localdb.table_hero, this._heroId);
                a = s ? s.name : "";
            }
            0 != this._wifeId && (a = r.playerProxy.getWifeName(this._wifeId));
            this.lblName.string = e ?
                "" :
                t ?
                r.playerProxy.userData.name :
                (0 == this._heroId && 0 == this._wifeId) ||
                i.stringUtil.isBlank(a) ?
                this._curData.say :
                a;
            var c = r.playerProxy.getReplaceName(this._curData.txt);
            this.nodeImg.active = !e && 1 != this._curData.teshu;
            this.nodeImg1.active = e && 1 != this._curData.teshu;
            this.nodeSp.active = 1 == this._curData.teshu;
            if (1 != this._curData.teshu) {
                (2 != this._curData.teshu && 4 != this._curData.teshu) ||
                (this.nodeImg.active ?
                    n.uiUtils.showShakeNode(this.nodeImg) :
                    this.nodeImg1.active &&
                    n.uiUtils.showShakeNode(this.nodeImg1));
                if (2 == this._curData.teshu || 5 == this._curData.teshu) {
                    n.uiUtils.showShake(this.imgBg);
                    n.uiUtils.showShake(this.imgPrefab);
                }
                (2 != this._curData.teshu && 3 != this._curData.teshu) ||
                n.uiUtils.showShake(this.right);
            }
            i.utils.showNodeEffect(this.nodeTalk, -1);
            if (this.nodeImg.active)
                n.uiUtils.showText(
                    this.lblStone,
                    c,
                    null != this._curData.time && 0 != this._curData.time ?
                    this._curData.time / 1e3 / c.length :
                    0.1
                );
            else if (this.nodeImg1.active) {
                var _ = Math.ceil((26 * c.length) / this.lblContext.node.width);
                this.lblContext.node.y = 15 * _;
                n.uiUtils.showText(
                    this.lblContext,
                    c,
                    null != this._curData.time && 0 != this._curData.time ?
                    this._curData.time / 1e3 / c.length :
                    0.1
                );
            } else
                this.nodeSp.active &&
                n.uiUtils.showText(
                    this.lblSp,
                    c,
                    null != this._curData.time && 0 != this._curData.time ?
                    this._curData.time / 1e3 / c.length :
                    0.1
                );
            if (o.isAutoPlay && !i.audioManager.isPlayLastSound()) {
                var d =
                    null != this._curData.time && 0 != this._curData.time ?
                    this._curData.time / 1e3 :
                    0.1 * c.length;
                this.scheduleOnce(this.onClickNext, d + this.nextTime);
            }
        };
        e.prototype.showAnimaStory = function () {
            this._isAnima = !0;
            this.anima.loadHandle = this.onLoadAnimaOver;
            this.anima.target = this;
            this.anima.url = n.uiHelps.getStoryPrefab(this._curData.eff);
        };
        e.prototype.onLoadAnimaOver = function () {
            var t = this,
                e = this.anima.node.getComponentsInChildren(cc.Animation);
            if (e && e.length > 0 && e[0].getClips().length > 0) {
                var o = e[0].getClips()[0].duration;
                this.scheduleOnce(function () {
                    t._isAnima = !1;
                    t.onClickNext();
                }, o);
                this._curData.id == r.playerProxy.getFirstStoryId() &&
                    facade.send("STORY_FIRST_START");
            }
        };
        e.prototype.showStory = function () {
            var t = !i.stringUtil.isBlank(this._curData.eff);
            this.nodeSkil.active =
                (!t && d.Config.DEBUG) ||
                3 == this._type ||
                (5 == this._type && r.playerProxy.getVipValue("is_jump"));
            this.nodeSkilAnima.active = t && d.Config.DEBUG;
            this.nodeLeft.active = !t;
            this.right.node.active = !t;
            this.nameNode.active = !t;
            this.nodeTalk.active = !t;
            this.nodeSelect.active = !t;
            this.anima.node.active = t;
            this.imgBg.node.active = !i.stringUtil.isBlank(this._curData.bg);
            this.imgPrefab.node.active = !i.stringUtil.isBlank(
                this._curData.bg
            );
            if (this.imgBg.node.active) {
                this.imgBg.url = n.uiHelps.getStory(this._curData.bg);
                this.imgPrefab.url = n.uiHelps.getStoryBg(this._curData.bg);
                var e = !i.stringUtil.isBlank(this._curData.say);
                null == this.imgbgSprite &&
                    (this.imgbgSprite = this.imgBg.node.getComponent(
                        cc.Sprite
                    ));
                this.imgbgSprite.unscheduleAllCallbacks();
                c.shaderUtils.setSlowBlur(this.imgbgSprite, !e);
                !e && this.imgbgSprite.blur > 0.1 ?
                    this.scheduleOnce(this.hideImgBg, 1.5) :
                    e ||
                    !(
                        null == this.imgbgSprite.blur ||
                        this.imgbgSprite.blur <= 0.1
                    ) ||
                    t ||
                    (this.imgBg.node.active = !1);
            }
            t ? this.showAnimaStory() : this.showLabelStory();
        };
        e.prototype.hideImgBg = function () {
            this.imgbgSprite &&
                (null == this.imgbgSprite.blur ||
                    this.imgbgSprite.blur <= 0.1) &&
                (this.imgBg.node.active = !1);
        };
        e.prototype.showNextStory = function () {
            if (0 == this._curId)
                if (0 != r.playerProxy.storyIds.length) {
                    this._curId = r.playerProxy.storyIds.shift();
                    this._curData = r.playerProxy.getStoryData(this._curId);
                    this._curData ? this.showStory() : this.onClickNext();
                } else {
                    if (99 != this._type) {
                        facade.send("STORY_END");
                        facade.send(r.guideProxy.UPDATE_TRIGGER_GUIDE, {
                            type: 5,
                            value: parseInt(
                                r.timeProxy.getLoacalValue("StoryId")
                            )
                        });
                    } else facade.send("STORY_END_RECORD");
                    i.utils.closeView(this);
                }
        };
        e.prototype.clickClost = function () {
            facade.send("STORY_END_RECORD");
            i.utils.closeView(this);
        };
        e.prototype.showNext = function (t) {
            var e = r.playerProxy.getStorySelect(t);
            this.nodeClost.active = 99 == this._type;
            if (e && e.length > 0) {
                this.nodeTalk.active = !1;
                this.nodeSelect.active = !0;
                this.anima.url = "";
                var o = [];
                this._skipSelectList = [];
                for (var i = 0; i < e.length; i++) {
                    var n = new u.StorySelectData();
                    n.nextid = e[i].next1;
                    n.context = e[i].text1;
                    n.id = e[i].id;
                    n.tiaojian = e[i].tiaojian;
                    n.para = e[i].para;
                    this.isCanSelect(n, !1) ?
                        this._isSkipLook && this._skipSelectList.push(n) :
                        (this.nodeClost.active = !0);
                    o.push(n);
                }
                e[0].group.split("_").length > 1 &&
                    o.sort(function (t, e) {
                        return 10 * Math.random() < 5 ? 1 : -1;
                    });
                this.list.data = o;
            } else {
                this._curData &&
                    this._curData.skip &&
                    0 != this._curData.skip &&
                    s.funUtils.openView(this._curData.skip);
                var l = this._curData ? this._curData.id : 0;
                this._isSkip && (t = "0");
                this._curData = r.playerProxy.getStoryData(t);
                if (this._curData) this.showStory();
                else {
                    this._curId = 0;
                    0 != l &&
                        99 != this._type &&
                        r.timeProxy.saveLocalValue("StoryId", l + "");
                    this.showNextStory();
                }
            }
        };
        e.prototype.showArmy = function (t) {
            if (!(t <= 0)) {
                var e = r.playerProxy.userData.army,
                    o = e + t;
                this.prgArmy.node.active = !0;
                this.prgArmy.node.opacity = 255;
                n.uiUtils.showNumChange(this.lblPrgArmy, o, e);
                n.uiUtils.showPrgChange(this.prgArmy, 1, e / o);
                i.utils.showEffect(this.prgArmy, 0);
            }
        };
        e.prototype.onClickSys = function (t, e) {
            i.utils.openPrefabView(e);
        };
        e.prototype.onClickWord = function () {
            i.utils.openPrefabView("StoryWord", !1, this._storyRecords);
        };
        e.prototype.onClickAutoPlay = function () {
            this.autoBg.active = !this.autoPlayer.isChecked;
            o.isAutoPlay = this.autoPlayer.isChecked;
            r.timeProxy.saveLocalValue(
                "STORY_AUTO_PLAYER",
                this.autoPlayer.isChecked ? "1" : "0"
            );
            if (this.autoPlayer.isChecked) {
                if (!this.nodeSelect.active) {
                    var t = "",
                        e = r.playerProxy.getReplaceName(this._curData.txt);
                    this.nodeImg.active && this.lblStone.isRunShowText ?
                        (t = this.lblStone.string) :
                        this.nodeImg1.active && this.lblContext.isRunShowText ?
                        (t = this.lblContext.string) :
                        this.nodeSp.active &&
                        this.lblSp.isRunShowText &&
                        (t = this.lblSp.string);
                    var i =
                        null != this._curData.time && 0 != this._curData.time ?
                        (this._curData.time / 1e3) * (t.length / e.length) :
                        0.1 * t.length;
                    this.scheduleOnce(this.onClickNext, i + this.nextTime);
                }
            } else this.unscheduleAllCallbacks();
        };
        e.prototype.soundPlayerOver = function () {
            o.isAutoPlay && this.scheduleOnce(this.onClickNext, this.nextTime);
        };
        e.isAutoPlay = !1;
        __decorate([y(cc.Node)], e.prototype, "nodeLeft", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeCon", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeTalk", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeSelect", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblStone", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblContext", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblSp", void 0);
        __decorate([y(a.default)], e.prototype, "imgBg", void 0);
        __decorate([y(a.default)], e.prototype, "imgPrefab", void 0);
        __decorate([y(l.default)], e.prototype, "list", void 0);
        __decorate([y(a.default)], e.prototype, "right", void 0);
        __decorate([y(a.default)], e.prototype, "anima", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeSkil", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeSkilAnima", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeImg", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeImg1", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeSp", void 0);
        __decorate([y(_.default)], e.prototype, "roleSpine", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeClost", void 0);
        __decorate([y(a.default)], e.prototype, "roleName", void 0);
        __decorate([y(cc.Animation)], e.prototype, "animeName", void 0);
        __decorate([y(cc.Node)], e.prototype, "nameNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "record", void 0);
        __decorate([y(cc.Toggle)], e.prototype, "autoPlayer", void 0);
        __decorate([y(cc.Node)], e.prototype, "autoBg", void 0);
        __decorate([y(cc.ProgressBar)], e.prototype, "prgArmy", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblPrgArmy", void 0);
        return (e = o = __decorate([h], e));
        var o;
    })(cc.Component);
o.default = f;