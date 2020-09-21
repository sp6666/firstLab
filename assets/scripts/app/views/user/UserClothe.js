var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/RoleSpine"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../component/ConfirmView"),
    s = require("../../utils/ApiUtils"),
    c = require("../../component/UrlLoad"),
    _ = require("../../utils/UIUtils"),
    d = require("../../Config"),
    u = require("../../models/TimeProxy"),
    p = cc._decorator,
    h = p.ccclass,
    y = p.property,
    f = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.roleSpine = null;
            e.nodeTab = null;
            e.nodeList = null;
            e.lblType = null;
            e.btns = [];
            e.nodeUp = null;
            e.nodeDown = null;
            e.lblInfo = null;
            e.lblLock = null;
            e.nodeInfo = null;
            e.effectSprite = null;
            e.lblLimitTime = null;
            e.lblRemainTime = null;
            e.tagNodeShow = null;
            e.tagNodeHide = null;
            e.tagNode = null;
            e.tagContainerNode = null;
            e.btnLock = null;
            e.btnGo = null;
            e.btnSave = null;
            e.bgUrl = null;
            e.nodeBot = null;
            e.nodeTop = null;
            e.nodeRight = null;
            e.nodeShare = null;
            e.lblScore = null;
            e.btnShare = null;
            e.btnSuit = null;
            e.nodeRole = null;
            e.typeStrs = [
                "",
                "USER_CLOTHE_HEAD",
                "USER_CLOTHE_DRESS",
                "USER_CLOTHE_EAR",
                "USER_CLOTHE_BG",
                "USER_CLOTHE_EFF",
                "USER_CLOTHE_ANIMAL"
            ];
            e._orgBody = 0;
            e._orgHead = 0;
            e._orgEar = 0;
            e._orgBg = 0;
            e._orgEff = 0;
            e._orgAnimal = 0;
            e._body = 0;
            e._head = 0;
            e._ear = 0;
            e._bg = 0;
            e._eff = 0;
            e._animal = 0;
            e._curIndex = 1;
            e._curData = null;
            e._orgNodeRoleX = 0;
            e.tag1 = null;
            e.tag2 = null;
            e.selectTag1 = null;
            e.selectTag2 = null;
            e.selectTag3 = null;
            e.selectTag4 = null;
            e.selectTag5 = null;
            e.selectTag6 = null;
            e.btnReset = null;
            e.tagSelected = null;
            e.selectLabel = null;
            e.selectView = null;
            e.selectNode = null;
            e.clotheDefaultNode = null;
            e.showTag = false;
            return e;
        }
        e.prototype.onLoad = function () {
            this.btnShare && (this.btnShare.active = d.Config.isShowShare);
            if (this.btnSuit) {
                var t = localcache.getList(localdb.table_usersuit);
                this.btnSuit.active = t && t.length > 0;
            }
            this.nodeRole && (this._orgNodeRoleX = this.nodeRole.x);

            this.initClothe();
            this.onClickBack();
            this.updateScore();

            facade.subscribe(
                r.playerProxy.PLAYER_CLOTH_UPDATE,
                this.updateShow,
                this
            );

            facade.subscribe(
                r.playerProxy.PLAYER_SHOW_CHANGE_UPDATE,
                this.initClothe,
                this
            );

            facade.subscribe(
                r.playerProxy.PLAYER_RESET_JOB,
                this.setRoleShow,
                this
            );
            facade.subscribe(
                r.playerProxy.PLAYER_CLOTHE_SCORE,
                this.updateScore,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClost, this);
            facade.subscribe("SHARE_SUCCESS", this.onShareShow, this);
            facade.subscribe("SHOP_BUY_ITEM_ID", this.onShopBuy, this);
            this.pvpType = 0;//普通
            this.nodeInfo.active = !1;
            var e = this.node.openParam;
            e && e.tab && this.onClickItem(null, e.tab);
            this.tagNode.node.active = false;
            this.tagCtr = this.tagContainerNode.getComponent("TagInfo");
        };

        e.prototype.initClothe = function (t) {
            this.updateCurClothe(r.playerProxy.userClothe);
            this.setRoleShow();
        }

        e.prototype.updateCurClothe = function (t) {
            this._body = t ? t.body : 0;
            this._head = t ? t.head : 0;
            this._ear = t ? t.ear : 0;
            this._bg = t ? t.background : 0;
            this._eff = t ? t.effect : 0;
            this._animal = t ? t.animal : 0;
            if (0 == this._body || 0 == this._head) {
                var e = localcache.getItem(
                        localdb.table_officer,
                        r.playerProxy.userData.level
                    ),
                    o = localcache.getItem(localdb.table_roleSkin, e.shizhuang);
                0 == this._body &&
                    (this._body = r.playerProxy.getPartId(
                        2,
                        "body_0_" + o.body
                    ));
                0 == this._head &&
                    (this._head = r.playerProxy.getPartId(
                        1,
                        "headf_0_" + o.headf
                    ));
                0 == this._head &&
                    (this._head = r.playerProxy.getPartId(
                        1,
                        "headh_0_" + o.headh
                    ));
            }
            this._orgBody = this._body;
            this._orgHead = this._head;
            this._orgEar = this._ear;
            this._orgAnimal = this._animal;
            this._orgBg = this._bg;
            this._orgEff = this._eff;
        };
        e.prototype.updateScore = function () {
            this.lblScore &&
                (this.lblScore.string = l.utils.formatMoney(
                    r.playerProxy.clotheScore
                ));
        };
        e.prototype.setRoleShow = function () {
            var t = r.playerProxy.userData,
                e = {};
            e.body = this._body;
            e.ear = this._ear;
            e.head = this._head;
            e.animal = this._animal;
            e.effect = this._eff;
            this.bgUrl.node.active = 0 != this._bg;
            if (0 != this._bg) {
                var o = localcache.getItem(localdb.table_userClothe, this._bg);
                o && (this.bgUrl.url = _.uiHelps.getStoryBg(o.model));
            }
            this.roleSpine.setClothes(t.sex, t.job, t.level, e);
            this.roleSpine.replayAll();
        };
        e.prototype.onClickItem = function (t, e) {
            this.nodeList.active = !0;
            this.nodeTab.active = !1;
            this._curData = null;
            var o = parseInt(e);
            this.lblType.string = i18n.t(this.typeStrs[o]);
            this._curIndex = o;
            this.updateShow();
            for (var i = 0; i < this.btns.length; i++)
                this.btns[i].interactable = o - 1 != i;
            this.nodeInfo.active = null != this._curData;
            this.nodeUp.active = !0;
            this.nodeDown.active = !1;

            this.tagNode.node.active = null != this._curData;
            // this.tagNodeShow.active = true;
            // this.tagNodeHide.active = false;

            //显示选择标签
            if(this.selectNode) this.selectNode.active = true;
            this.onClickRole(null, !0);

            //进入的时候调用一下新手引导, 类型12
            r.playerProxy.clothePartType += 1;

            if(r.confidanteProxy.getStatus() == 0)  //新玩家才走这里
            {
                facade.send(r.guideProxy.UPDATE_TRIGGER_GUIDE, {type: 12, value: r.confidanteProxy.lastChapter + "|" + r.confidanteProxy.lastLevel + "|" + r.playerProxy.clothePartType});
            }
            
        };
        e.prototype.updateShow = function () {
            var t = localcache.getGroup(
                    localdb.table_userClothe,
                    "part",
                    this._curIndex
                ),
                e = [];
                for (var o = 0; o < t.length; o++) {
                    if (t[o].show_time && "0" != t[o].show_time) {
                        if (
                            l.timeUtil.str2Second(t[o].show_time) >
                            l.timeUtil.second &&
                            !r.limitActivityProxy.isHaveTypeActive(t[o].show_avid)
                        )
                            continue;
                    } else if (
                        !r.limitActivityProxy.isHaveTypeActive(t[o].show_avid)
                    )
                        continue;
                    (0 != t[o].display.length &&
                        -1 == t[o].display.indexOf(d.Config.pf)) ||
                    e.push(t[o]);
                }
            if(this.pvpType == 0) {
                this._curIndex > 2 &&
                e.push({
                    id: 0,
                    name: i18n.t("USER_CLOTHE_DELECT"),
                    part: this._curIndex
                });
                var i = {};
                e.sort(function (t, e) {
                    null == i[t.id] &&
                        (i[t.id] = r.playerProxy.isUnlockCloth(t.id) ? 1 : 0);
                    null == i[e.id] &&
                        (i[e.id] = r.playerProxy.isUnlockCloth(e.id) ? 1 : 0);
                    var o = i[t.id],
                        n = i[e.id];
                    return o != n ? n - o : e.id - t.id;
                });
            }else {
                //盛装界面
                //this.sortWithTag();
                var eCopyGot = [];
                var eCopyUnGot = [];
                for (var index = 0; index < e.length; index++) {
                    var item = e[index];
                    if(r.playerProxy.isUnlockCloth(item.id)) {
                        //解锁
                        eCopyGot.push(item);
                    }else {
                        eCopyUnGot.push(item);
                    }
                    
                }

                //根据筛选条件来筛选,分默认与不默认
                
                if(this.selectTag == -1) {
                    //默认主属性第一标签
                    var currentTag = this.tags[0].tag;
                    //也就是下标
                    eCopyGot.sort(function(a, b) {
                        return b.tag[currentTag - 1].score - a.tag[currentTag - 1].score;
                    })

                    eCopyUnGot.sort(function(a, b) {
                        return b.tag[currentTag - 1].score - a.tag[currentTag - 1].score;
                    })

                    //重新赋值
                    e = [];
                    for (var index = 0; index < eCopyGot.length; index++) {
                        e.push(eCopyGot[index]);
                    }
                    for (var index = 0; index < eCopyUnGot.length; index++) {
                        e.push(eCopyUnGot[index]);
                    }
                }else {
                    //标签发生了变化，则只显示已经获得的，并且主属性有筛选的
                    var currentTag = this.selectTag;
                    //也就是下标
                    eCopyGot.sort(function(a, b) {
                        return b.tag[currentTag - 1].score - a.tag[currentTag - 1].score;
                    })
                    //重新赋值
                    e = [];
                    for (var index = 0; index < eCopyGot.length; index++) {
                        eCopyGot[index].tag.sort(function(a, b) {
                            return b.score - a.score;
                        })
                        if(eCopyGot[index].tag[0].tag == currentTag || eCopyGot[index].tag[1].tag == currentTag) {
                            e.push(eCopyGot[index]);
                        }
                    }
                }
            }

            var n = -1;
            for (o = 0; o < e.length; o++) {
                0 != e[o].id &&
                ((e[o].id != this._body &&
                        e[o].id != this._ear &&
                        e[o].id != this._head &&
                        e[o].id != this._bg &&
                        e[o].id != this._eff &&
                        e[o].id != this._animal) ||
                    (n = o));
                e[o].pvpType = this.pvpType;
            }

            r.playerProxy.clothePartCount = 0;
            this.list.data = e;
            this.list.selectIndex = n;
            this._curData = e[n];
            this.updateShowCurInfo();
        };
        e.prototype.updateShowCurInfo = function () {
            if (null != this._curData && 0 != this._curData.id) {
                var t = r.playerProxy.isUnlockCloth(this._curData.id);
                this.lblLock.string = this._curData.text;
                this.lblInfo.string = this._curData.des;
                this.btnLock.node.active =
                    0 != this._curData.unlock &&
                    null != this._curData.money.itemid;
                this.btnGo.node.active = !t && this._curData.iconopen && 0 != this._curData.iconopen;
                this.lblLimitTime.string =
                    0 != this._curData.limit ?
                    i18n.t("USER_UNLOCK_TIME", {
                        d: this._curData.limit
                    }) :
                    "";
                this.lblRemainTime.string =
                    t && 0 != this._curData.limit ?
                    i18n.t("USER_REMAIN_TIME", {
                        d: l.timeUtil.second2hms(
                            r.playerProxy.getRemainClotheTime(
                                this._curData.id
                            )
                        )
                    }) :
                    "";

                                    //更新tag
                if(this.tagCtr) {
                    this.tagContainerNode.clotheData = this._curData;
                    this.tagCtr.initTag();
                }

                this.tagNode.node.active = true;

                if(this.pvpType == 1) {
                    this.tagNodeHide.active = true;
                    this.tagNodeShow.active = false;
                    l.utils.showEffect(this.tagNode, 0);
                    this.showTag = true;
                }

            } else l.utils.showEffect(this.effectSprite, 1);
        };
        e.prototype.onClickClothe = function (t, e) {
            var o = e.data;
            if (o) {
                this.nodeUp.active = !1;
                this.nodeDown.active = !0;
                this.nodeInfo.active = !0;
                var i = r.playerProxy.isUnlockCloth(o.id);
                l.utils.showEffect(this.effectSprite, i ? 2 : 0);
                this._curData = o;
                this.updateShowCurInfo();
                switch (o.part) {
                    case 1:
                        this._head = o.id;
                        break;

                    case 2:
                        this._body = o.id;
                        break;

                    case 3:
                        this._ear = o.id;
                        break;

                    case 4:
                        this._bg = o.id;
                        break;

                    case 5:
                        this._eff = o.id;
                        break;

                    case 6:
                        this._animal = o.id;
                }
                this.setRoleShow();
            }
        };
        e.prototype.isCanSave = function () {
            return (
                !!r.playerProxy.isUnlockCloth(this._body) &&
                (!!r.playerProxy.isUnlockCloth(this._ear) &&
                    (!!r.playerProxy.isUnlockCloth(this._head) &&
                        (!!r.playerProxy.isUnlockCloth(this._bg) &&
                            (!!r.playerProxy.isUnlockCloth(this._eff) &&
                                !!r.playerProxy.isUnlockCloth(this._animal)))))
            );
        };
        e.prototype.checkBuyItem = function () {
            if (!this.isCanSave()) {
                l.alertUtil.alert18n("USER_SAVE_LOST");
                var t = [],
                    e = !1;
                if (!this.checkAddClothe(this._body, t)) {
                    this._body = this._orgBody;
                    e = !0;
                }
                if (!this.checkAddClothe(this._head, t)) {
                    this._head = this._orgHead;
                    e = !0;
                }
                if (!this.checkAddClothe(this._ear, t)) {
                    this._ear = this._orgEar;
                    e = !0;
                }
                if (!this.checkAddClothe(this._animal, t)) {
                    this._animal = this._orgAnimal;
                    e = !0;
                }
                if (!this.checkAddClothe(this._bg, t)) {
                    this._bg = this._orgBg;
                    e = !0;
                }
                if (!this.checkAddClothe(this._eff, t)) {
                    this._eff = this._orgEff;
                    e = !0;
                }
                if (e) {
                    l.alertUtil.alert18n("USER_CLOTHE_SAVE_NOT_BUY");
                    this.setRoleShow();
                    if (
                        0 == t.length &&
                        (this._eff != this._orgEff ||
                            this._ear != this._orgEar ||
                            this._body != this._orgBody ||
                            this._bg != this._orgBg ||
                            this._animal != this._orgAnimal ||
                            this._head != this._orgHead)
                    )
                        return !0;
                }
                t.length > 0 &&
                    l.utils.openPrefabView("user/UserBuyMore", !1, t);
                return !1;
            }
            return !0;
        };
        e.prototype.checkAddClothe = function (t, e) {
            if (!r.playerProxy.isUnlockCloth(t)) {
                var o = localcache.getItem(localdb.table_userClothe, t);
                if (!o || (1 != o.unlock && 2 != o.unlock)) return !1;
                e.push(o);
                return !0;
            }
            return !0;
        };
        e.prototype.onClickSave = function () {
            if (this.checkBuyItem()) {
                this._orgBody = this._body;
                this._orgEar = this._ear;
                this._orgHead = this._head;
                this._orgAnimal = this._animal;
                this._orgBg = this._bg;
                this._orgEff = this._eff;
                r.playerProxy.sendCloth(
                    this._head,
                    this._body,
                    this._ear,
                    this._bg,
                    this._eff,
                    this._animal
                );
            }
        };
        e.prototype.onClickRecy = function () {
            this._body = this._orgBody;
            this._head = this._orgHead;
            this._ear = this._orgEar;
            this._animal = this._orgAnimal;
            this._bg = this._orgBg;
            this._eff = this._orgEff;
            this.setRoleShow();
        };
        e.prototype.onClickBack = function () {
            this.nodeList.active = !1;
            this.nodeTab.active = !0;
            this.nodeUp.active = !0;
            this.nodeDown.active = !1;
            this.tagNodeShow.active = true;
            this.tagNodeHide.active = false;

            if (null != this._curData) {
                var t = r.playerProxy.isUnlockCloth(this._curData.id);
                l.utils.showEffect(this.effectSprite, t ? 3 : 1);
                this._curData = null;
                this.nodeInfo.active = !1;
                this.tagNode.node.active = false;
                l.utils.showEffect(this.tagNode, 1);
                if(this.initSelectView != null) {
                    this.initSelectView();
                }

            }


        };
        e.prototype.onClickClost = function () {
            var t = this;
            if (
                this._orgBody == this._body &&
                this._orgEar == this._ear &&
                this._orgHead == this._head &&
                this._orgBg == this._bg &&
                this._orgEff == this._eff &&
                this._orgAnimal == this._animal
            )
                l.utils.closeView(this, !0);
            else {
                if (!this.isCanSave()) {
                    l.utils.closeView(this, !0);
                    return;
                }
                t = this;
                l.utils.showConfirm(
                    i18n.t("USER_CLOTHE_SAVE_CONFIRM"),
                    function (e) {
                        e != a.default.NO &&
                            r.playerProxy.sendCloth(
                                t._head,
                                t._body,
                                t._ear,
                                t._bg,
                                t._eff,
                                t._animal
                            );
                        l.utils.isOpenView("user/UserClothe") &&
                            l.utils.closeView(t, !0);
                    },
                    null,
                    null,
                    i18n.t("USER_CLOTHE_SAVE"),
                    i18n.t("COMMON_NO")
                );
            }
        };
        e.prototype.onClickHideInfo = function () {
            var t = this.nodeDown.active;
            this.nodeDown.active = !t;
            this.nodeUp.active = t;
            var e = r.playerProxy.isUnlockCloth(this._curData.id);
            l.utils.showEffect(this.effectSprite, e ? (t ? 3 : 2) : t ? 1 : 0);
        };
        e.prototype.onClickUnlock = function (t) {
            void 0 === t && (t = !0);
            var e = this._curData,
                o = e.money ? e.money.itemid : 0,
                i = e.money ? e.money.count : 0,
                n = r.bagProxy.getItemCount(o);
            if (!t && n >= i && !r.playerProxy.isUnlockCloth(e.id))
                r.playerProxy.sendUnlockCloth(e.id);
            else {
                if (1 == e.unlock && 0 != i) {
                    var a = localcache.getItem(localdb.table_officer, e.para);
                    l.utils.showConfirmItem(
                        i18n.t("USER_CLOTHE_BUY_MAIN", {
                            n: a.name,
                            v: i,
                            iname: r.playerProxy.getKindIdName(1, o)
                        }),
                        o,
                        n,
                        function () {
                            n < i ?
                                l.alertUtil.alertItemLimit(o, i - n) :
                                r.playerProxy.sendUnlockCloth(e.id);
                        },
                        "USER_CLOTHE_BUY_MAIN"
                    );
                }
                2 == e.unlock &&
                    0 != i &&
                    l.utils.showConfirmItem(
                        i18n.t("USER_CLOTHE_BUY", {
                            v: i,
                            n: r.playerProxy.getKindIdName(1, o)
                        }),
                        o,
                        n,
                        function () {
                            n < i ?
                                l.alertUtil.alertItemLimit(o, i - n) :
                                r.playerProxy.sendUnlockCloth(e.id);
                        },
                        "USER_CLOTHE_BUY"
                    );
            }
        };
        e.prototype.onClickRank = function () {
            r.rankProxy.sendClotheRank();
        };
        e.prototype.onClickResetJob = function () {
            l.utils.openPrefabView("user/UserJob");
        };
        e.prototype.onClickShare = function () {
            this.nodeTop.active = this.nodeRight.active = this.nodeBot.active = !1;
            this.nodeShare && (this.nodeShare.active = !0);
            this.scheduleOnce(this.delayShare, 0.1);
        };
        e.prototype.onClickGo = function () {
            var t = this._curData;
            0 != t.iconopen && u.funUtils.openView(t.iconopen);
        };
        e.prototype.delayShare = function () {
            s.apiUtils.share_game("clothe");
        };
        e.prototype.onShareShow = function () {
            this.nodeTop.active = this.nodeRight.active = this.nodeBot.active = !0;
            this.nodeShare && (this.nodeShare.active = !1);
        };
        e.prototype.onClickSuit = function () {
            l.utils.openPrefabView("user/UserSuit");
        };
        e.prototype.onShopBuy = function (t) {
            this._curData && this.onClickUnlock(!1);
        };
        e.prototype.onClickRole = function (t, e) {
            if (
                null != this.nodeRole &&
                (null == e || 1 != e || 0 == this.nodeRole.x)
            )
                if (0 == this.nodeRole.x) {
                    l.utils.showNodeEffect(this.nodeRight, 0);
                    l.utils.showNodeEffect(this.nodeRole, 0);
                } else if (this.nodeRole.x == this._orgNodeRoleX) {
                l.utils.showNodeEffect(this.nodeRight, 1);
                l.utils.showNodeEffect(this.nodeRole, 1);
            }
        };
        e.prototype.onClickTagInfo = function() {
            var visible = this.tagNodeHide.active;
            this.tagNodeHide.active = !visible;
            this.tagNodeShow.active = visible;
            l.utils.showEffect(this.tagNode, visible ? 1 : 0);
            this.showTag = !visible;
        };
        e.prototype.sortWithTag = function() {
            
        };
        __decorate([y(i.default)], e.prototype, "list", void 0);
        __decorate([y(n.default)], e.prototype, "roleSpine", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeTab", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeList", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblType", void 0);
        __decorate([y([cc.Button])], e.prototype, "btns", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeUp", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeDown", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblInfo", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblLock", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeInfo", void 0);
        __decorate([y(cc.Sprite)], e.prototype, "effectSprite", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblLimitTime", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblRemainTime", void 0);
        __decorate([y(cc.Button)], e.prototype, "btnLock", void 0);
        __decorate([y(cc.Button)], e.prototype, "btnGo", void 0);
        __decorate([y(cc.Button)], e.prototype, "btnSave", void 0);
        __decorate([y(c.default)], e.prototype, "bgUrl", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeBot", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeTop", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeRight", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeShare", void 0);
        __decorate([y(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnShare", void 0);
        __decorate([y(cc.Node)], e.prototype, "btnSuit", void 0);
        __decorate([y(cc.Node)], e.prototype, "nodeRole", void 0);
        __decorate([y(cc.Node)], e.prototype, "tagNodeShow", void 0);
        __decorate([y(cc.Node)], e.prototype, "tagNodeHide", void 0);
        __decorate([y(cc.Sprite)], e.prototype, "tagNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "tagContainerNode", void 0);
        __decorate([y(c.default)], e.prototype, "tag1", void 0);
        __decorate([y(c.default)], e.prototype, "tag2", void 0);
        __decorate([y(c.default)], e.prototype, "selectTag1", void 0);
        __decorate([y(c.default)], e.prototype, "selectTag2", void 0);
        __decorate([y(c.default)], e.prototype, "selectTag3", void 0);
        __decorate([y(c.default)], e.prototype, "selectTag4", void 0);
        __decorate([y(c.default)], e.prototype, "selectTag5", void 0);
        __decorate([y(c.default)], e.prototype, "selectTag6", void 0);
        __decorate([y(cc.Button)], e.prototype, "btnReset", void 0);
        __decorate([y(c.default)], e.prototype, "tagSelected", void 0);
        __decorate([y(cc.Node)], e.prototype, "selectLabel", void 0);
        __decorate([y(cc.Node)], e.prototype, "selectView", void 0);
        __decorate([y(cc.Node)], e.prototype, "selectNode", void 0);
        __decorate([y(cc.Node)], e.prototype, "clotheDefaultNode", void 0);
        return (e = __decorate([h], e));
    })(cc.Component);
o.default = f;