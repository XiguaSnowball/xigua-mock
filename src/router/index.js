import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import wiki from '@/pages/wiki/wiki'
import missfreshMock from '@/pages/missfreshMock'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/wiki',
            name: 'wiki',
            component: wiki
        },
        {
            path: '/missfreshMock',
            name: 'missfreshMock',
            component: missfreshMock
        }
    ]
})