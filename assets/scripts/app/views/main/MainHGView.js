var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../Initializer"),
    n = require("../../component/ChildSpine"),
    l = require("../../utils/Utils"),
    r = require("../../models/TimeProxy"),
    a = require("../../utils/UIUtils"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.nodeChild = null;
            e.nodeWife = null;
            e.nodeMarry = null;
            e.nodeLilian = null;
            e.childSpine = null;
            e.scrollView = null;
            e.title_Marry = null;
            e.title_Lilian = null;
            e.title_Child = null;
            e.title_Wife = null;
            e._lastX = 999;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                i.sonProxy.UPDATE_SON_INFO,
                this.onSonUpdate,
                this
            );
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onCheckClost, this);
            this.onSonUpdate();
            a.uiUtils.floatPos(this.title_Marry, 0, 10, 2);
            a.uiUtils.floatPos(this.title_Lilian, 0, 10, 4);
            a.uiUtils.floatPos(this.title_Child, 0, 10, 2);
            a.uiUtils.floatPos(this.title_Wife, 0, 10, 4);
        };
        e.prototype.onClickOpen = function(t, e) {
            r.funUtils.openViewUrl(e);
        };
        e.prototype.onCheckClost = function() {
            var t = Math.abs(this.scrollView.getScrollOffset().x);
            Math.abs(this.scrollView.getScrollOffset().x) < 10 &&
                this._lastX < 10 &&
                this.onClickClost();
            this._lastX = t;
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this, !0);
        };
        e.prototype.onSonUpdate = function() {
            var t = i.sonProxy.childList;
            this.nodeLilian.active = t && t.length > 0;
            if (t.length > 0) {
                for (var e = t[0], o = 0; o < t.length; o++)
                    if (i.sonProxy.isTraveling(t[o].id)) {
                        e = t[o];
                        break;
                    }
                e.state > 3
                    ? this.childSpine.setKid(e.id, e.sex)
                    : this.childSpine.setKid(e.id, e.sex, !1);
            }
        };
        __decorate([_(cc.Node)], e.prototype, "nodeChild", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeWife", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeMarry", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeLilian", void 0);
        __decorate([_(n.default)], e.prototype, "childSpine", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scrollView", void 0);
        __decorate([_(cc.Node)], e.prototype, "title_Marry", void 0);
        __decorate([_(cc.Node)], e.prototype, "title_Lilian", void 0);
        __decorate([_(cc.Node)], e.prototype, "title_Child", void 0);
        __decorate([_(cc.Node)], e.prototype, "title_Wife", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
