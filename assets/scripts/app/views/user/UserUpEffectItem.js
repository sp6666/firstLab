var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../component/List"),
    l = cc._decorator,
    r = l.ccclass,
    a = l.property,
    s = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.list = null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this._data;
            if (t) {
                this.lblName.string = t.name;
                var e = [],
                    o = localcache.getGroup(
                        localdb.table_jyBase,
                        "guanid",
                        t.id
                    ),
                    i = {};
                if (o) {
                    for (var n = 0; n < o.length; n++) i[o[n].type] = o[n].name;
                    e.push({
                        context: i18n.t("USER_QINAN_GOLD", {
                            n: t.qingAn
                        })
                    });
                    e.push({
                        context: i18n.t("USER_SP_TIP4", {
                            n: t.max_zw
                        })
                    });
                    t.pray > 0 &&
                        e.push({
                            context: i18n.t("USER_SP_TIP5", {
                                n: t.max_zw
                            })
                        });
                    e.push({
                        context: i18n.t("USER_SP_TIPSP", {
                            n: i[2],
                            c: t.max_jy
                        })
                    });
                    e.push({
                        context: i18n.t("USER_SP_TIPSP", {
                            n: i[3],
                            c: t.max_jy
                        })
                    });
                    e.push({
                        context: i18n.t("USER_SP_TIPSP", {
                            n: i[4],
                            c: t.max_jy
                        })
                    });
                    this.list.data = e;
                } else {
                    e.push({
                        context: i18n.t("USER_QINAN_GOLD", {
                            n: t.qingAn
                        })
                    });
                    e.push({
                        context: i18n.t("USER_SP_TIP4", {
                            n: t.max_zw
                        })
                    });
                    e.push({
                        context: i18n.t("USER_SP_TIP1", {
                            n: t.max_jy
                        })
                    });
                    e.push({
                        context: i18n.t("USER_SP_TIP2", {
                            n: t.max_jy
                        })
                    });
                    e.push({
                        context: i18n.t("USER_SP_TIP3", {
                            n: t.max_jy
                        })
                    });
                    t.pray > 0 &&
                        e.push({
                            context: i18n.t("USER_SP_TIP5", {
                                n: t.pray
                            })
                        });
                    this.list.data = e;
                }
            }
        };
        __decorate([a(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([a(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([r], e));
    })(i.default);
o.default = s;
