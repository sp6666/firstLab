var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../component/List"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (t) {
                var e = localcache.getGroup(
                        localdb.table_wifeSkill,
                        "heroid",
                        t.id
                    ),
                    o = null;
                if (e && e.length > 0) {
                    var i = e[0].wid;
                    o = l.wifeProxy.getWifeData(i);
                }
                this.list.data = o
                    ? [
                          {
                              type: 1,
                              hero: t
                          },
                          {
                              type: 2,
                              hero: t
                          },
                          {
                              type: 3,
                              hero: t
                          },
                          {
                              type: 4,
                              hero: t
                          }
                      ]
                    : [
                          {
                              type: 1,
                              hero: t
                          },
                          {
                              type: 2,
                              hero: t
                          },
                          {
                              type: 3,
                              hero: t
                          }
                      ];
            }
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([s(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
