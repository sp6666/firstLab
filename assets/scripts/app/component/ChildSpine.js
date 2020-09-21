var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UrlLoad"),
    n = require("../utils/UIUtils"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.head = null;
            e.body = null;
            e.isSmall = !1;
            return e;
        }
        e.prototype.onLoad = function() {};
        e.prototype.setKid = function(t, e, o) {
            void 0 === o && (o = !0);
            var i = t % 5 == 0 ? 1 : t % 5,
                l = t % 5 == 0 ? 4 : 5 - (t % 5);
            if (this.isSmall) {
                this.head.url = o
                    ? n.uiHelps.getKidChengHead_2(i, e)
                    : n.uiHelps.getKidSmallHead_2(i, e);
                this.body.url = o
                    ? n.uiHelps.getKidChengBody_2(l, e)
                    : n.uiHelps.getKidSmallBody_2(l, e);
            } else {
                this.head.url = o
                    ? n.uiHelps.getKidChengHead(i, e)
                    : n.uiHelps.getKidSmallHead(i, e);
                this.body.url = o
                    ? n.uiHelps.getKidChengBody(l, e)
                    : n.uiHelps.getKidSmallBody(l, e);
            }
        };
        e.prototype.clearKid = function() {
            this.head.url = "";
            this.body.url = "";
        };
        e.prototype.setMarry = function(t, e) {
            var o = t % 5 == 0 ? 1 : t % 5;
            this.head.url = n.uiHelps.getKidChengHead(2 == e ? 0 : o, e);
            this.body.url = n.uiHelps.getKidMarryBody(e);
        };
        __decorate([a(i.default)], e.prototype, "head", void 0);
        __decorate([a(i.default)], e.prototype, "body", void 0);
        __decorate(
            [
                a({
                    tooltip: "是否使用小套资源"
                })
            ],
            e.prototype,
            "isSmall",
            void 0
        );
        return (e = __decorate([r], e));
    })(cc.Component);
o.default = s;
