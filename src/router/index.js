import Vue from 'vue'
import Router from 'vue-router'

import Mainpage from '@/components/mainpage.vue'
import upload from '@/components/upload.vue'
import food from '@/components/food.vue'
import admin from '@/components/admin.vue'
import myfavorites from '@/components/mainpage/nav/myfavorites'
import mylikes from '@/components/mainpage/nav/mylikes.vue'
import todayfood from '@/components/todayfood.vue'

import sousuo from '../components/sousuo/sousuo.vue'
import sousuojieguo from '../components/sousuojieguo/sousuojieguo.vue'
import pinglunlishi from '../components/pinglunlishi/pinglunlishi.vue'
import mypublish from '../components/mypublish/mypublish.vue'
import alert from '../components/mypublish/alert.vue'
Vue.use(Router)
export default new Router({
    //mode:'hash',
    routes: [{
            path: '/',
            name: 'mainpage',
            component: Mainpage,
            meta: {
                title: '舌尖上的石大'
            }
        },
        {
            path: '/upload',
            name: 'upload',
            component: upload,
            meta: {
                title: '上传菜品'
            }
        },
        {
            path: '/todayfood',
            name: 'todayfood',
            component: todayfood,
            meta: {
                title: '今天吃什么'
            }
        },
        {
            path: '/myfavorites',
            name: 'myfavorites',
            component: myfavorites,
            meta: {
                title: '美食清单'
            }
        },
        {
            path: '/mylikes',
            name: 'mylikes',
            component: mylikes,
            meta: {
                title: '我点赞的'
            }
        },
        {
            path: '/food',
            name: 'food',
            component: food,
            meta: {
                title: '美食详情',
            }
        },
        {
            path: '/search',
            component: sousuo,
            name: 'search',
            meta: {
                title: '搜索菜品'
            }
        },
        {
            path: '/result',
            component: sousuojieguo,
            name: 'result',
            meta: {
                title: '搜索结果'
            }
        },
        {
            path: '/commenthistory',
            component: pinglunlishi,
            name: 'pinglunlishi',
            meta: {
                title: '评论历史'
            }
        },
        {
            path: '/mypublish',
            component: mypublish,
            name: 'mypublish',
            meta: {
                title: '我的发布'
            }
        },
        {
            path: '/alert',
            component: alert,
            name: 'alert'
        },
        {
            path: '/admin',
            component: admin,
            name: 'admin',
            meta: {
                title: '管理员审核页面'
            }
        }
    ]
})