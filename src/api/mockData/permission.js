import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    //menuList用于后面做权限分配，也就是用户可以展示的菜单
    if (username === 'admin' && password === 'admin') {
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
              path: '/news',
              name: 'news',
              label: '私信',
              icon: 'ChatLineRound',
              url: 'News'
            },
            {
              path: '/user',
              name: 'user',
              label: '好友管理',
              icon: 'user',
              url: 'User'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        },
      };
        
    }

  },
};