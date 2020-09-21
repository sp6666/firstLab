var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RoleSpine"),
    n = require("../../utils/Utils"),
    l = require("../../component/UrlLoad"),
    ll = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblId = null;
            e.lblName = null;
            e.lblGuan = null;
            e.lblScore = null;
            e.roleSpine = null;
            e.bgUrl = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = this.node.openParam;
            if (null != t) {
                var e = t.fuser;
                this.lblId.string = t.uid + "";
                this.lblName.string = e.name;
                this.roleSpine.setClothes(e.sex, e.job, e.level, e.clothe);
                this.bgUrl.node.active = 0 != e.clothe.background;
                if (this.bgUrl.node.active) {
                    var o = localcache.getItem(
                        localdb.table_userClothe,
                        e.clothe.background
                    );
                    o && (this.bgUrl.url = r.uiHelps.getStoryBg(o.model));
                }

                var gateId = 1;
                var gate = ll.clothePveProxy.info.gate;

                for(var idx = 0; idx < gate.length; idx ++) {
                    if(gate[idx].id == t.gate) {
                        gateId = gate[idx].gateid;
                        break;
                    }
                }

                var i = localcache.getItem(localdb.table_clothepve, gateId),
                    l = i18n.t("CLOTHE_PVE_GATE", {
                        d: n.utils.getHanzi(gateId)
                    });
                this.lblGuan.string = i18n.t("COMMON_ADD_2", {
                    n: l,
                    c: i.name
                });
                this.lblScore.string = i18n.t("CLOTHE_PVE_WIN_SCORE", {
                    d: t.score
                });
            }
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([c(cc.Label)], e.prototype, "lblId", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblGuan", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblScore", void 0);
        __decorate([c(i.default)], e.prototype, "roleSpine", void 0);
        __decorate([c(l.default)], e.prototype, "bgUrl", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
