var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.nodeServant = null;
            e.nodeWife = null;
            e.nodeBg = null;
            e.title = null;
            e._curId = 0;
            e._curData = null;
            e._obj = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this._obj = this.node.openParam;
            this.updateShow();
            facade.subscribe("STORY_SELECT", this.storyEnd, this);
            facade.subscribe("STORY_END", this.storyEnd, this);
            facade.subscribe(l.jibanProxy.UPDATE_JIBAN, this.updateShow, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickBack, this);
        };
        e.prototype.updateShow = function() {
            var t = null;
            this.nodeServant.active = this.nodeWife.active = !1;
            if (this._obj.heroid) {
                this._curId = this._obj.heroid;
                t = l.jibanProxy.getJibanType(this._curId, 1);
                this.nodeServant.active = null == t || 0 == t.length;
                this.title.string = i18n.t("SERVANT_HERO");
            } else if (this._obj.wifeid) {
                this._curId = this._obj.wifeid;
                t = l.jibanProxy.getJibanType(this._curId, 2);
                this.nodeWife.active = null == t || 0 == t.length;
                this.title.string = i18n.t("WIFE_TIP");
            }
            this.nodeBg.active =
                this.nodeWife.active || this.nodeServant.active;
            this.list.data = t;
        };
        e.prototype.onClick = function(t, e) {
            var o = e.data,
                i = e;
            if (i && "" != i.lblJiban.string)
                n.alertUtil.alert(i.lblJiban.string);
            else {
                this._curData = o;
                if (o)
                    if (n.stringUtil.isBlank(o.storyId)) {
                        this.storyEnd();
                        n.alertUtil.alert18n("SERVANT_JIBAN_STORY_NOT_FIND");
                    } else if (
                        !n.stringUtil.isBlank(o.storyId) &&
                        l.playerProxy.getStoryData(o.storyId)
                    ) {
                        l.playerProxy.addStoryId(o.storyId);
                        n.utils.openPrefabView("StoryView", !1, {
                            type: l.jibanProxy.isOverStory(o.id) ? 3 : 0
                        });
                    }
            }
        };
        e.prototype.storyEnd = function() {
            var t = this._curData;
            null != t &&
                (l.jibanProxy.isOverStory(t.id) ||
                    l.jibanProxy.saveHeroStory(t.id));
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
            n.utils.closeNameView("jiban/JibanSelect", !0);
        };
        e.prototype.onClickBack = function() {
            n.utils.closeView(this);
        };
        __decorate([s(i.default)], e.prototype, "list", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeServant", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeWife", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeBg", void 0);
        __decorate([s(cc.Label)], e.prototype, "title", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
