var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../Initializer"),
    l = require("../../component/List"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.jiaList = null;
            e.guanList = null;
            e.btnJuban = null;
            e.btnJinru = null;
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe("JIU_LOU_TYPE_CHANGE", this.onYhType, this);
            facade.subscribe("JIU_LOU_YH_LIST", this.onYhList, this);
            facade.subscribe("UI_TOUCH_MOVE_LEFT", this.onClickClose, this);
            n.jiulouProxy.sendJlInfo();
            this.onYhList();
            this.jiaList.selectHandle = function(t) {
                var e = t;
                if (e) {
                    n.jiulouProxy.selectData = e;
                    n.jiulouProxy.sendYhGo(e.uid);
                }
            };
        };
        e.prototype.onClickEnter = function() {
            n.jiulouProxy.yhType &&
                (0 == n.jiulouProxy.yhType.type
                    ? i.utils.openPrefabView("jiulou/JiulouCreate")
                    : i.utils.showConfirm(
                          i18n.t("JIU_LOU_INTO_MYSELF"),
                          function() {
                              n.jiulouProxy.selectData = null;
                              n.jiulouProxy.sendYhGo(
                                  n.playerProxy.userData.uid
                              );
                          }
                      ));
        };
        e.prototype.onClickBianHao = function() {
            i.utils.openPrefabView("jiulou/JiulouFindView");
        };
        e.prototype.onClickRank = function() {
            n.jiulouProxy.sendJlRank();
        };
        e.prototype.onClickShop = function() {
            i.utils.openPrefabView("jiulou/JiulouExchange");
        };
        e.prototype.onYhType = function() {
            this.btnJuban.active = 0 == n.jiulouProxy.yhType.type;
            this.btnJinru.active = 0 != n.jiulouProxy.yhType.type;
        };
        e.prototype.onClickXiaoXi = function() {
            i.utils.openPrefabView("jiulou/JiulouLog");
        };
        e.prototype.onYhList = function() {
            this.jiaList.data = n.jiulouProxy.yhList;
        };
        e.prototype.onClickClose = function() {
            i.utils.closeView(this);
        };
        __decorate([s(l.default)], e.prototype, "jiaList", void 0);
        __decorate([s(l.default)], e.prototype, "guanList", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnJuban", void 0);
        __decorate([s(cc.Node)], e.prototype, "btnJinru", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
