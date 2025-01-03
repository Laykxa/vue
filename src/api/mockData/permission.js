import Mock from "mockjs";
export function getMenu (){
    // 先判断用户是否存在
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'Home'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '数据详细',
              icon: 'video-play',
              url: 'Mall'
            },
            {
              path: '/aim',
              name: 'aim',
              label: '节电计划',
              icon: 'aim',
              url: 'Aim'
            },
            {
              path: '/search',
              name: 'search',
              label: '发现',
              icon: 'view',
              url: 'Search'
            },
            {
              path: '/messages',
              name: 'messages',
              label: '私信',
              icon: 'ChatLineRound',
              url: 'Messages'
            },
            {
              path: '/user',
              name: 'user',
              label: '好友管理',
              icon: 'user',
              url: 'User'
            }
          ],
          token:Mock.Random.guid(),
          message: '获取成功'
        }
      }
    

  }