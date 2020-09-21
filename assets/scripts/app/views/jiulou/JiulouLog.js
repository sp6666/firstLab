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
            e.btns = [];
            e.nodes = [];
            e.lists = [];
            e.nodeInfo = null;
            e.curIndex = 1;
            return e;
        }
        e.prototype.onLoad = function() {
            this.onClickTab();
            facade.subscribe("JIU_LOU_LOG_UPDATE", this.onClickTab, this);
        };
        e.prototype.onClickTab = function(t, e) {
            var o = e ? parseInt(e) : this.curIndex;
            this.curIndex = o;
            for (var i = 0; i < this.btns.length; i++) {
                this.btns[i].interactable = i != o - 1;
                this.nodes[i].active = i == o - 1;
                0 == i
                    ? (this.btns[i].node.active =
                          l.jiulouProxy.yhOldList &&
                          l.jiulouProxy.yhOldList.length > 0)
                    : 1 == i
                    ? (this.btns[i].node.active =
                          l.jiulouProxy.yhBadList &&
                          l.jiulouProxy.yhBadList.length > 0)
                    : 2 == i &&
                      (this.btns[i].node.active =
                          l.jiulouProxy.lbList &&
                          l.jiulouProxy.lbList.length > 0);
            }
            switch (o) {
                case 1:
                    this.lists[0].data = l.jiulouProxy.yhOldList;
                    l.jiulouProxy.yhOldList;
                    break;

                case 2:
                    this.lists[1].data = l.jiulouProxy.yhBadList;
                    l.jiulouProxy.yhBadList;
                    break;

                case 3:
                    this.lists[2].data = l.jiulouProxy.lbList;
                    l.jiulouProxy.lbList;
            }
            this.nodeInfo.active =
                null == l.jiulouProxy.yhOldList ||
                0 == l.jiulouProxy.yhOldList.length;
        };
        e.prototype.onClickClost = function() {
            i.utils.closeView(this);
        };
        __decorate([s([cc.Button])], e.prototype, "btns", void 0);
        __decorate([s([cc.Node])], e.prototype, "nodes", void 0);
        __decorate([s([n.default])], e.prototype, "lists", void 0);
        __decorate([s(cc.Node)], e.prototype, "nodeInfo", void 0);
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;
