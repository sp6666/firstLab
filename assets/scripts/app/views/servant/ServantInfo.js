var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../Initializer"),
    l = require("../../utils/UIUtils"),
    r = require("../../component/List"),
    a = require("../../utils/Utils"),
    s = require("../../component/JiBanShow"),
    c = require("./ServantStarShow"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblTotal = null;
            e.lblGet = null;
            e.roleImg = null;
            e.ep1 = null;
            e.ep2 = null;
            e.ep3 = null;
            e.ep4 = null;
            e.luckImg = null;
            e.lblJiBan = null;
            e.lblHuoQu = null;
            e.starShow = null;
            e.lblTitle = null;
            e.list = null;
            e.tablentNode = null;
            e.lblZz = null;
            e.obj = {
                p1: 0,
                p2: 0,
                p3: 0,
                p4: 0
            };
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("UPDATE_HERO_JB", this.updateJiban, this);
            var t = this.node.openParam;
            if (t) {
                this.lblName.string = t.name;
                this.lblGet.string = t.txt ? t.txt : "";
                this.roleImg.url = l.uiHelps.getServantSmallSpine(t.heroid);
                for (var e = 0, o = 0; o < t.skills.length; o++) {
                    var i = localcache.getItem(
                        localdb.table_epSkill,
                        t.skills[o].id
                    );
                    this.obj["p" + i.ep] += 10 * i.star;
                    e += i.star;
                }
                this.lblTotal.string = i18n.t("SERVANT_PROP_TOTAL", {
                    value: e
                });
                this.ep1.string = this.obj.p1 + "";
                this.ep2.string = this.obj.p2 + "";
                this.ep3.string = this.obj.p3 + "";
                this.ep4.string = this.obj.p4 + "";
                var r = n.jibanProxy.getHeroJbLv(t.heroid).level % 1e3;
                this.luckImg.setValue(5, r);
                var a = n.jibanProxy.getHeroNextJb(t.heroid, r);
                this.lblJiBan.string =
                    n.jibanProxy.getHeroJB(t.heroid) + "/" + a.yoke;
                this.lblHuoQu.string = t.unlock;
                this.starShow.setValue(t.star);
                var s = n.servantProxy.getHeroData(t.heroid);
                this.lblTitle.string = s
                    ? i18n.t("WIFE_WEI_YI_JIE_SHI")
                    : i18n.t("WIFE_WEI_JIE_SHI");
                var c = [],
                    _ = 0;
                for (o = 0; o < t.skills.length; o++) {
                    i = localcache.getItem(
                        localdb.table_epSkill,
                        t.skills[o].id
                    );
                    var d = {};
                    d.id = i.sid;
                    d.level = d.hlv = 0;
                    _ += i.star;
                    c.push(d);
                }
                this.list.data = c;
                this.lblZz.string = i18n.t("SERVANT_TALENT") + _;
            }
        };
        e.prototype.updateJiban = function() {
            var t = this.node.openParam,
                e = n.jibanProxy.getHeroJbLv(t.heroid).level % 1e3;
            this.luckImg.setValue(5, e);
            var o = n.jibanProxy.getHeroNextJb(t.heroid, e);
            this.lblJiBan.string =
                n.jibanProxy.getHeroJB(t.heroid) + "/" + o.yoke;
        };
        e.prototype.onClickClose = function() {
            a.utils.closeView(this);
        };
        e.prototype.onClickGift = function() {
            var t = this.node.openParam;
            n.servantProxy.curSelectId = t.heroid;
            a.utils.openPrefabView("servant/ServantGiftView");
        };
        e.prototype.onClickLook = function() {
            this.tablentNode.active = !0;
        };
        e.prototype.onCloseTablent = function() {
            this.tablentNode.active = !1;
        };
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTotal", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblGet", void 0);
        __decorate([u(i.default)], e.prototype, "roleImg", void 0);
        __decorate([u(cc.Label)], e.prototype, "ep1", void 0);
        __decorate([u(cc.Label)], e.prototype, "ep2", void 0);
        __decorate([u(cc.Label)], e.prototype, "ep3", void 0);
        __decorate([u(cc.Label)], e.prototype, "ep4", void 0);
        __decorate([u(s.default)], e.prototype, "luckImg", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblJiBan", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblHuoQu", void 0);
        __decorate([u(c.default)], e.prototype, "starShow", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([u(r.default)], e.prototype, "list", void 0);
        __decorate([u(cc.Node)], e.prototype, "tablentNode", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblZz", void 0);
        return (e = __decorate([d], e));
    })(cc.Component);
o.default = p;
