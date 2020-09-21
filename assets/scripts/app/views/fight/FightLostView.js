var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("../../models/TimeProxy"),
    l = require("../../Initializer"),
    r = cc._decorator,
    a = r.ccclass,
    s = (r.property,
    (function(t) {
        __extends(e, t);
        function e() {
            return (null !== t && t.apply(this, arguments)) || this;
        }
        e.prototype.onLoad = function() {};
        e.prototype.onClickBtn = function(t, e) {
            switch (e) {
                case "0":
                    if (n.funUtils.isOpenFun(n.funUtils.servantView)) {
                        var o = l.servantProxy.getQishiSys();
                        i.utils.openPrefabView("servant/ServantView", !1, {
                            hero: o,
                            tab: 4
                        });
                    }
                    break;

                case "1":
                    n.funUtils.openView(n.funUtils.bagView.id);
                    break;

                case "2":
                    if (n.funUtils.isOpenFun(n.funUtils.servantView)) {
                        o = l.servantProxy.getQishiSys();
                        i.utils.openPrefabView("servant/ServantView", !1, {
                            hero: o,
                            tab: 1
                        });
                    }
                    break;

                case "3":
                    if (n.funUtils.isOpenFun(n.funUtils.wifeView)) {
                        var r = l.wifeProxy.getQishiWife(),
                            a = l.wifeProxy.getMarryList(!1).indexOf(r);
                        i.utils.openPrefabView("wife/WifeListView", null, {
                            index: a,
                            openSkill: !0
                        });
                    }
                    break;

                case "4":
                    n.funUtils.isOpenFun(n.funUtils.userClothe) &&
                        i.utils.openPrefabView("user/UserClothe", null, {
                            tab: 2
                        });
            }
            i.utils.closeNameView("battle/FightView");
            this.onClickClost(null, null, 1);
        };
        e.prototype.onClickClost = function(t, e, o) {
            void 0 === o && (o = 0);
            i.utils.closeView(this);
            facade.send("FIGHT_LOST_CLICK", o);
        };
        e.prototype.onClickDiKang = function() {
            this.onClickClost(null, null, 0);
        };
        return (e = __decorate([a], e));
    })(cc.Component));
o.default = s;
