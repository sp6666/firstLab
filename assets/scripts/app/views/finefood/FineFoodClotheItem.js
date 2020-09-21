var RenderListItem = require("../../component/RenderListItem"),
    n = require("../../Initializer"),
    shader = require("../../utils/ShaderUtils"),
    s = require("../../models/BagProxy"),
    sl = require("../item/ItemSlotUI");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        spNormal: cc.Sprite,
        spSelect: cc.Sprite,
        spIcon: cc.Sprite,
        bgNormal: cc.Node,
        bgSelect: cc.Node,
        lblName: cc.Label,
        slot: sl.default,
        _isSelect: false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () {},

    showData: function () {
        try {
            var t = this._data.target[0];
            if (t) {
                //物品icon
                var item = localcache.getItem(
                    localdb.table_userClothe,
                    t.id
                ); //localcache.getItem(localdb.table_item, t.id);
                var clotheItem = [];
                clotheItem.kind = s.DataType.CLOTHE;
                clotheItem.id = t.id;
                this.slot.data = clotheItem;

                //名称
                this.lblName.string = item.name;

                //选中项
                this._isSelect = this._data.select;
                this.setOnSelect();

                var e = this._data.limit_count - this._data.buy <= 0 && 0 != this._data.limit_count;
                this.spIcon && shader.shaderUtils.setImageGray(this.spIcon, e);
                this.spNormal && shader.shaderUtils.setImageGray(this.spNormal, e);
                this.spSelect && shader.shaderUtils.setImageGray(this.spSelect, e);
            }
        } catch (err) {}
    },

    // update (dt) {},

    //点击更换当前选中物品
    onClickItem: function () {
        //使用选中当前物品的回调
        if (!this._isSelect) {
            facade.send(n.fineFoodProxy.ON_FINE_FOOD_EX_CLOTHE_CLICK, this._data.index);
        }
    },

    setOnSelect: function () {
        this.bgNormal.active = !this._isSelect;
        this.bgSelect.active = this._isSelect;
    },
});