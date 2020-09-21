var e = module,
    o = exports;
Object.defineProperty(o, "__esModule", {
    value: !0
});
var i = require("../../views/item/ItemSlotUI"), 
    n = require("../../component/List"),
    l = require("../../Initializer"),
    a = require("../../utils/UIUtils"),
    s = require("../../models/BagProxy"),
    c = cc._decorator,
    _ = c.ccclass,
    d = c.property,
    u = (function(t) {
        __extends(e, t);
        function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            e.clotheList = null;
            e.lblRemain = null;
            e.lblShopName = null;
            e.firstItem = null;
            e.btnExchange = null;
            e.fishList = [];
            e.shopData = {};
            return e;
        }
        e.prototype.onLoad = function() {
            //界面控制
            facade.subscribe(l.chuidiaoProxy.ON_CHUIDIAO_EX_CLOTHE_CLICK, this.onClotheSelect, this);
            facade.subscribe(l.chuidiaoProxy.CHUIDIAO_SPECIAL_EXCHANGE_BACK, this.updateShow, this);

            this.shopData.hid = l.chuidiaoProxy.data && l.chuidiaoProxy.data.info ? l.chuidiaoProxy.data.info.type : 1;
            this.shopData.stime = l.chuidiaoProxy.data && l.chuidiaoProxy.data.info ? l.chuidiaoProxy.data.info.showTime : 0;

            //商城标题
            this.lblShopName.string =  i18n.t("CHUIDIAO_SHOP_EXCHANGE_TITLE") + i18n.t("CHUIDIAO_SHOP_EXCHANGE_EX");//i18n.t(t);

            //刷新界面
            this.updateShow();

            //初始化点击第1个
            this.onClotheSelect(0);
        };

        //刷新界面
        e.prototype.updateShow = function() {
            //刷新列表
            this.shopData = [];
            if(l.chuidiaoProxy.specialExchange){
                var tempList = [];
                for(var i =0;i< l.chuidiaoProxy.specialExchange.length;++i){
                    var item = l.chuidiaoProxy.specialExchange[i];
                    if(item.tag ==1){
                        item.index = i;
                        item.select = false;
                        tempList.push(item);
                    }
                }

                //排序
                if(tempList.length > 0)
                {
                    tempList.sort(function(t, e) {
                        var o = t.limit_count > t.buy || 0 == t.limit_count;
                        return o != (e.limit_count > e.buy || 0 == e.limit_count) ? (o ? -1 : 1) : t.id - e.id;
                    });

                    //插入
                    for(var idx = 0; idx < tempList.length; idx++)
                    {
                        var item = tempList[idx];
                        this.shopData.push(item);
                    }
                }
            }

            //刷新列表
            this.onClotheList(this.shopData);

            //刷新当前选中物品
            this.onClotheSelect(0);
            //this.onCurItem(this.shopData[0]);

            //倒数计时
            this.countDown();
        };

        //刷新所有衣服列表
        e.prototype.onClotheList = function(data){
            data.sort(function(t, e) {
                return (t.limit_count - t.buy) < (e.limit_count - e.buy) ? 0 : 1;
            });

            this.clotheList.data = data;
        };

        //选中物品
        e.prototype.onClotheSelect = function(index){
            var data = this.shopData.find(function(it){ return it.index == index});
            if(data == null)
                return;

            //更新列表
            for(var idx = 0; idx < this.shopData.length; idx++)
            {
                this.shopData[idx].select = false;
            }
            data.select = true;
            this.clotheList.data = this.shopData;

            //更新头部选中项
            var item = data.target[0];
            var clotheItem      = [];
            clotheItem.kind     = s.DataType.CLOTHE;
            clotheItem.id       = item.id;
            clotheItem.index    = data.index;

            this.firstItem.data = clotheItem;
            this.onCurItem(data);
        };

        //刷新当前选中物品
        e.prototype.onCurItem = function(data){
            var itemEnough = true;
            //找列表
            for(var idx = 0; idx < this.fishList.length; idx++)
            {
                var show = idx < data.source.length;
                if(show)
                {
                    var no = this.fishList[idx].getComponent("ChuiDiaoExchangeFishItem");
                    if(no)
                    {
                        no.setData(data.source[idx]);
                        if(!no.canUse())
                        {
                            itemEnough = false;
                        }
                    }
                }
                this.fishList[idx].active = show;
            }

            //是否可换
            if(this.firstItem)
            {
                //物品不足或者卖完都要置灰
                this.firstItem.setGray(!itemEnough || (data.buy >= data.limit_count)); 
            }

            //没有卖完 并且 物品足够
            this.btnExchange.interactable = itemEnough && (data.buy < data.limit_count);
        };

        //倒数计时
        e.prototype.countDown = function(){
            a.uiUtils.countDown(
                this.shopData.stime,
                this.lblRemain,
                function() {
                    cthis.lblRemain.string = i18n.t("ACTHD_OVERDUE");
                },
                !0,
                "USER_REMAIN_TIME",
                "d"
            );
        };

        //兑换
        e.prototype.onClickExchange = function(){
            if(this.firstItem.data)
            {
                l.chuidiaoProxy.sendSpecialExchange(this.firstItem.data.index, 1);
            }
        };
        __decorate([d(i.default)], e.prototype, "firstItem", void 0);       //选中的物品icon
        __decorate([d(n.default)], e.prototype, "clotheList", void 0);      //物品列表
        __decorate([d([cc.Node])], e.prototype, "fishList", void 0);      //物品列表
        __decorate([d(cc.Label)], e.prototype, "lblRemain", void 0);        //倒数计时
        __decorate([d(cc.Label)], e.prototype, "lblShopName", void 0);      //商城名字
        __decorate([d(cc.Button)], e.prototype, "btnExchange", void 0);        //兑换
        return (e = __decorate([_], e));
    })(cc.Component);
o.default = u;
