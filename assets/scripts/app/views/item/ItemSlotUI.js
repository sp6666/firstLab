var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../utils/UIUtils"),
    l = require("../../component/UrlLoad"),
    r = require("../../utils/Utils"),
    a = require("../../Initializer"),
    s = require("../../models/BagProxy"),
    c = require("../../models/TimeProxy"),
    _ = require("../../utils/ShaderUtils"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.imgSlot = null;
            e.colorFrame = null;
            e.lblcount = null;
            e.lblNameCount = null;
            e.lblName = null;
            e.nodeCount = null;
            e.effect = null;
            e.propNode = null;
            e.nodeProp = null;
            e.urlProp = null;
            e.lblProp = null;
            e.bgSp = null;
            e._icosp = null;
            e._slotsp = null;
            return e;
        }
        o = e;
        e.prototype.setGray = function (t) {
            void 0 === t && (t = !1);
            if (this.imgSlot) {
                null == this._icosp &&
                    (this._icosp = this.imgSlot.node.getComponent(cc.Sprite));
                this._icosp && _.shaderUtils.setImageGray(this._icosp, t);
            }
            if (this.colorFrame) {
                null == this._slotsp &&
                    (this._slotsp = this.colorFrame.node.getComponent(
                        cc.Sprite
                    ));
                this._slotsp && _.shaderUtils.setImageGray(this._slotsp, t);
            }
            this.bgSp && _.shaderUtils.setImageGray(this.bgSp, t);
        };
        e.prototype.onClickShowInfo = function () {
            var t = this._data;
            if (t)
                switch (t.kind) {
                    case s.DataType.HERO:
                        null == a.servantProxy.getHeroData(t.id) ?
                            r.utils.openPrefabView(
                                "servant/ServantInfo",
                                !1,
                                localcache.getItem(localdb.table_hero, t.id)
                            ) :
                            c.funUtils.openView(c.funUtils.servantView.id);
                        break;

                    case s.DataType.WIFE:
                        r.utils.openPrefabView(
                            "wife/WifeInfo",
                            !1,
                            localcache.getItem(localdb.table_wife, t.id)
                        );
                        break;

                    case s.DataType.HERO_JB:
                    case s.DataType.HERO_SW:
                    case s.DataType.BOOK_EXP:
                    case s.DataType.SKILL_EXT:
                    case s.DataType.WIFE_EXP:
                    case s.DataType.WIFE_FLOWER:
                    case s.DataType.WIFE_HAOGAN:
                    case s.DataType.WIFE_JB:
                    case s.DataType.WIFE_LOVE:
                    case s.DataType.HEAD_HEAD:
                        break;
                    default:
                        if (
                            null ==
                            localcache.getItem(localdb.table_item, t.id) &&
                            (t.kind == s.DataType.ITEM || 0 == t.kind)
                        )
                            return;
                        r.utils.openPrefabView("ItemInfo", !1, t);
                }
        };
        e.prototype.getImgSlotUrl = function () {
            var t = this._data;
            if (t)
                switch (t.kind) {
                    case s.DataType.HERO:
                    case s.DataType.HERO_JB:
                    case s.DataType.HERO_SW:
                    case s.DataType.BOOK_EXP:
                    case s.DataType.SKILL_EXT:
                        return n.uiHelps.getServantHead(t.id);

                    case s.DataType.WIFE:
                    case s.DataType.WIFE_EXP:
                    case s.DataType.WIFE_FLOWER:
                    case s.DataType.WIFE_HAOGAN:
                    case s.DataType.WIFE_JB:
                    case s.DataType.WIFE_LOVE:
                        var e = localcache.getItem(localdb.table_wife, t.id);
                        return n.uiHelps.getWifeHead(e.res);

                    case s.DataType.HEAD_BLANK:
                        var o = localcache.getItem(
                            localdb.table_userblank,
                            t.id
                        );
                        return o ? n.uiHelps.getBlank(o.blankmodel) : "";
                    case s.DataType.HEAD_HEAD: {
                        var head = localcache.getItem(localdb.table_userhead, t.id);
                        return head ? n.uiHelps.getAvatar(head.headres) : "";
                    };
                case s.DataType.CLOTHE:
                    var i = localcache
                        .getItem(localdb.table_userClothe, t.id)
                        .model.split("|");
                    return n.uiHelps.getRolePart(i[0]);

                case s.DataType.JB_ITEM:
                    var l = localcache.getItem(localdb.table_heropve, t.id);
                    return n.uiHelps.getServantHead(l.roleid);

                case s.DataType.HERO_CLOTHE:
                    var r = localcache.getItem(
                        localdb.table_heroClothe,
                        t.id
                    );
                    return n.uiHelps.getServantSkinIcon(r.model);

                case s.DataType.CHENGHAO:
                    var a = localcache.getItem(localdb.table_fashion, t.id);
                    return a ? n.uiHelps.getChengHaoIcon(a.simg) : "";

                default:
                    var c = localcache.getItem(
                        localdb.table_item,
                        t.id + ""
                    );
                    return n.uiHelps.getItemSlot(c ? c.icon : t.id);
                }
        };
        e.prototype.onClickShowDisCountBuy = function () {
                cc.log("onClickShowDisCountBuy");
                if (!this._data.ext) return;
                r.utils.openPrefabView(
                    "shopping/CommonDisCountBuy",
                    !1,
                    this._data.ext,
                );
            },
            e.prototype.isSpKind = function (t) {
                return (
                    t == s.DataType.HEAD_BLANK ||
                    t == s.DataType.HERO ||
                    t == s.DataType.WIFE ||
                    t == s.DataType.CLOTHE ||
                    t == s.DataType.WIFE_EXP ||
                    t == s.DataType.WIFE_FLOWER ||
                    t == s.DataType.WIFE_HAOGAN ||
                    t == s.DataType.WIFE_JB ||
                    t == s.DataType.WIFE_LOVE ||
                    t == s.DataType.HERO_JB ||
                    t == s.DataType.HERO_SW ||
                    t == s.DataType.BOOK_EXP ||
                    t == s.DataType.SKILL_EXT ||
                    t == s.DataType.HERO_CLOTHE
                );
            };
        e.prototype.isSpKindName = function (t) {
            return (
                t == s.DataType.HEAD_BLANK ||
                t == s.DataType.HERO ||
                t == s.DataType.WIFE ||
                t == s.DataType.CLOTHE ||
                t == s.DataType.JB_ITEM ||
                t == s.DataType.HERO_CLOTHE
            );
        };
        e.prototype.showData = function () {
            var t = this._data;
            if (t) {
                0 == o._clothe_item_id &&
                    (o._clothe_item_id = r.utils.getParamInt("clother_item"));
                t.id = t.id ? t.id : t.itemid;
                t.count = t.num ? t.num : t.count;
                var e = localcache.getItem(localdb.table_item, t.id + ""),
                    i = this.isSpKind(t.kind);
                if (this.imgSlot) {
                    this.imgSlot.node.scaleX = this.imgSlot.node.scaleY = i ?
                        0.85 :
                        1;
                    this.imgSlot.url = this.getImgSlotUrl();
                }
                if (this.colorFrame) {
                    this.colorFrame.node.active = t.kind != s.DataType.HEAD_BLANK; // && t.kind != s.DataType.CLOTHE;

                    if ((i || t.kind == s.DataType.CHENGHAO) && t.kind != s.DataType.CLOTHE)
                        this.colorFrame.url = n.uiHelps.getItemColor(5);
                    else if (t.kind == s.DataType.JB_ITEM) {
                        var l = localcache.getItem(localdb.table_heropve, t.id);
                        this.colorFrame.url = n.uiHelps.getItemColor(l.color);
                    } else if (t.kind == s.DataType.CLOTHE) {
                        this.colorFrame.url = n.uiHelps.getItemColor(1);
                    } else {
                        var c = e && e.color ? e.color : 2;
                        c = c < 2 ? 2 : c;
                        this.colorFrame.url = n.uiHelps.getItemColor(c);
                    }
                }
                this.effect &&
                    (i ||
                        1 == t.id ||
                        1200 == t.id ||
                        945 == t.id ||
                        t.id == o._clothe_item_id ||
                        t.kind == s.DataType.CHENGHAO ||
                        (e && e.kind == s.ItemType.PROP_ADD) ?
                        (this.effect.active = !0) :
                        (this.effect.active = !1));
                this.nodeCount &&
                    (this.nodeCount.active = t.count && t.count > 1);
                var _ = this.isSpKindName(t.kind);
                if (this.lblcount) { //t.count > 1 改为t.count >= 1 
                    this.lblcount.string =
                        _ ? a.playerProxy.getKindIdName(t.kind, t.id) : r.utils.formatMoney(t.count && t.count >= 1 ? t.count : 0);
                }
                /*和上面一模一样，隐去
                this.lblcount &&
                    (this.lblcount.string = _ ?
                        a.playerProxy.getKindIdName(t.kind, t.id) :
                        r.utils.formatMoney(
                            t.count && t.count > 1 ? t.count : 0
                        ));*/
                if (this.lblNameCount)
                    if (_)
                        this.lblNameCount.string = i18n.t("COMMON_ADD", {
                            n: a.playerProxy.getKindIdName(t.kind, t.id),
                            c: t.count ? t.count : 1
                        });
                    else if (t.kind == s.DataType.CHENGHAO) {
                    var d = localcache.getItem(
                        localdb.table_fashion,
                        t.id + ""
                    );
                    this.lblNameCount.string = i18n.t("COMMON_ADD", {
                        n: d ? d.name : "",
                        c: t.count ? r.utils.formatMoney(t.count) : 0
                    });
                } else {
                    var u = localcache.getItem(
                        localdb.table_item,
                        t.id + ""
                    );
                    this.lblNameCount.string = i18n.t("COMMON_ADD", {
                        n: u ? u.name : "",
                        c: t.count ? r.utils.formatMoney(t.count) : 0
                    });
                }
                if (this.nodeProp) {
                    this.nodeProp.active = t.kind == s.DataType.CLOTHE;
                    if (this.nodeProp.active) {
                        var p = localcache.getItem(
                            localdb.table_userClothe,
                            t.id
                        );
                        this.nodeProp.active = p.prop && p.prop.length > 0;
                        if (this.nodeProp.active)
                            if (1 == p.prop_type) {
                                this.lblProp.string = "+" + p.prop[0].value;
                                this.urlProp.url = n.uiHelps.getLangSp(
                                    p.prop[0].prop
                                );
                            } else {
                                this.lblProp.string =
                                    "+" + p.prop[0].value / 100 + "%";
                                this.urlProp.url = n.uiHelps.getClotheProImg(
                                    p.prop_type,
                                    p.prop[0].prop
                                );
                            }
                    }
                }
                this.lblName &&
                    (this.lblName.string = a.playerProxy.getKindIdName(
                        t.kind,
                        i && !_ ? 0 : t.id
                    ));
                this.propNode && (this.propNode.active = null != t.prop);
            }
        };
        e._clothe_item_id = 0;
        __decorate([p(l.default)], e.prototype, "imgSlot", void 0);
        __decorate([p(l.default)], e.prototype, "colorFrame", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblcount", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblNameCount", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeCount", void 0);
        __decorate([p(cc.Node)], e.prototype, "effect", void 0);
        __decorate([p(cc.Node)], e.prototype, "propNode", void 0);
        __decorate([p(cc.Node)], e.prototype, "nodeProp", void 0);
        __decorate([p(l.default)], e.prototype, "urlProp", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblProp", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "bgSp", void 0);
        return (e = o = __decorate([u], e));
        var o;
    })(i.default);
o.default = h;