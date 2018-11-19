import appConfigs from '../configs'
import { GET,POST } from '../Fetch'

/**
 * 查询公共信息列表
 */
export const api_public_article = (params) => GET('http://www.todaypocket.cn/api/article/public_article?', params);

/**
 * 图灵机器人
 */

export const api_get_tuling_bot = (params) => GET('http://www.tuling123.com/openapi/api?key='+appConfigs.botkey, params);