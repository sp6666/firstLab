var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/UrlLoad"),
    n = require("../../component/List"),
    l = require("../../utils/UIUtils"),
    r = require("../../Initializer"),
    a = require("../../models/TimeProxy"),
    s = require("../../utils/Utils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.urlload = null;
            e.lblTip = null;
            e.list = null;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = "";
            if (r.playerProxy.heroShow > 200) {
                var e = localcache.getItem(
                    localdb.table_wife,
                    r.playerProxy.heroShow - 200
                );
                t = l.uiHelps.getWifeBody(e.res);
            } else t = l.uiHelps.getServantSpine(r.playerProxy.heroShow);
            this.urlload.url = t;
            for (
                var o = localcache.getList(localdb.table_heroGuan),
                    i = "",
                    n = localcache.getItem(
                        localdb.table_hero,
                        r.playerProxy.heroShow
                    ),
                    s = r.playerProxy.userData.level < 6 ? 1 : 2,
                    c = n ? n.disposition : 1,
                    _ = 0;
                _ < o.length;
                _++
            )
                if (s == o[_].status && c == o[_].disposition) {
                    var d =
                        r.jibanProxy.getHeroJbLv(r.playerProxy.heroShow).level %
                        1e3;
                    i = o[_]["yoke" + d];
                }
            this.lblTip.string = i;
            var u = [];
            a.funUtils.isOpenFun(a.funUtils.jingyingView) &&
                (r.jingyingProxy.coin.num > 0 ||
                    (r.jingyingProxy.army.num > 0 &&
                        r.jingyingProxy.food.num > 0)) &&
                u.push(a.funUtils.jingyingView);
            a.funUtils.isOpenFun(a.funUtils.zhengwuView) &&
                r.jingyingProxy.exp.cd.num > 0 &&
                u.push(a.funUtils.zhengwuView);
            a.funUtils.isOpenFun(a.funUtils.xunFangView) &&
                r.lookProxy.xfinfo.num > 0 &&
                u.push(a.funUtils.xunFangView);
            this.list.data = u;
            facade.subscribe("CLOSE_GUAN", this.onClickClost, this);
            this.onPlayVoice();
        };
        e.prototype.onClickClost = function() {
            if (s.utils.closeView(this)) {
                facade.send(r.guideProxy.UPDATE_TRIGGER_GUIDE, {
                    type: 3,
                    value: r.taskProxy.mainTask.id
                });
                if (
                    r.limitActivityProxy.isHaveTypeActive(
                        r.limitActivityProxy.SUPPORT_TYPE
                    )
                ) {
                    var t = r.limitActivityProxy.getActivityData(
                        r.limitActivityProxy.SUPPORT_ID
                    );
                    if (t && 1 == t.news) {
                        r.supportProxy.sendOpenYyhuodong(!0);
                        return;
                    }
                }
                r.timeProxy.getActivityNotice().length > 0
                    ? s.utils.openPrefabView("ActivityNotice")
                    : r.flowerProxy.showAutoShow();
            }
        };
        e.prototype.onPlayVoice = function() {
            if (r.confidanteProxy.info) {
                if(r.confidanteProxy.info.id > 0)
                {
                    var o = r.voiceProxy.randomHeroVoice(r.confidanteProxy.info.id);
                    if(o)
                    {
                        s.audioManager.playSound("servant/" + o.herovoice, !0, !0);
                    }
                    else{
                        var i = 0;
                    }
                }
            }
            else if (r.playerProxy.heroShow > 200) {
                var t = r.playerProxy.heroShow - 200,
                    e = r.voiceProxy.randomWifeVoice(t);
                e && s.audioManager.playSound("wife/" + e.wifevoice, !0, !0);
            } 
            else {
                var o = r.voiceProxy.randomHeroVoice(r.playerProxy.heroShow);
                o && s.audioManager.playSound("servant/" + o.herovoice, !0, !0);
            }
        };
        __decorate([d(i.default)], e.prototype, "urlload", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblTip", void 0);
        __decorate([d(n.default)], e.prototype, "list", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
