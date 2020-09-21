var RenderListItem = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    sl = require("../item/ItemSlotUI");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblNum: cc.Label,
        slot: sl.default,
        btnAction:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () {},

    showData: function() {
        var t = this._data;
        if (t) {
            try{
                //物品icon
                var item = localcache.getItem(localdb.table_item, t.id);
                this.slot.data = item;

                //数量
                var clothe = localcache.getItem(localdb.table_chuidiao_exchange, t.id);
                var fish = clothe.components.find(function(it){ return it.fishid == t.fishid});
                var needCount = fish == null ? 0 : fish.count;
                var bagCount = n.bagProxy.getItemCount(t.fishid);
                this.lblNum.string = bagCount.toString() + "/" + needCount.toString();

                //状态
                this.setGray(needCount > bagCount);
            }
            catch(err){

            }
        }
        else{
            this.setGray(false);
            this.lblNum.string = "0/0";
        }
    },
    setGray: function(isGray){
        //物品置灰
        this.slot.setGray(isGray);

        //如果物品不够就显示按钮
        this.btnAction.node.active = isGray;
    },
    // update (dt) {},

    //点击弹出对话框
    onClickGift: function() {
        //鱼名字
        var itemFish = localcache.getItem(localdb.table_item, fish.id);
        this.fishName = itemFish.name;

        //是否
        var str = this.fishName + "数量不足，是否前往获取";
        //加一个对话框
        //如果选是的话就关掉兑换商城界面
    },
});
