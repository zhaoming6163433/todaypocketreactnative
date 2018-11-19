/**
 * 配置编译环境和线上环境之间的切换
 *
 * urlWebHttp: 域名地址
 * toastime: toast时间
 *
 */
const toastime = 3000;
const timeout = 6000;
const botkey = 'b5e54604d962464fb5544c73e659f494';

//今日口袋提供的接口对外
let urlWebHttp = 'http://www.todaypocket.cn';
//nuxt提供的接口
let ssrurl = 'http://www.todaypocket.cn:5555';

export default{
	urlWebHttp,
	toastime,
	timeout,
    ssrurl,
    botkey
}
