var list=require("../../component/List");
var init = require("../../Initializer");
var utils = require("../../utils/Utils");
var uiUtils = require("../../utils/UIUtils");
var red = require("../../component/RedDot");
var time = require("../../models/TimeProxy");
var urlLoad = require("../../component/UrlLoad");
cc.Class({
    extends: cc.Component,

    properties: {
        lstGallery:{
            //关卡列表
            default:null,
            type:list.default
        },
        nodeCurGallery:{
            //当前图片
            default:null,
            type:cc.Node
        },
        imgCurGallery:{
            //当前图片
            default:null,
            type:urlLoad.default
        }
    },

    onLoad () {
        facade.subscribe(init.confidanteProxy.ON_CON_GALLERY_SELECT, this.updateGalleryComeAction, this); //点击绘画回调
        this.init();
    },

    init () {
        //初始化
        this.updateGalleryList();
    },

    // update (dt) {},
    updateGalleryList() {
        //刷新绘画列表
        this.lstGallery.data = init.confidanteProxy.getCurGalleryCfg();
    },
    updateGalleryComeAction() {
        var cur = null;
        for(var idx = 0; idx < this.lstGallery.data.length; idx++)
        {
            if(this.lstGallery.data[idx] == init.confidanteProxy.galleryCurData)
            {
                cur = this.lstGallery._renders[idx];
                break;
            }
        }
        if(cur != null)
        {   
            var nodePt = new cc.Vec2(this.node.x - this.node.width * 0.5 + cur.node.width * 0.5, this.node.y - this.node.x - this.node.height * 0.5 - cur.node.height * 0.5);
            init.confidanteProxy.galleryCurPt = cur.node.convertToWorldSpaceAR(nodePt);

            init.confidanteProxy.galleryAction = true;
            //选中绘画的动画
            this.nodeCurGallery.active = false;
            this.imgCurGallery.url = init.confidanteProxy.galleryCurImg;
        }
    },
    update(dt) {
        if(this.imgCurGallery.url != null && this.imgCurGallery.node.getContentSize().width == 720)
        {
            var self = this;
            this.imgCurGallery.node.setPosition(init.confidanteProxy.galleryCurPt);
            this.imgCurGallery.node.setContentSize(new cc.Size(init.confidanteProxy.galleryCurSize.width, init.confidanteProxy.galleryCurSize.height));
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(0.3),
                    cc.callFunc(function(){
                        //计算当前屏幕宽度
                        var scales = cc.winSize.width / init.confidanteProxy.galleryCurSize.width;  //计算比例

                        self.nodeCurGallery.active = true;
                        self.imgCurGallery.node.runAction(
                            cc.sequence(
                                cc.delayTime(0.3),
                                cc.spawn(
                                    cc.moveTo(0.3, new cc.Vec2(0, 0)),
                                    cc.scaleTo(0.3, scales, scales)
                                ),
                                cc.callFunc(function(){
                                    self.imgCurGallery.node.stopAllActions();
                                    init.confidanteProxy.galleryAction = false;
                                })
                            )
                        );
                    })
                )
            );
        }
    },
    showImg() {
        var self = this;
        this.imgCurGallery.node.setPosition(init.confidanteProxy.galleryCurPt);
        this.imgCurGallery.node.setContentSize(new cc.Size(init.confidanteProxy.galleryCurSize.width, init.confidanteProxy.galleryCurSize.height));

        //计算当前屏幕宽度
        var scales = cc.winSize.width / init.confidanteProxy.galleryCurSize.width;  //计算比例

        this.nodeCurGallery.active = true;
        this.imgCurGallery.node.runAction(
            cc.sequence(
                cc.delayTime(0.3),
                cc.spawn(
                    cc.moveTo(0.3, new cc.Vec2(0, 0)),
                    cc.scaleTo(0.3, scales, scales)
                ),
                cc.callFunc(function(){
                    self.imgCurGallery.node.stopAllActions();
                    init.confidanteProxy.galleryAction = false;
                })
            )
        );
    },

    onClickPt(e, t) {
        var i = 0;
    },
    
    updateGalleryBackAction() {
        var self = this;
        init.confidanteProxy.galleryAction = true;
        var scales = init.confidanteProxy.galleryCurSize.width / cc.winSize.width;  //计算比例
        //点击返回
        this.imgCurGallery.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveTo(0.3, init.confidanteProxy.galleryCurPt),
                    cc.scaleTo(0.3, scales, scales)
                ),
                cc.callFunc(function(){
                    self.imgCurGallery.reset();
                    self.imgCurGallery.node.stopAllActions();
                    self.nodeCurGallery.active = false;

                    init.confidanteProxy.galleryCurImg = 0;
                    init.confidanteProxy.galleryCurPt = new cc.Vec2(0, 0);
                    init.confidanteProxy.galleryCurSize = new cc.Size(0, 0);
                    init.confidanteProxy.galleryAction = false;
                })
            )
        );
    },
    
    onClickImg() {
        if(init.confidanteProxy.galleryAction == true)
        {
            return;
        }

        this.updateGalleryBackAction();
    },
    onClickClose() {
        utils.utils.closeView(this, true);
    },
});
