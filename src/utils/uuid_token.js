import { v4 as uuidv4 } from 'uuid'
//要生成一个随机字符串作为用户的标识，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    let uuid_token = localStorage.getItem('UUID')
    if (!uuid_token) {
        uuid_token = uuidv4()
        uuid_token = localStorage.setItem('UUID', uuid_token)
    }
    return uuid_token
}