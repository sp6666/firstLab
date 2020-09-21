var RenderListItem = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    shader = require("../../utils/ShaderUtils"),
    sl = require("../item/ItemSlotUI");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        lblName: cc.Label, //name
        lblEnough: cc.Label, //count  够用
        lblNotEnough: cc.Label, //count   不够
        slot: sl.default, //icon
        spIcon: cc.Sprite,
        boolCanUse: Boolean, //是否够用
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () {},
    setData: function (data) {
        this._data = data;
        this.showData();
    },
    showData: function () {
        var t = this._data;
        if (t) {
            //物品icon
            var item = localcache.getItem(localdb.table_item, t.id);
            this.slot.data = item;
            this.slot.setGray(false);

            //名称
            this.lblName.string = item.name;

            //数量
            var maxItem = t.count;
            var curCount = n.bagProxy.getItemCount(t.id);

            this.lblEnough.string = this.lblNotEnough.string = curCount.toString() + "/" + maxItem.toString();

            this.boolCanUse = curCount >= maxItem;
            //文本显示
            this.lblEnough.node.active = this.boolCanUse;
            this.lblNotEnough.node.active = !this.boolCanUse;

            //状态
            this.setGray(!this.boolCanUse);
        } else {
            this.setGray(false);
            this.lblEnough.string = this.lblNotEnough.string = "0/0";
            this.lblEnough.node.active = false;
            this.lblNotEnough.node.active = true;
        }
    },

    setGray: function (isGray) {
        //物品置灰
        this.spIcon && shader.shaderUtils.setImageGray(this.spIcon, isGray);
    },

    canUse: function () {
        return this.boolCanUse;
    },

    // update (dt) {},

    /*
    //点击更换当前选中物品
    onClickItem: function() {
        //使用选中当前物品的回调
        if(!this.onClicked)
        {
            facade.send(n.fineFoodProxy.ON_FINE_FOOD_EX_CLOTHE_CLICK, this._data);
        }
    },

    
    setOnSelect: function(select){
        this.onClicked = select;
        this.bgNormal.active = !this.onClicked;
        this.bgSelect.active = this.onClicked;
    },
    */
});