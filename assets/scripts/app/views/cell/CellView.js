var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/UIUtils"),
    a = require("./CellHead"),
    s = require("../../component/List"),
    c = require("../../component/LangSprite"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.prisoner = null;
            e.lblName = null;
            e.hp = null;
            e.lblCount = null;
            e.lblSw = null;
            e.lblDaily = null;
            e.lblHp = null;
            e.checkBox = null;
            e.btnSp = [];
            e.sprites = [];
            e.cellHeads = [];
            e.nodeBg = null;
            e.changeSp = null;
            e.baojiSp = null;
            e.heartSp = null;
            e.nodeItem = null;
            e.addItem = null;
            e.lblNames = [];
            e.petList = null;
            e.icons = [];
            e.iconFarme = [];
            e.lblLv = null;
            e.lblPro = null;
            e.lvUpEff = null;
            e.lblCost = null;
            e.proUrl = null;
            e.pro5 = null;
            e.costMoney = null;
            e._lastHp = -1;
            e._lastHit = -1;
            e._petList = [];
            e._oldLv = 0;
            e._costMoney = 0;
            e._costFood = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                n.cellProxy.LAO_FANG_MING_WAMG_UPDATE,
                this.mwUpdate,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            facade.subscribe(
                n.cellProxy.LAO_FANG_PET_LIST,
                this.onPetsList,
                this
            );
            this.nodeItem.active = !1;
            this.initCellData();
            this.dataUpdate();
            this.mwUpdate();
        };
        e.prototype.initCellData = function() {
            this._petList = localcache.getList(localdb.table_prisoner_pic);
            this.petList.data = this._petList;
            this.petList.selectIndex = 0;
            var t = localcache.getList(localdb.table_prisoner);
            this.curData = t[0];
            var e = n.cellProxy.getPestInfo(this.curData.id);
            this._oldLv = e ? e.lv : 1;
        };
        e.prototype.dataUpdate = function() {
            this.showCellIndex();
            for (
                var t = localcache.getItem(
                        localdb.table_prisoner_pic,
                        this.getCurId()
                    ),
                    e = 0;
                e < this.btnSp.length;
                e++
            ) {
                this.btnSp[e].spriteFrame = this.sprites[
                    t["foodicon" + (e + 1)] - 1
                ];
                this.lblNames[e].string = t["foodname" + (e + 1)];
                var o = n.cellProxy.getPestInfo(this.getCurId());
                n.playerProxy.isUnlockCloth(3005) &&
                    o &&
                    (this.icons[e].spriteFrame =
                        e + 1 == o.bjid
                            ? this.iconFarme[0]
                            : this.iconFarme[1]);
            }
            var i = 1;
            if (n.playerProxy.isUnlockCloth(3003)) {
                i -=
                    localcache.getItem(localdb.table_userClothe, 3003)
                        .pet_data / 1e4;
            }
            this._costFood = Math.ceil(this.curData.power * i);
            this.lblCost.string = i18n.t("CELL_FEED_COST", {
                num: this._costFood
            });
            var l = Math.floor(
                (0.1 * this.getCurId() + 1) *
                    (0.2 * n.playerProxy.userData.level + 1) *
                    200
            );
            this._costMoney = Math.ceil(l * i);
            this.costMoney.string = i18n.t("CELL_COST_MONEY", {
                num: this._costMoney
            });
        };
        e.prototype.showCellIndex = function() {
            this.curData = localcache.getItem(
                localdb.table_prisoner,
                this.getCurId()
            );
            for (
                var t = localcache.getList(localdb.table_prisoner),
                    e = t.indexOf(this.curData),
                    o = t.length,
                    i = 0;
                i < this.cellHeads.length;
                i++
            ) {
                var n = (i + e) % o;
                this.cellHeads[i].data = t.length > n ? t[n] : null;
            }
        };
        e.prototype.getCurId = function() {
            return this.curData.id;
        };
        e.prototype.mwUpdate = function() {
            var t = n.cellProxy.getPetExp(this.getCurId()),
                e = n.cellProxy.getPetExp(this.getCurId(), !0);
            if (null != t) {
                var o = n.cellProxy.getPestInfo(this.getCurId());
                if (null != o) {
                    var l = e ? 1 - (e.food - o.exp) / e.food : 1;
                    this.lblHp.string = e
                        ? i18n.t("COMMON_NEED", {
                              f: o.exp,
                              s: e.food
                          })
                        : i18n.t("LEADER_MAX_LEVEL");
                    this.hp.progress = l;
                    this.lblDaily.string = i18n.t("CELL_CUR_MING_WANG", {
                        value: n.cellProxy.mingWangData.mw,
                        max: n.cellProxy.mingWangData.maxmw
                    });
                    this.lblSw.string = i18n.t("CELL_DAILY_GET", {
                        value: n.cellProxy.mingWangData.eday
                    });
                    var a = localcache.getItem(
                        localdb.table_prisoner_pic,
                        this.getCurId()
                    );
                    this.lblName.string = a.name;
                    var s = i.utils.getParamInt("pet_levelup");
                    if (this._oldLv < s && o.lv == s) {
                        this.changeSp.node.active = !0;
                        this.changeSp.animation = "animation";
                    }
                    if (this._oldLv < o.lv) {
                        this.lvUpEff.setActive = !0;
                        this.lvUpEff.animation = "animation";
                        this.scheduleOnce(this.onHideSpine, 2);
                        i.audioManager.playSound("levelup", !0, !0);
                    }
                    this._oldLv = o.lv;
                    var c = i.utils.getParamInt("pet_levelup");
                    this.prisoner.url = r.uiHelps.getCellBody(
                        o.lv < c ? a.mod1 : a.mod2
                    );
                    this._lastHp = l;
                    this.lblLv.string = i18n.t("COMMON_LV", {
                        lv: o.lv
                    });
                    this.lblPro.string = i18n.t("COMMON_ADD_3", {
                        num: t.ep
                    });
                    this.pro5.active = 5 == t.ep_type;
                    this.proUrl.node.active = 5 != t.ep_type;
                    this.proUrl.url = r.uiHelps.getLangSp(t.ep_type);
                }
            }
        };
        e.prototype.onClickHit = function(t, e) {
            var o = parseInt(e);
            if (this.checkBox && this.checkBox.isChecked)
                n.cellProxy.sendBianDa(5, this.curData.id);
            else {
                if (n.cellProxy.mingWangData.mw < this._costFood) {
                    i.alertUtil.alert18n("JAIL_RENOWN_SHORT");
                    return;
                }
                if (n.playerProxy.userData.food < this._costMoney) {
                    i.alertUtil.alertItemLimit(3);
                    return;
                }
                var l = n.cellProxy.getPetExp(this.getCurId(), !0),
                    r = localcache.getItem(localdb.table_item, 3);
                if (l && n.playerProxy.userData.food < l.food) {
                    i.alertUtil.alertItemLimit(3);
                    return;
                }
                i.alertUtil.alert("CELL_COST", {
                    n: r.name,
                    v: this._costMoney
                });
                this.showEffectIndex(o);
                var a = n.cellProxy.getPestInfo(this.curData.id);
                a && n.cellProxy.sendBianDa(o, a.id);
            }
        };
        e.prototype.showEffectIndex = function(t) {
            var e = cc.instantiate(this.nodeItem);
            e.active = !0;
            this.addItem.addChild(e);
            var o = e.getComponent(cc.Sprite),
                n = this.btnSp[t - 1];
            e.x = n.node.x;
            e.y = n.node.y;
            o.spriteFrame = n.spriteFrame;
            i.utils.showEffect(o, t - 1, function() {
                e.removeFromParent(!0);
                e.destroy();
            });
        };
        e.prototype.onPetsList = function() {
            this.petList.updateItemShow();
            this.dataUpdate();
        };
        e.prototype.onClickPets = function(t, e) {
            var o = e.data,
                l = n.cellProxy.getPestInfo(o.id);
            if (l) {
                var r = localcache.getItem(localdb.table_prisoner, o.id);
                this.curData = r;
                this._oldLv = l.lv;
                this.dataUpdate();
                this.mwUpdate();
                for (var a = 0; a < this._petList.length; a++)
                    this._petList[a].id == o.id &&
                        (this.petList.selectIndex = a);
            } else {
                var s = localcache.getItem(localdb.table_prisoner, o.id),
                    c = localcache.getItem(localdb.table_bigPve, s.bmap);
                c &&
                    i.alertUtil.alert(
                        i18n.t("CELL_OPEN_TIP", {
                            n:
                                i18n.t("FIGHT_BIG_TIP", {
                                    s: c.id
                                }) + c.name
                        })
                    );
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        e.prototype.onClickTq = function() {
            i.utils.openPrefabView("cell/CellTqWindow");
        };
        e.prototype.onHideSpine = function() {
            this.lvUpEff.setActive = !1;
        };
        __decorate([u(l.default)], e.prototype, "prisoner", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.ProgressBar)], e.prototype, "hp", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblCount", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblSw", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblDaily", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblHp", void 0);
        __decorate([u(cc.Toggle)], e.prototype, "checkBox", void 0);
        __decorate([u([cc.Sprite])], e.prototype, "btnSp", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "sprites", void 0);
        __decorate([u([a.default])], e.prototype, "cellHeads", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeBg", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "changeSp", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "baojiSp", void 0);
        __decorate([u(sp.Skeleton)], e.prototype, "heartSp", void 0);
        __decorate([u(cc.Node)], e.prototype, "nodeItem", void 0);
        __decorate([u(cc.Node)], e.prototype, "addItem", void 0);
        __decorate([u([cc.Label])], e.prototype, "lblNames", void 0);
        __decorate([u(s.default)], e.prototype, "petList", void 0);
        __decorate([u([cc.Sprite])], e.prototype, "icons", void 0);
        __decorate([u([cc.SpriteFrame])], e.prototype, "iconFarme", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblPro", void 0);
        __decorate([u(c.default)], e.prototype, "lvUpEff", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblCost", void 0);
        __decorate([u(l.default)], e.prototype, "proUrl", void 0);
        __decorate([u(cc.Node)], e.prototype, "pro5", void 0);
        __decorate([u(cc.Label)], e.prototype, "costMoney", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
