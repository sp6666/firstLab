var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/List"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/ShaderUtils"),
    WelfareOnlineItem = require("./WelfareOnlineItem"),
    a = cc._decorator,
    s = a.ccclass,
    c = a.property,
    _ = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.list = null;
            e.weaklist = null;
            e.onlineList = null;
            e.btn = null;
            e.img = null;
            e.animation = null;
            e.btns = [];
            e.nodes = [];
            e.onLineItem = [];
            e.lblTip = null;
            return e;
        }
        e.prototype.onLoad = function() {
            this.updateList();
            this.updataWeakList();
            this.updateTime();
            facade.subscribe(
                n.welfareProxy.UPDATE_WELFARE_QIANDAO,
                this.updateList,
                this
            );
            facade.subscribe(
                n.welfareProxy.UPDATE_WELFARE_ZHOUQIAN,
                this.updataWeakList,
                this
            );
            facade.subscribe(
                n.welfareProxy.UPDATE_WELFARE_ONLINE,
                this.updateOnlineList,
                this
            );
            this.btn.interactable = 0 == n.welfareProxy.qiandao.qiandao;
            this.onclickTab(0, 1 == n.welfareProxy.zhouqian.isrwd ? 2 : 1);
            n.welfareProxy.getOnLineInfo();
        };
        e.prototype.updateList = function() {
            this.list.data = n.welfareProxy.getDailyList();
            r.shaderUtils.setImageGray(
                this.img,
                0 != n.welfareProxy.qiandao.qiandao
            );
            if (0 != n.welfareProxy.qiandao.qiandao) {
                this.animation.enabled = !1;
                this.animation.play("");
                this.animation.stop();
            } else l.utils.showEffect(this.animation, 0);
        };
        e.prototype.updataWeakList = function() {
            for (
                var t = localcache.getList(localdb.table_monday).length,
                    e = [],
                    o = 0;
                o < t;
                o++
            ) {
                var i = localcache.getItem(localdb.table_monday, o + 1);
                i && e.push(i);
            }
            this.weaklist.data = e;
        };
        e.prototype.updateOnlineList = function() {
            if(n.welfareProxy.onlineData == null) return;
            this.unschedule(this.updateTime);
            this.updateTime();
            if(!n.welfareProxy.overEnd()) {
                this.schedule(this.updateTime, 1);
            }
        };
        e.prototype.onClickItem = function() {
            0 == n.welfareProxy.qiandao.qiandao
                ? n.welfareProxy.sendQiandao()
                : l.alertUtil.alert18n("WELFARE_QIANDAO_LIMIT");
        };
        e.prototype.onClickClost = function() {
            l.utils.closeView(this);
        };
        e.prototype.onclickTab = function(t, e) {
            for (var o = parseInt(e) - 1, i = 0; i < this.btns.length; i++) {
                this.btns[i].interactable = i != o;
                this.nodes[i].active = i == o;
            }
            switch (o) {
                case 0:
                    this.updateList();
                    this.lblTip.string = i18n.t("WELFARE_QIANDAO_TIP");
                    break;

                case 1:
                    this.updataWeakList();
                    this.lblTip.string = i18n.t("WELFARE_QIANDAO_TIP");
                    break;
                case 2:
                    this.updateOnlineList();
                    this.lblTip.string = i18n.t("WELFARE_ONLINE_TIP");
                    break;
            }
        };
        e.prototype.updateTime = function() {
            n.welfareProxy.onlineData.line_time ++;
            for(var index = 0; index < this.onLineItem.length; index ++) {
                this.onLineItem[index].init(index);
            }
        };
        __decorate([c(i.default)], e.prototype, "list", void 0);
        __decorate([c(i.default)], e.prototype, "weaklist", void 0);
        __decorate([c(i.default)], e.prototype, "onlineList", void 0);
        __decorate([c(cc.Button)], e.prototype, "btn", void 0);
        __decorate([c(cc.Sprite)], e.prototype, "img", void 0);
        __decorate([c(cc.Animation)], e.prototype, "animation", void 0);
        __decorate([c([cc.Button])], e.prototype, "btns", void 0);
        __decorate([c([cc.Node])], e.prototype, "nodes", void 0);
        __decorate([c([WelfareOnlineItem])], e.prototype, "onLineItem", void 0);
        __decorate([c(cc.Label)], e.prototype, "lblTip", void 0);
        return (e = __decorate([s], e));
    })(cc.Component);
o.default = _;
