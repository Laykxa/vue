import Mock from "mockjs"
import homeApi from './mockData/home'
import userApi from "./mockData/user"
import menuApi from './mockData/permission'
import aimApi from './mockData/aim'
//1拦截的数据 2方法 3 制造出的假数据
//Mock.mock(/api\/home\/getChartData/,"get",homeApi.getChartData);
//Mock.mock(/api\/home\/getUserData/,"get",userApi.getUserList);
//Mock.mock(/api\/user\/deleteUser/,"get",userApi.deleteUser);
//Mock.mock(/api\/user\/addUser/,"post",userApi.createUser);
//Mock.mock(/api\/user\/editUser/,"post",userApi.updateUser);
//Mock.mock(/api\/permission\/getMenu/,"post",menuApi.getMenu);
Mock.mock(/api\/aim\/getAimData/,"get",aimApi.getAimData);
Mock.mock(/api\/user\/getAttentionData/,"get",userApi.getAttentionData);