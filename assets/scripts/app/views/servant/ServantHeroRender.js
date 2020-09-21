var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../utils/ShaderUtils"),
    s = require("../../utils/Utils"),
    c = require("./ServantStarShow"),
    _ = require("../guide/GuideItem"),
    d = cc._decorator,
    u = d.ccclass,
    p = d.property,
    h = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.icon_1 = null;
            e.icon_2 = null;
            e.iconArr = [];
            e.lblName = null;
            e.roleImg = null;
            e.mask = null;
            e.buttons = [];
            e.lblLv = null;
            e.iconNode = null;
            e.itemNode = null;
            e.starShow = null;
            e.redNode = null;
            e.leader = null;
            e.btnXianYun = null;
            e.isGuideID = !1;
            e.heroSys = null;
            e.roleSp = null;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.showData = function() {
            var t = this._data;
            this.heroSys = t;
            this.leader.active = 0 != this.heroSys.leaderid;
            if (t) {
                var e = l.servantProxy.getHeroData(t.heroid);

                var clothe = l.confidanteProxy.getConUrlId(t.heroid);
                var tmp = localcache.getItem(localdb.table_confidante_clothe, clothe);
                if(tmp)
                {
                    this.roleImg.url = r.uiHelps.getServantSmallSpine(tmp.res);
                }
                else
                {
                    this.roleImg.url = r.uiHelps.getServantSmallSpine(t.heroid);
                }
                //this.roleImg.url = r.uiHelps.getServantSmallSpine(t.heroid);
                this.starShow.setValue(t.star);
                if (e) {
                    this.lblName.string = t.name;
                    this.lblLv.string = i18n.t("COMMON_LV_TXT") + e.level;
                    this.mask.node.active = !1;
                    this.iconNode.active = !0;
                    this.redNode.active =
                        l.servantProxy.getLevelUp(e) ||
                        l.servantProxy.getTanlentUp(e) ||
                        l.servantProxy.getSkillUp(e);
                } else {
                    this.lblName.string = t.name;
                    this.mask.node.active = !0;
                    this.lblLv.string = i18n.t("COMMON_LV_TXT") + 1;
                    this.iconNode.active = !1;
                    a.shaderUtils.setNodeGray(this.itemNode);
                    var o = this;
                    this.roleImg.loadHandle = function() {
                        o.roleSp = o.roleImg.getComponentInChildren(
                            sp.Skeleton
                        );
                        o.roleSp.animation = "";
                        a.shaderUtils.setNodeGray(o.roleImg.node);
                    };
                    this.redNode.active = !1;
                }
            }
            t.spec[0]
                ? (this.icon_1.url = r.uiHelps.getLangSp(t.spec[0]))
                : (this.icon_1.node.active = !1);
            t.spec[1]
                ? (this.icon_2.url = r.uiHelps.getLangSp(t.spec[1]))
                : (this.icon_2.node.active = !1);
            this.isGuideID && this.setGuideId();
            this.btnXianYun &&
                (this.btnXianYun.active = l.xianyunProxy.isXianYun(t.heroid));
        };
        e.prototype.onClickItem = function() {
            if (l.servantProxy.getHeroData(this.heroSys.heroid)) {
                s.utils.openPrefabView("servant/ServantView", !1, {
                    hero: this.heroSys,
                    tab: 4
                });
                s.utils.closeNameView("servant/ServantListView", !1);
            } else
                s.utils.openPrefabView("servant/ServantInfo", !1, this.heroSys);
        };
        e.prototype.setGuideId = function() {
            var t = this.node.getComponentInChildren(_.default),
                e = this._data;
            t && e && (t.key = e.heroid.toString());
        };
        e.prototype.onClickXianYun = function() {
            var t = l.xianyunProxy.getDeskInfoByHid(this.heroSys.heroid);
            if (t) {
                var e = l.xianyunProxy.getDeskInfo(t.id);
                if (e && 0 != e.cd.next && 0 != e.hid)
                    if (s.timeUtil.second >= e.cd.next)
                        s.utils.showConfirm(
                            i18n.t("XIAN_YUN_YI_GUI_LAI_ZHAO_HUI"),
                            function() {
                                l.xianyunProxy.sendZhaohui(t.id, 0);
                            }
                        );
                    else {
                        var o = e.cd.next - s.timeUtil.second,
                            i = Math.ceil(o / 86400),
                            n = l.xianyunProxy.recall.cash * i;
                        s.utils.showConfirmItem(
                            i18n.t("XIAN_YUN_TI_QIAN_TXT", {
                                num: n
                            }),
                            1,
                            l.playerProxy.userData.cash,
                            function() {
                                l.playerProxy.userData.cash < n
                                    ? s.alertUtil.alertItemLimit(1)
                                    : l.xianyunProxy.sendZhaohui(t.id, 1);
                            }
                        );
                    }
                else s.utils.openPrefabView("xianyun/XianYunSelect");
            }
        };
        __decorate([p(n.default)], e.prototype, "icon_1", void 0);
        __decorate([p(n.default)], e.prototype, "icon_2", void 0);
        __decorate([p([cc.SpriteFrame])], e.prototype, "iconArr", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([p(n.default)], e.prototype, "roleImg", void 0);
        __decorate([p(cc.Sprite)], e.prototype, "mask", void 0);
        __decorate([p([cc.Button])], e.prototype, "buttons", void 0);
        __decorate([p(cc.Label)], e.prototype, "lblLv", void 0);
        __decorate([p(cc.Node)], e.prototype, "iconNode", void 0);
        __decorate([p(cc.Node)], e.prototype, "itemNode", void 0);
        __decorate([p(c.default)], e.prototype, "starShow", void 0);
        __decorate([p(cc.Node)], e.prototype, "redNode", void 0);
        __decorate([p(cc.Node)], e.prototype, "leader", void 0);
        __decorate([p(cc.Node)], e.prototype, "btnXianYun", void 0);
        __decorate([p], e.prototype, "isGuideID", void 0);
        return (e = __decorate([u], e));
    })(i.default);
o.default = h;
