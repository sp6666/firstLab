var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../utils/Utils"),
    n = require("./ChengHaoItem"),
    l = require("../../component/List"),
    r = require("../../Initializer"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.curChengHao = null;
            e.list = null;
            e.wuNode = null;
            e.chenghaoNode = null;
            e.btnDel = null;
            e.curChengHaoId = 0;
            e.chlist = [];
            return e;
        }
        e.prototype.onLoad = function() {
            facade.subscribe(
                r.chengHaoProxy.UPDATE_CHENGHAO_INFO,
                this.onChInfo,
                this
            );
            facade.subscribe(
                r.playerProxy.PLAYER_USER_UPDATE,
                this.updateCurrent,
                this
            );
            this.onChInfo();
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this, !0);
        };
        e.prototype.onOffChengHao = function() {
            this.curChengHaoId > 0
                ? r.chengHaoProxy.offChengHao(this.curChengHaoId)
                : i.alertUtil.alert18n("TITLE_RESET_LOSE");
        };
        e.prototype.onChInfo = function() {
            this.chlist = [];
            for (var t = 0; t < r.chengHaoProxy.chList.length; t++) {
                var e = r.chengHaoProxy.chList[t],
                    o = localcache.getItem(localdb.table_fashion, e.chid + "");
                null != o &&
                    (r.chengHaoProxy.isShow(o.show_time, o.show_avid) &&
                        this.chlist.push(e));
            }
            this.chlist.sort(r.chengHaoProxy.sortCh);
            this.list.data = this.chlist;
            this.updateCurrent();
        };
        e.prototype.updateCurrent = function() {
            var t = localcache.getItem(
                localdb.table_fashion,
                r.playerProxy.userData.chenghao
            );
            this.curChengHao.data = t;
            this.curChengHaoId = t ? t.id : 0;
            this.chenghaoNode.active = this.curChengHaoId > 0;
            this.wuNode.active = !this.chenghaoNode.active;
            this.list.data = this.chlist;
            this.btnDel.active = this.curChengHaoId > 0;
        };
        __decorate([c(n.default)], e.prototype, "curChengHao", void 0);
        __decorate([c(l.default)], e.prototype, "list", void 0);
        __decorate([c(cc.Node)], e.prototype, "wuNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "chenghaoNode", void 0);
        __decorate([c(cc.Node)], e.prototype, "btnDel", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
