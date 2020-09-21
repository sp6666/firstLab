var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var n = require("../../utils/Utils"),
    l = require("../../Initializer"),
    fishing = require("./FineFoodFishingArea"),
    r = cc._decorator,
    a = r.ccclass,
    s = r.property,
    c = (function (t) {
        __extends(e, t);

        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.fishing = null;
            e.lblRodsCount = null;
            e.lblTitle = null;
            e.btnRods = null;
            e.once = null;
            e.tent = null;
            e.lblDes = null;

            //变量
            e.data = {};
            e.sevData = {}; //服务器数据
            return e;
        }
        e.prototype.onLoad = function () {
            facade.subscribe(l.bagProxy.UPDATE_BAG_ITEM, this.onItemUpdate, this);
            facade.subscribe(l.fineFoodProxy.FINE_FOOD_FISHING_BACK, this.onClickClose, this);

            var t = this.node.openParam;
            if (t) {
                this.data = localcache.getItem(localdb.table_chuidiao_msg, t);
                this.sevData = l.fineFoodProxy.cities[t];
                this.updateData();
            }
        };
        //这里更新钓竿数量
        e.prototype.onItemUpdate = function () {
            this.lblRodsCount.string = l.bagProxy.getItemCount(l.fineFoodProxy.data.settings.fishing.rod) + "";
        };

        e.prototype.updateData = function () {
            if (!this.data)
                return;

            //名称
            this.lblTitle.string = this.data.name;

            //提示
            this.lblDes.string = this.data.desFood;

            //特产鱼提示
            this.fishing.setTip("");
            if (this.sevData.fishes.special) {
                var item = localcache.getItem(localdb.table_item, this.sevData.fishes.special);
                if (item) {
                    this.fishing.setTip(i18n.t("FINE_FOOD_FISH_TIP1", {
                        name: item.name
                    }));
                }
            }

            //更新钓竿数量
            this.onItemUpdate();

            //初始化隐藏垂钓界面
            this.showFishing(false);
        };

        //显示垂钓
        e.prototype.showFishing = function (show) {
            this.fishing.onShow(show);
            //按钮
            this.once.active = !show;
            this.tent.active = !show;
        };

        //点击垂钓
        e.prototype.onClickLook = function (t, e) {
            var times = parseInt(e);
            var needProp = l.bagProxy.getItemCount(l.fineFoodProxy.data.settings.fishing.rod); //当前道具数量
            if (needProp < times) {
                //如果钓竿不够弹提示
                n.alertUtil.alertItemLimit(l.fineFoodProxy.data.settings.fishing.rod);
                this.onClickCharge();
            } else {
                //钓竿够了就显示垂钓界面
                this.showFishing(true);
                //设置钓多少次
                this.fishing.playType = times;
            }
        };

        //购买钓竿
        e.prototype.onClickCharge = function () {
            n.utils.openPrefabView("ActivitySpecialBuy", null, {
                data: l.fineFoodProxy.shop[0],
                activityId: l.fineFoodProxy.data.info.type
            });
        };

        //关闭
        e.prototype.onClickClose = function () {
            n.utils.closeView(this);
        };

        //新的
        __decorate([s(cc.Button)], e.prototype, "btnRods", void 0); //购买钓竿按钮
        __decorate([s(cc.Node)], e.prototype, "once", void 0); //钓一次按钮
        __decorate([s(cc.Node)], e.prototype, "tent", void 0); //钓十次按钮
        __decorate([s(cc.Label)], e.prototype, "lblTitle", void 0); //城市名
        __decorate([s(cc.Label)], e.prototype, "lblDes", void 0); //可以钓到的鱼的提示
        __decorate([s(fishing.default)], e.prototype, "fishing", void 0); //钓鱼
        __decorate([s(cc.Label)], e.prototype, "lblRodsCount", void 0); //钓竿数量
        return (e = __decorate([a], e));
    })(cc.Component);
o.default = c;