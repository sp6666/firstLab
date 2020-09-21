var item = require("../../component/RenderListItem");
var urlLoad = require("../../component/UrlLoad");
var uiUtils = require("../../utils/UIUtils");
var init = require("../../Initializer");
var shader = require("../../utils/ShaderUtils");
var head = require("../user/UserHeadItem");
var list=require("../../component/List");

cc.Class({
    extends: item.default,

    properties: {
        lblDes:{
            //来源
            default:null,
            type:cc.Label
        },
        nodeImg:{
            //绘画外框
            default:null,
            type:cc.Node
        },
        imgGallery:{
            //绘画
            default:null,
            type:urlLoad.default
        },
        nodeLock:{
            //加锁
            default:null,
            type:cc.Node
        },
        nodeBtn:{
            //加锁
            default:null,
            type:cc.Node
        },
        lstProp:{
            //属性列表
            default:null,
            type:list.default
        },
        lblName:{
            //名字
            default:null,
            type:cc.Label
        }
    },

    showData() {
        var t = this._data;

        //绘画
        this.takeImgthis();

        //属性
        this.lstProp.data = t.props;

        //加锁
        var lock = true;
        for(var key in init.confidanteProxy.hero.heros.paints){
            if(init.confidanteProxy.hero.heros.paints[key] == t.id)
            {
                lock = false;
            }
        }
        this.nodeLock.active = lock;
        shader.shaderUtils.setImageGray(this.imgGallery.node.getComponent(cc.Sprite), lock);
        this.nodeBtn.active = !lock;

        //解锁条件 
        this.lblDes.string = t.des;

        //名字
        this.lblName.string = t.name;
    },
    takeImgthis() {
        //隐藏图片
        this.imgGallery.node.active = false;
        this.imgGallery.url = uiUtils.uiHelps.getGalleryImg(this._data.res);

        //修改图片尺寸
        var nodeSize = this.nodeImg.getContentSize();
        var nodeSc = nodeSize.width / nodeSize.height;  //长宽比

        var imgWidth  = 720;
        var imgHeight = 1280;
        var imgSc = imgWidth / imgHeight;

        var curScale = 1;
        if(nodeSc > imgSc)
        {
            //如果话框的长宽比大，就按宽适配
            curScale = nodeSize.width / imgWidth;
        }
        else
        {
            curScale = nodeSize.height / imgHeight;
        }

        this.imgGallery.node.setContentSize(curScale * imgWidth, curScale * imgHeight);

        this.imgGallery.node.active = true;
    },
    onLoad() { 

    },
    onClickItem() {
        //点击
        
        //位置
        init.confidanteProxy.galleryCurData = this._data;
        //大小
        init.confidanteProxy.galleryCurSize = this.imgGallery.node.getContentSize();
        //资源
        init.confidanteProxy.galleryCurImg = this.imgGallery.url;

        facade.send(init.confidanteProxy.ON_CON_GALLERY_SELECT);
    },
});
