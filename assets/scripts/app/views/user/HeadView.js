var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("./UserHeadItem"),
    n = require("../../component/List"),
    l = require("../../utils/Utils"),
    r = require("../../Initializer"),
    a = require("../../Config"),
    s = cc._decorator,
    c = s.ccclass,
    _ = s.property,
    d = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblDes = null;
            e.headItem = null;
            e.list = null;
            e.scroll = null;
            e.nodeHead = null;
            e.nodeBlank = null;
            e._head = 1;
            e._blank = 1;
            e._curData = null;
            return e;
        }
        e.prototype.onLoad = function() {
            if (null != r.playerProxy.headavatar) {
                this._blank = r.playerProxy.headavatar.blank;
                var t = localcache.getItem(
                    localdb.table_userhead,
                    r.playerProxy.headavatar.head
                );
                this._head =
                    0 == r.playerProxy.headavatar.head ||
                    (t && 0 != t.job && t.job != r.playerProxy.userData.job)
                        ? r.playerProxy.userData.job + 1e4
                        : r.playerProxy.headavatar.head;
            } else this._head = r.playerProxy.userData.job + 1e4;
            this.onClickHead(null, -1);
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        e.prototype.onClickOk = function() {
            if(this._curData == null)
                return;

            if(null != this._curData.blankmodel)
            {
                //头像框
                null != localcache.getItem(localdb.table_userhead, this._head) &&
                (r.playerProxy.isHaveBlank(this._blank) ? r.playerProxy.sendHeadBlank(this._head, this._blank) : l.alertUtil.alert18n("USER_UNHAVE_BLANK"));
            }
            else{
                //头像
                null != localcache.getItem(localdb.table_userhead, this._head) &&
                (r.playerProxy.isHaveHead(this._head) ? r.playerProxy.sendHeadBlank(this._head, this._blank) : l.alertUtil.alert18n("USER_UNHAVE_AVATAR"));
            }
        };
        e.prototype.onClickHeadItem = function(t, e) {
            this._curData = e.data;
            var o = e.data;
            if (null != o.blankmodel) {
                this._blank = o.id;
                this.lblDes.string = o.des + "";
                this.lblName.string = o.name + "";
            } else this._head = o.id;
            this.headItem.setHead(this._head, this._blank);
        };
        e.prototype.onClickHead = function(t, e) {
            var o = parseInt(e);
            this.nodeHead.active = -1 == o;
            this.nodeBlank.active = 1 == o;
            this.lblDes.node.active = this.lblName.node.active = -1 == o;
            this.list.data = -1 == o ? this.getBlankList() : this.getHeadList();
            this.scroll.scrollToTop();
            if (-1 == o) {
                var i = localcache.getItem(
                    localdb.table_userblank,
                    this._blank
                );
                if (i) {
                    this.lblDes.string = i.des + "";
                    this.lblName.string = i.name + "";
                }
            }
        };
        e.prototype.getBlankList = function() {
            for (
                var t = localcache.getList(localdb.table_userblank),
                    e = [],
                    o = 0;
                o < t.length;
                o++
            )
                0 != t[o].type &&
                    ((null != t[o].display &&
                        0 != t[o].display.length &&
                        -1 == t[o].display.indexOf(a.Config.pf)) ||
                        e.push(t[o]));
            return e;
        };
        e.prototype.getHeadList = function() {
            for (
                var t = localcache.getList(localdb.table_userhead),
                    e = [],
                    o = r.playerProxy.userData.job,
                    i = 0;
                i < t.length;
                i++
            )
            (0 != t[i].job && t[i].job != o) || e.push(t[i]);
             
            return e;
        };
        __decorate([_(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([_(cc.Label)], e.prototype, "lblDes", void 0);
        __decorate([_(i.default)], e.prototype, "headItem", void 0);
        __decorate([_(n.default)], e.prototype, "list", void 0);
        __decorate([_(cc.ScrollView)], e.prototype, "scroll", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeHead", void 0);
        __decorate([_(cc.Node)], e.prototype, "nodeBlank", void 0);
        return (e = __decorate([c], e));
    })(cc.Component);
o.default = d;
