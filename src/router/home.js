//引入登录页面
import Login from './../views/Login/index.vue'
// 首页
import Home from './../views/Home/index'
// 导航栏
import MainHeader from './../views/MainHeader/index'
//线索台账
import StandBook from './../views/StandBook/index'
//线索台账录入
import StandBookEnter from './../views/StandBookEnter/index'

//问题台账
import ProblemStandBook from './../views/ProblemStandBook/index'
import ProblemStandBookEnter from './../views/ProblemStandBookEnter/index'
import ProblemStandBookPF from './../views/ProblemStandBookPF/index'

//重点工作录入
import ImportJobAdd from './../views/ImportJobAdd/index'

//人员台账
import StandingBook from './../views/StandingBook/index'
//人员调动
import personnel from "@/views/personnel"
//人员调动记录
import personnellist from "@/views/personnellist"
//待办事项
import Backlog from './../views/Backlog/index'

// （新增）个人信息
import AddInfo from './../views/AddInfo/index'
// 用户中心
import UserCenter from './../views/UserCenter/index'
//更新进度
import updateprogress from '@/views/updateprogress/index'
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: '首页',
    meta:{
      title:'首页'
    },
    components: {
      // header: HomeHerder,
      header: MainHeader,
      content: Home
    },
    meta:{
      title:'首页',
      path:'/home'
    },
  },
  {
    path: '/login',
    name: "登录",
    components: {
      // header: MainHeader,
      login: Login
    }
  },
  // 线索台账
  {
    path: '/standBook',
    name: 'StandBook',
    components: {
      // header: HomeHerder,
      header: MainHeader,
      content: StandBook
    }
  },
  {
    path: '/standBookEnter',
    name: '线索台账录入',
    components: {
      // header: HomeHerder,
      header: MainHeader,
      content: StandBookEnter
    },
    meta: { title: '线索台账录入'},
  },
  
  //问题台账
  {
    path: '/problemstandbook',
    name: 'problemstandbook',
    components: {
      // header: HomeHerder,
      header: MainHeader,
      content: ProblemStandBook
    },
    meta: { title: '问题台账'},
  },
  {
    path: '/problemstandBook/enter',
    name: 'problemstandBookEnter',
    components: {
      // header: HomeHerder,
      header: MainHeader,
      content: ProblemStandBookEnter
    },
    meta: { title: '问题台账录入'}
  },
  {
    path: '/importjobadd',
    name: 'ImportJobAdd',
    components: {
      // header: HomeHerder,
      header: MainHeader,
      content: ImportJobAdd
    },
    meta: { title: '重点工作录入'}
  },
  {
    path: '/problemstandBook/pointfollow',
    name: 'ProblemStandBookPF',
    components: {
      // header: HomeHerder,
      header: MainHeader,
      content: ProblemStandBookPF
    },
    meta: { title: '重点工作进度跟踪'}
  },
  {
    path:'/StandingBook',
    name:'人员台账',
    components:{
      header: MainHeader,
      content: StandingBook
    }
  },
  {
    path:"/personnel",
    name:'人员调动',
    components:{
      header: MainHeader,
      content:personnel
    }
  },
  {
    path:'/personnellist',
    name:'人员调动记录',
    components:{
      header:MainHeader,
      content:personnellist
    }
  },
  // 待办事项
  {
    path:'/home/backlog',
    name:'待办事项',
    meta:{
      title:'待办事项'
    },
    components:{
      header: MainHeader,
      content: Backlog
    }
  },
    // 更新进度
  {
    path:'/updateprogress',
    name:'updateprogress',
    components:{
      header: MainHeader,
      content:updateprogress
    }
  },
  // {
  //   path: '/cart',
  //   components: {
  //     header: CartHerder,
  //     content: Cart,
  //     footer: MainHeader
  //   }
  // },
  // {
  //   path: '/user',
  //   components: {
  //     header: UserHerder,
  //     content: User,
  //     footer: MainHeader
  //   }
  // }
  // 新增
  {
    path:'/addInfo',
    name:'个人信息',
    meta:{
      title:'个人信息'
    },
    components:{
      header: MainHeader,
      content: AddInfo
    }
  },
  //用户中心
  {
    path:'/usercenter',
    name:'个人系统中心',
    meta:{
      title:'个人系统中心'
    },
    components:{
      header: MainHeader,
      content: UserCenter
    }
  },
]

export default routes
