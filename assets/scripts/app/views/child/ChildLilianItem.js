var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    l = require("../../utils/Utils"),
    r = require("../../utils/UIUtils"),
    a = require("../../component/ChildSpine"),
    s = require("../servant/ServantStarShow"),
    c = require("../../component/List"),
    _ = cc._decorator,
    d = _.ccclass,
    u = _.property,
    p = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.lblName = null;
            e.lblTime = null;
            e.lockNode = null;
            e.timeNode = null;
            e.rewardNode = null;
            e.selectNode = null;
            e.mailNode = null;
            e.roleImg = null;
            e.nameNode = null;
            e.yunNode = null;
            e.roleSmallImg = null;
            e.lblPrice = null;
            e.costNode = null;
            e.starNode = null;
            e.stars = null;
            e.list = null;
            e.lblVip =null;
            return e;
        }
        e.prototype.showData = function() {
            var t = this,
                e = this._data.data,
                o = parseInt(this._data.id);
            if (o <= n.sonProxy.lilianSeat.desk) {
                this.costNode.active = !1;
                this.lockNode.active = !1;
                if (null != e && 0 != e.sid) {
                    var i = n.sonProxy.getSon(e.sid);
                    this.lblName.string = i.name;
                    r.uiUtils.countDown(e.cd.next, this.lblTime, function() {
                        i.cd.label = "lilian";
                        n.playerProxy.sendAdok(i.cd.label);
                        t.lblTime.string = "00:00:00";
                    });
                    this.rewardNode.active = 0 == e.cd.next;
                    this.timeNode.active = e.cd.next > 0;
                    this.selectNode.active = !1;
                    this.mailNode.active = 0 != e.msgId;
                    this.roleImg.node.active = i.state > 3;
                    this.roleSmallImg.node.active = i.state <= 3;
                    i.state > 3
                        ? this.roleImg.setKid(i.id, i.sex)
                        : this.roleSmallImg.setKid(i.id, i.sex, !1);
                    this.nameNode.active = this.yunNode.active = !0;
                    this.starNode.active = !0;
                    this.stars.setValue(i.talent);
                    this.list.node.x = -this.list.node.width / 2;
                } else {
                    this.timeNode.active = !1;
                    this.selectNode.active = !0;
                    this.mailNode.active = !1;
                    this.lblName.string = "";
                    this.roleImg.clearKid();
                    this.roleImg.node.active = !1;
                    this.roleSmallImg.clearKid();
                    this.roleSmallImg.node.active = !1;
                    this.nameNode.active = this.yunNode.active = !1;
                    this.rewardNode.active = !1;
                    this.starNode.active = !1;
                }
            } else {
                this.lblName.string = i18n.t("JINGYING_WEIJIESUO");
                this.lockNode.active = !0;
                this.timeNode.active = !1;
                this.selectNode.active = !1;
                this.mailNode.active = !1;
                //add By Ocean
                this.nameNode.active = this.yunNode.active = 1;
               
                this.roleImg.clearKid();
                this.roleImg.node.active = !1;
                this.roleSmallImg.clearKid();
                this.roleSmallImg.node.active = !1;
                this.rewardNode.active = !1;
                var l = localcache.getItem(
                    localdb.table_practiceSeat,
                    n.sonProxy.lilianSeat.desk + 1
                );
                this.lblPrice.string = l.cost + "";
                n.sonProxy.lilianList.length;
                this.costNode.active = o == n.sonProxy.lilianSeat.desk + 1;
                //add by Ocean
                var costVip =l.VIP;
                this.lblVip.string =i18n.t("COMMON_VIP_NAME",{v:costVip});
               this.lblVip.node.active =costVip>0;
                this.starNode.active = !1;
            }
        };
        e.prototype.onClickFeige = function() {
            l.utils.openPrefabView("feige/FeigeView", null, {
                flag: !0
            });
        };
        __decorate([u(cc.Label)], e.prototype, "lblName", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblTime", void 0);
        __decorate([u(cc.Node)], e.prototype, "lockNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "timeNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "rewardNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "selectNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "mailNode", void 0);
        __decorate([u(a.default)], e.prototype, "roleImg", void 0);
        __decorate([u(cc.Node)], e.prototype, "nameNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "yunNode", void 0);
        __decorate([u(a.default)], e.prototype, "roleSmallImg", void 0);
        __decorate([u(cc.Label)], e.prototype, "lblPrice", void 0);
        __decorate([u(cc.Node)], e.prototype, "costNode", void 0);
        __decorate([u(cc.Node)], e.prototype, "starNode", void 0);
        __decorate([u(s.default)], e.prototype, "stars", void 0);
        __decorate([u(c.default)], e.prototype, "list", void 0);
        __decorate([u(cc.Label)],e.prototype,"lblVip", void 0); 
        return (e = __decorate([d], e));
    })(i.default);
o.default = p;
