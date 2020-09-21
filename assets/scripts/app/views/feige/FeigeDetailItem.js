var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/UrlLoad"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../component/ChildSpine"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblContext = [];
            e.lblTitle = null;
            e.model = null;
            e.wife = null;
            e.childSpine = null;
            e.childSpineSmall = null;
            return e;
        }
        o = e;
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                var e = r.playerProxy.getEmailData(t.id);
                if (e) {
                    for (
                        var o = localcache.getItem(
                                localdb.table_emailgroup,
                                e.group
                            ),
                            i = t.select,
                            n =
                                0 == i
                                    ? e.context
                                    : i == e.award1
                                    ? e.text1
                                    : e.text2,
                            a = this.getLabels(n),
                            s = 0;
                        s < this.lblContext.length;
                        s++
                    )
                        this.lblContext[s].string = a.length > s ? a[s] : "";
                    if (0 == i)
                        switch (o.fromtype) {
                            case 1:
                                localcache.getItem(localdb.table_hero, o.heroid)
                                    .name;
                                this.wife && (this.wife.node.active = !1);
                                if (this.model) {
                                    this.model.node.active = !0;
                                    this.model.url = l.uiHelps.getServantSmallSpine(
                                        o.heroid
                                    );
                                }
                                break;

                            case 2:
                                var c = localcache.getItem(
                                    localdb.table_wife,
                                    o.heroid
                                );
                                r.playerProxy.getWifeName(o.heroid);
                                this.model && (this.model.node.active = !1);
                                if (this.wife) {
                                    this.wife.node.active = !0;
                                    this.wife.url = l.uiHelps.getWifeSmallBody(
                                        c.res
                                    );
                                }
                                break;

                            case 3:
                                var _ = r.sonProxy.getSon(
                                    r.feigeProxy.sonFeigeData.sid
                                );
                                _.state > 3
                                    ? this.childSpine.setKid(_.id, _.sex)
                                    : this.childSpineSmall.setKid(
                                          _.id,
                                          _.sex,
                                          !1
                                      );
                        }
                }
            }
        };
        e.prototype.getLabels = function(t) {
            for (
                var e = [],
                    i = (t = r.playerProxy.getReplaceName(t)).split("\n"),
                    n = 0;
                n < i.length;
                n++
            ) {
                var l = 0,
                    a = i[n].length;
                if (a < o.countMax) e.push(i[n]);
                else
                    for (; l < a; ) {
                        e.push(
                            i[n].substr(
                                l,
                                a - l > o.countMax ? o.countMax : a - l
                            )
                        );
                        l += o.countMax;
                    }
            }
            return e;
        };
        e.countMax = 11;
        __decorate([_([cc.Label])], e.prototype, "lblContext", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblTitle", void 0);
        __decorate([_(n.default)], e.prototype, "model", void 0);
        __decorate([_(n.default)], e.prototype, "wife", void 0);
        __decorate([_(a.default)], e.prototype, "childSpine", void 0);
        __decorate([_(a.default)], e.prototype, "childSpineSmall", void 0);
        return (e = o = __decorate([c], e));
        var o;
    })(i.default);
o.default = d;
