var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./RedDot"),
    n = require("../utils/UIUtils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.binding = [];
            e.context = "";
            e.lblContext = null;
            e._isShow = !1;
            return e;
        }
        o = e;
        e.prototype.onLoad = function() {
            facade.subscribe("RED_DOT", this.updateData, this, !1);
            this.node.active = !1;
            o.addShow(this);
            this.updateData(null);
        };
        e.prototype.onDestroy = function() {
            this.unscheduleAllCallbacks();
            facade.remove(this);
            o.removeShow(this);
        };
        e.prototype.updateData = function(t) {
            var e = this.binding;
            if (null == t || -1 != e.indexOf(t)) {
                for (var n = e.length, l = 0; l < n; l++)
                    if (i.default._MAP[e[l].toString()]) {
                        this._isShow = !0;
                        o.showNext();
                        return;
                    }
                this._isShow = !1;
            }
        };
        e.prototype.playShow = function() {
            o._isShow = !0;
            this.node.active = !0;
            this.lblContext.string = "";
            n.uiUtils.showText(this.lblContext, i18n.t(this.context));
            this.scheduleOnce(this.playNextShow, 3);
        };
        e.prototype.playNextShow = function() {
            o._isShow = !1;
            this.node.active = !1;
            o.showNext();
        };
        e.addShow = function(t) {
            for (var e = -1, i = 0; i < o._showList.length; i++)
                if (
                    null != o._showList[i] &&
                    t.__name == o._showList[i].__name
                ) {
                    o._showList[i] = null;
                    e = i;
                    break;
                }
            if (-1 == e) {
                o._showList.push(t);
                o.showNext();
            }
        };
        e.removeShow = function(t) {
            if (null != t) {
                t.node.active && (o._isShow = !1);
                for (var e = 0; e < o._showList.length; e++)
                    if (
                        null != o._showList[e] &&
                        t.__name == o._showList[e].__name
                    ) {
                        o._showList[e] = null;
                        break;
                    }
                var i = [];
                for (e = 0; e < o._showList.length; e++)
                    null != o._showList[e] && i.push(o._showList[e]);
                o._showList = i;
            }
        };
        e.showNext = function() {
            if (!o._isShow && 0 != o._showList.length) {
                o._curIndex++;
                o._curIndex =
                    o._showList.length <= o._curIndex ? 0 : o._curIndex;
                var t = o._showList[o._curIndex];
                if (t && t._isShow) t.playShow();
                else {
                    for (var e = o._curIndex + 1; e < o._showList.length; e++)
                        if ((t = o._showList[e])._isShow) {
                            o._curIndex = e;
                            t.playShow();
                        }
                    if (!t._isShow)
                        for (e = 0; e < o._showList.length; e++)
                            if ((t = o._showList[e])._isShow) {
                                o._curIndex = e;
                                t.playShow();
                            }
                }
            }
        };
        e.clearData = function() {
            o._showList = [];
            o._isShow = !1;
            o._curIndex = 0;
        };
        e._showList = [];
        e._isShow = !1;
        e._curIndex = 0;
        __decorate([a([cc.String])], e.prototype, "binding", void 0);
        __decorate([a], e.prototype, "context", void 0);
        __decorate([a(cc.Label)], e.prototype, "lblContext", void 0);
        return (e = o = __decorate([r], e));
        var o;
    })(cc.Component);
o.default = s;
