var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../models/TimeProxy"),
    r = require("../../Config"),
    a = require("../../utils/UIUtils"),
    s = require("../../utils/ShaderUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.scroll = null;
            e.nodeBook = null;
            e.nodeKit = null;
            e.nodeYanhui = null;
            e.nodeXianli = null;
            e.nodeTianlao = null;
            e.nodeQifu = null;
            e.nodeUnion = null;
            e.nodeGongdou = null;
            e.nodeFlower = null;
            e.nodeWishingtree = null;
            e.nodeFengxianDian = null;
            e.nodeInfo = null;
            e.lblName = null;
            e.lblDes = null;
            e.lblUnlock = null;
            e.nodeXianYun = null;
            e.nodeLiuGong = null;
            e._lastX = 999;
            e._curGoId = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            this.scroll.content.height > r.Config.showHeight + 120 &&
                (this.scroll.content.height = r.Config.showHeight + 120);
            n.bookProxy.updateRed();
            n.kitchenProxy.updateDot();
            n.flowerProxy.updateRed();
            this.setItemShow(this.nodeBook, 2, l.funUtils.bookView);
            this.setItemShow(this.nodeKit, 3, l.funUtils.kitchenView);
            this.setItemShow(this.nodeYanhui, 2, l.funUtils.jiulouView);
            this.setItemShow(this.nodeXianli, 3, l.funUtils.xianli);
            this.setItemShow(this.nodeTianlao, 2, l.funUtils.prisonView);
            this.setItemShow(this.nodeQifu, 3, l.funUtils.qifu);
            this.setItemShow(this.nodeUnion, 2, l.funUtils.unionView);
            this.setItemShow(this.nodeGongdou, 3, l.funUtils.yamenView);
            this.setItemShow(this.nodeFlower, 3, l.funUtils.flower);
            this.setItemShow(this.nodeWishingtree, 2, l.funUtils.wishingTree);
            this.setItemShow(this.nodeXianYun, 2, l.funUtils.xianyun);
            this.setItemShow(this.nodeFengxianDian, 2, l.funUtils.fengxiandian);
            this.setItemShow(this.nodeLiuGong, 2, l.funUtils.liugong);
            this.nodeInfo.active = !1;
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onCheckClost, this);
            if (n.unionProxy.memberInfo && n.unionProxy.memberInfo.cid) {
                n.unionProxy.sendGetMemberInfo(n.unionProxy.memberInfo.cid);
                !n.unionProxy.memberInfo ||
                    (1 != n.unionProxy.memberInfo.post &&
                        2 != n.unionProxy.memberInfo.post) ||
                    n.unionProxy.sendApplyList();
            }
        };
        e.prototype.onCheckClost = function() {
            var t = Math.abs(this.scroll.getScrollOffset().x);
            Math.abs(this.scroll.getScrollOffset().x) < 10 &&
                this._lastX < 10 &&
                this.onClickClost();
            this._lastX = t;
        };
        e.prototype.setItemShow = function(t, e, o) {
            l.funUtils.isOpenFun(o)
                ? a.uiUtils.floatPos(t.node, 0, 10, e)
                : s.shaderUtils.setNodeGray(t.node);
        };
        e.prototype.onClickGo = function() {
            if (0 != this._curGoId) {
                var t = localcache.getItem(
                    localdb.table_iconOpen,
                    this._curGoId
                );
                if (null != t && l.funUtils.isOpen(t)) {
                    l.funUtils.openView(this._curGoId);
                    this.onClickClost();
                } else i.alertUtil.alert(t.errmsg);
            }
        };
        e.prototype.onClickTab = function(t, e) {
            if (i.stringUtil.isBlank(e)) {
                this.nodeInfo.active = !1;
                "0" != e && i.alertUtil.alert(i18n.t("MAIN_FUN_UNOPEN"));
            } else {
                if (l.funUtils.isCanOpenViewUrl(e))
                    if ("union/UnionView" == e) n.unionProxy.enterUnion();
                    else {
                        this.nodeInfo.active = !1;
                        l.funUtils.openViewUrl(e + "");
                    }
                else {
                    var o = l.funUtils.getOpenFun(e);
                    this.nodeInfo.active = null != o;
                    this.lblDes.string = o.text;
                    this.lblUnlock.string = o.errmsg;
                    this.lblName.string = o.title;
                    this._curGoId = o.way;
                    var a = t.target;
                    if (a) {
                        var s = a.node;
                        null == s && (s = a);
                        if (s) {
                            var c = i.utils.getWorldPos(s, this.node);
                            facade.send("GUIDE_MOVE_ITEM", c.x);
                        }
                    }
                    r.Config.DEBUG && l.funUtils.openViewUrl(e + "");
                }
            }
        };
        e.prototype.onClickUnion = function() {
            l.funUtils.isOpenFun(l.funUtils.unionView) &&
                n.unionProxy.enterUnion();
        };
        e.prototype.onClickMail = function() {
            n.mailProxy.sendGetMail();
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this, !0);
        };
        e.prototype.onClickAcademy = function() {
            n.academyProxy.info.ruid && 0 != n.academyProxy.info.ruid
                ? n.academyProxy.sendInto(n.academyProxy.info.ruid)
                : n.academyProxy.sendRefreshList();
        };
        __decorate([d(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeBook", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeKit", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeYanhui", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeXianli", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeTianlao", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeQifu", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeUnion", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeGongdou", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeFlower", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeWishingtree", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeFengxianDian", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeInfo", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblUnlock", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeXianYun", void 0);
        __decorate([d(cc.Button)], e.prototype, "nodeLiuGong", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
