import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/Index.vue'
import Tag from './pages/Tag.vue'
import Tags from './pages/Tags.vue'
import TagNew from './pages/TagNew.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/tag/new/',
      name: 'tag-new',
      component: TagNew,
    },
    {
      path: '/tag/:id',
      name: 'tag',
      component: Tag,
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags,
    },
  ],
})
