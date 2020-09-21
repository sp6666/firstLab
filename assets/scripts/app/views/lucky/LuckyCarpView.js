var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    r = require("../../utils/UIUtils"),
    a = require("../../Config"),
    s = require("../../utils/ApiUtils"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.btns = [];
            e.nodeOver = [];
            e.nodeStart = [];
            e.lblName = null;
            e.lblSTime = null;
            e.lblETime = null;
            e.lblRTime = null;
            e.lblType = null;
            e.nodeRwd = null;
            e.nodeShare = null;
            e.nodeLook = null;
            e.nodeRand = null;
            e.rwd = null;
            e._curIndex = 0;
            return e;
        }
        e.prototype.onLoad = function() {
            var t = l.luckyCarpProxy.share;
            (null != t && null != t.stage) ||
                l.limitActivityProxy.sendLookActivityData(
                    l.limitActivityProxy.LUCKY_CARP
                );
            facade.subscribe(
                l.luckyCarpProxy.UPDATE_LUCKY_CARP,
                this.udpateShow,
                this
            );
            this.udpateShow();
        };
        e.prototype.udpateShow = function() {
            var t = l.luckyCarpProxy.share;
            if (t && t.stage) {
                var e = t.info.eTime,
                    o = this;
                r.uiUtils.countDown(e, this.lblRTime, function() {
                    o.lblRTime.string = i18n.t("KUAYAMEN_HD_END");
                });
                this.onClickBtn(null, t.current + "");
                for (var i = 0; i < this.nodeOver.length; i++) {
                    this.nodeOver[i].active = t.current - 1 > i;
                    this.nodeStart[i].active = t.current - 1 == i;
                }
            }
        };
        e.prototype.onClickBtn = function(t, e) {
            var o = parseInt(e);
            this._curIndex = o - 1;
            for (
                var i = l.luckyCarpProxy.share, n = i.stage[o - 1], r = 0;
                r < this.btns.length;
                r++
            )
                this.btns[r].interactable = o - 1 != r;
            this.nodeShare.active = o == i.current && o != i.stage.length;
            this.rwd.node.active = o != i.stage.length;
            this.nodeRwd.active = o == i.stage.length;
            this.nodeRand.active =
                this.nodeRwd.active && this._curIndex < i.current;
            this.lblName.string =
                o == i.stage.length
                    ? i18n.t("LUCKY_CARP_TIME4")
                    : i18n.t("LUCKY_CARP_TIP", {
                          d: i18n.t("LUCKY_CARP_TIME" + o)
                      });
            this.lblSTime.string = n ? n.stime : "";
            this.lblETime.string = n ? n.etime : "";
            this.rwd.data = n ? n.rwd : null;
            this.rwd.node.x = -this.rwd.node.width / 2;
            this.lblType.string =
                o == i.stage.length
                    ? i18n.t("LUCKY_CARP_RULE2")
                    : i18n.t("LUCKY_CARP_RULE");
            this.nodeLook.active =
                this._curIndex < i.current && !this.nodeRand.active;
        };
        e.prototype.onClickLook = function() {
            var t = l.luckyCarpProxy.share.stage[this._curIndex];
            if (null != t.url) {
                var e = t.url;
                e = (e = (e = (e = e.replace(
                    "%{uid}",
                    l.playerProxy.userData.uid + ""
                )).replace("%{pf}", a.Config.pf)).replace(
                    "%{name}",
                    encodeURI(l.playerProxy.userData.name)
                )).replace("%{serverid}", a.Config.serId + "");
                cc.sys.openURL(e);
            }
        };
        e.prototype.onClickShare = function() {
            if (a.Config.version_code < a.Config.target_version_code)
                s.apiUtils.open_download_url();
            else {
                var t = l.luckyCarpProxy.share,
                    e = t.stage[this._curIndex];
                if (null != e.url) {
                    var o =
                        l.playerProxy.userData.uid +
                        a.Config.serId +
                        a.Config.pf +
                        t.sign;
                    o = MD5.md5(o);
                    var i = e.share;
                    i = (i = (i = (i = (i = i.replace(
                        "%{uid}",
                        l.playerProxy.userData.uid + ""
                    )).replace("%{pf}", a.Config.pf)).replace(
                        "%{sign}",
                        o
                    )).replace(
                        "%{name}",
                        encodeURI(l.playerProxy.userData.name)
                    )).replace("%{serverid}", a.Config.serId + "");
                    s.apiUtils.share_game2(
                        "",
                        i18n.t("LUCKY_CARP_SHARD_DES"),
                        i18n.t("LUCKY_CARP_SHARD_TITLE"),
                        i,
                        t.sharepicture
                    );
                }
            }
        };
        e.prototype.onClickClost = function() {
            n.utils.closeView(this);
        };
        __decorate([d([cc.Button])], e.prototype, "btns", void 0);
        __decorate([d([cc.Node])], e.prototype, "nodeOver", void 0);
        __decorate([d([cc.Node])], e.prototype, "nodeStart", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblSTime", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblETime", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblRTime", void 0);
        __decorate([d(cc.Label)], e.prototype, "lblType", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeRwd", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeShare", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeLook", void 0);
        __decorate([d(cc.Node)], e.prototype, "nodeRand", void 0);
        __decorate([d(i.default)], e.prototype, "rwd", void 0);
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
