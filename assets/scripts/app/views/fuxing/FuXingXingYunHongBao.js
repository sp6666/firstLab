const RenderListItem = require("../../component/RenderListItem");
const Initializer = require("../../Initializer");
const Utils = require("../../utils/Utils");
cc.Class({
    extends: RenderListItem.default,

    properties: {
        btnHongBao : cc.Button,
        nodeGet : cc.Node,
        nodeOpen : cc.Node,
        lblFaSongHongBao : cc.Label,
        lightnNode : cc.Node,
    },

    showData : function() {
        var t = this._data;
        if(t) {
            if(t.data == null) {
                //还未生成
                this.btnHongBao.interactable = false;
                this.nodeOpen.active = false;
                this.nodeGet.active = false;
                this.lightnNode.active = false;
            }else {
                this.btnHongBao.interactable = true;
                this.lightnNode.active = true;
                if(t.data.status == 0) {
                    //this.btnHongBao.interactable = false;
                    //this.nodeGet.active = false;
                    var userData = Initializer.playerProxy.userData;
                    if(userData.uid == t.data.uid) {
                        //可发
                        this.nodeOpen.active = true;
                        this.nodeGet.active = false;
                    }else {
                        this.nodeOpen.active = false;
                        this.nodeGet.active = true;
                        this.lblFaSongHongBao.string = i18n.t("FUXING_DENGDAIFASONG", {param1 : t.data.name});
                    }
                }else {
                    //可领取
                    //this.btnHongBao.interactable = true;
                    this.nodeOpen.active = false;
                    this.nodeGet.active = false;
                }

            }
        }
    },

    onClickItem : function() {
        if(this._data.data.status == 0) {

            return;
        }
        if(this._data.data.state == 0) {
            Initializer.fuXingProxy.sendGetHongbao(2, this._data.data.id, ()=> {
                this.showHongbao(this._data.data);
            })
        }else {
            this.showHongbao(this._data.data);
        }
    },



    showHongbao : function(data) {
        Utils.utils.openPrefabView("fuxing/FuXingHongBaoXingYunView", null, data);
    },

    onClickOpen : function() {
        //红包主人发送红包
        Initializer.fuXingProxy.sendOpenHongbao(this._data.data.id);
    }
});
