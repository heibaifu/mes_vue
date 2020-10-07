import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({

    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/shanggangjilu',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/shanggangjilu.vue'),
                    meta: { title: '企业' }
                },
                {
                    path: '/gongdanweihu',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/gongdanweihu.vue'),
                    meta: { title: '企业' }
                },
                {
                    path: '/dingdanxinxi',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/dingdanxinxi.vue'),
                    meta: { title: '企业' }
                },
                {
                    path: '/qiye',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/qiye.vue'),
                    meta: { title: '企业' }
                },
                {
                    path: '/gongchang',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/gongchang.vue'),
                    meta: { title: '工厂' }
                },
                {
                    path: '/chejian',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/chejian.vue'),
                    meta: { title: '车间' }
                },
                {
                    path: '/chanxian',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/chanxian.vue'),
                    meta: { title: '产线' }
                }, {
                    path: '/gongzhan',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/gongzhan.vue'),
                    meta: { title: '工站' }
                }, {
                    path: '/gongwei',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/gongwei.vue'),
                    meta: { title: '工位' }
                },
                {
                    path: '/yuangong',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/yuangong.vue'),
                    meta: { title: '员工' }
                },
                {
                    path: '/gongweiyuangong',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/gongweiyuangong.vue'),
                    meta: { title: '工位与员工信息' }
                },

                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/equipMaintenancePlan',
                    component: () => import(/*webpackChunkName: "table" */ '../components/page/equipMaintenancePlan.vue'),
                    meta: { title: '设备保养计划' }
                },
                {
                    path: '/equipReport',
                    component: () => import(/*webpackChunkName: "table" */ '../components/page/equipReport.vue'),
                    meta: { title: '设备台账' }
                },{
                    path: '/equipRepairPerson',
                    component: () => import(/*webpackChunkName: "table" */ '../components/page/equipRepairPerson.vue'),
                    meta: { title: '设备报修派工记录' }
                },
                {
                    path: '/equipError',
                    component: () => import(/*webpackChunkName: "table" */ '../components/page/equipError.vue'),
                    meta: { title: '设备故障上报' }
                },{
                    path: '/equipRepair',
                    component: () => import(/*webpackChunkName: "table" */ '../components/page/equipRepair.vue'),
                    meta: { title: '设备维修记录' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限控制页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/BOM_Product',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/BOM_Product.vue'),
                    meta: { title: '产品' }
                }
                ,
                {
                    path: '/SourceList',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/SourceList.vue'),
                    meta: { title: '产品' }
                } ,
                {
                    path: '/BOM_Bom',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/BOM_Bom.vue'),
                    meta: { title: 'BOM物料' }
                },
                {
                    path: '/b1',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/BasPad.vue'),
                    meta: { title: 'BasPad' }
                },
                {
                    path: '/b2',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/basElectronsteelyard.vue'),
                    meta: { title: 'basElectronsteelyard' }
                },
                {
                    path: '/b4',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/basIPhoto.vue'),
                    meta: { title: 'basIPhoto' }
                },
                {
                    path: '/b3',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/basCodeprinter.vue'),
                    meta: { title: 'basCodeprinter' }
                },
                {
                    path: '/b5',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/basCardreader.vue'),
                    meta: { title: 'basCardreader' }
                }
                ,
                {
                    path: '/BOM_Details',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/BOM_Details.vue'),
                    meta: { title: 'basIPhoto' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
