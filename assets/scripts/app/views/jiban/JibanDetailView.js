var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/Utils"),
    r = require("../../component/JiBanShow"),
    a = require("../../utils/UIUtils"),
    s = require("../../Initializer"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.itemList = null;
            e.spec_1 = null;
            e.spec_2 = null;
            e.roleUrl = null;
            e.nameUrl = null;
            e.lblJbValue = null;
            e.jibanShow = null;
            e.tipNode = null;
            e._obj = null;
            e._curId = 0;
            e._curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("STORY_SELECT", this.storyEnd, this);
            facade.subscribe("STORY_END", this.storyEnd, this);
            facade.subscribe(s.jibanProxy.UPDATE_JIBAN, this.showData, this);
            this._obj = this.node.openParam;
            this.showData();
        };
        e.prototype.showData = function() {
            if (this._obj.heroid) {
                this._curId = this._obj.heroid;
                var t = s.jibanProxy.getHeroJbLv(this._curId),
                    e = localcache.getItem(localdb.table_hero, this._curId);
                this.spec_1.url = a.uiHelps.getLangSp(e.spec[0]);
                e.spec.length > 1 &&
                    (this.spec_2.url = a.uiHelps.getLangSp(e.spec[1]));
                this.spec_2.node.active = e.spec.length > 1;
                this.roleUrl.url = a.uiHelps.getServantSpine(this._curId);
                this.nameUrl.url = a.uiHelps.getStoryRoleName(this._curId);
                var o = s.jibanProxy.getHeroJbLv(this._curId).level % 1e3,
                    i = s.jibanProxy.getHeroNextJb(this._curId, o),
                    n = s.jibanProxy.getHeroJbLv(this._curId),
                    l = s.jibanProxy.getHeroJB(this._curId);
                this.lblJbValue.string = i18n.t("COMMON_NUM", {
                    f: l,
                    s: i ? i.yoke : n.yoke
                });
                this.jibanShow.setValue(5, t.level % 1e3);
                this.itemList.data = s.jibanProxy.getJbItemList(this._curId);
                this.tipNode.active =
                    0 == s.jibanProxy.getJbItemList(this._curId).length;
            }
        };
        e.prototype.onClick = function(t, e) {
            var o = e.data,
                i = localcache.getItem(localdb.table_heropve, o.id);
            this._curData = i;
            if (i)
                if (l.stringUtil.isBlank(i.storyId)) {
                    this.storyEnd();
                    l.alertUtil.alert18n("SERVANT_JIBAN_STORY_NOT_FIND");
                } else if (
                    !l.stringUtil.isBlank(i.storyId) &&
                    s.playerProxy.getStoryData(i.storyId)
                ) {
                    s.playerProxy.addStoryId(i.storyId);
                    l.utils.openPrefabView("StoryView", !1, {
                        type: s.jibanProxy.isOverStory(i.id) ? 3 : 0
                    });
                }
        };
        e.prototype.storyEnd = function() {
            var t = this._curData;
            null != t &&
                (s.jibanProxy.isOverStory(t.id) ||
                    s.jibanProxy.saveHeroStory(t.id));
        };
        e.prototype.onClickClose = function() {
            l.utils.closeView(this, !0);
        };
        __decorate([d(i.default)], e.prototype, "itemList", void 0);
        __decorate([d(n.default)], e.prototype, "spec_1", void 0);
        __decorate([d(n.default)], e.prototype, "spec_2", void 0);
        __decorate([d(n.default)], e.prototype, "roleUrl", void 0);
        __decorate([d(n.default)], e.prototype, "nameUrl", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblJbValue", void 0);
        __decorate([d(r.default)], e.prototype, "jibanShow", void 0);
        __decorate([d(cc.Node)], e.prototype, "tipNode", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
