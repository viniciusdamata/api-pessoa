import Vue from "vue"
import Router from 'vue-router'
import AvisoEmail from '@/components/AvisoEmail'
import Form from '@/components/Form'

Vue.use(Router)

export default new Router({

  routes:[
    {
      path: '/finalizado',
      name: 'aviso',
      component: AvisoEmail
    },
    {
      path: '/',
      name: 'form',
      component: Form
    }
  ]
})
  
  