const RenderListItem = require("../../component/RenderListItem");
const UserHeadItem = require("../user/UserHeadItem");
const ShaderUtils = require("../../utils/ShaderUtils");

cc.Class({
    extends: RenderListItem.default,

    properties: {
        nodeHead: UserHeadItem.default,
        lblPlayerName:  cc.Label,
        lblPlayerId : cc.Label,
        btnAction:cc.Button,
        itemArray : [cc.Sprite],
    },
    showData: function () {
        var t = this._data;
        this.nodeHead.setUserHead(t.job, t.headavatar);
        this.lblPlayerName.string = t.name;
        this.lblPlayerId.string = i18n.t("USER_ID", {id : t.id});
        var foodData = this._data.data;
        for(var idx = 0; idx < foodData.length; idx ++) {
            if(foodData[idx].num <= 0 && this.itemArray[idx] != null) {
                ShaderUtils.shaderUtils.setImageGray(this.itemArray[idx], true);
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.addBtnEvent(this.btnAction);
     },

    onClickAvatarItem() {
        // var t = this.data;
        // t && (t.id == Initializer.playerProxy.userData.uid ? TimeProxy.funUtils.openView(TimeProxy.funUtils.userView.id) : Initializer.playerProxy.sendGetOther(t.id));
    },
});

