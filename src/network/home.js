import {request} from './request'  

export function getMenuList() {
  return request({
    url: 'menus',
    method: 'get'
  })
}

export function getUsersList(data) {
  return request({
    url: 'users',
    method: 'get',
    params: data
  })
}

export function putUsersState(uId, type) {
  return request({
    url: 'users/' + uId + '/state/' + type,
    method: 'put'
  })
}

// 添加用户
export function addUser(userInfo) {
  return request({
    url: 'users',
    method: 'post',
    data: userInfo
  })
}
// 编辑用户请求数据
export function editorUser(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  })
}
// 编辑用户提交数据
export function editorUsered(id, userInfo) {
  return request({
    url: 'users/' + id,
    method: 'put',
    data: userInfo
  })
}
// 删除用户
export function deleteUsers(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}

// 请求权限列表
export function getRightsList() {
  return request({
    url: 'rights/list',
    method: 'get'
  })
}

// 请求角色列表
export function getRolesList() {
  return request({
    url: 'roles',
    method: 'get'
  })
}

// 添加角色
export function addRoles(roleInfo) {
  return request({
    url: 'roles',
    method: 'post',
    data: roleInfo
  })
}
// 编辑角色请求数据
export function editorRoles(id) {
  return request({
    url: 'roles/' + id,
    method: 'get'
  })
}
// 编辑角色提交数据
export function editorRolesed(id, userInfo) {
  return request({
    url: 'roles/' + id,
    method: 'put',
    data: userInfo
  })
}
// 删除角色
export function deleteRoles(id) {
  return request({
    url: 'roles/' + id,
    method: 'delete'
  })
}
// 删除角色指定权限
export function deleteRolesRight(id, rightId) {
  return request({
    url: 'roles/' + id + '/rights/' + rightId,
    method: 'delete'
  })
}
// 请求权限列表树状显示
export function getRightsListTree() {
  return request({
    url: 'rights/tree',
    method: 'get'
  })
}
// 角色授权
export function setRightsList(roleId, rids) {
  return request({
    url: 'roles/' + roleId + '/rights',
    method: 'post',
    data: rids
  })
}
// 分配用户角色
export function setUsersRole(id, rid) {
  return request({
    url: 'users/' + id + '/role',
    method: 'put',
    data: rid
  })
}

// 商品分类数据列表
export function getGoodsCateList(data) {
  return request({
    url: 'categories/',
    method: 'get',
    params: data
  })
}

// 父级商品分类数据列表
export function getGoodsCateFatherList() {
  return request({
    url: 'categories/',
    method: 'get',
    params: {type: 2}
  })
}

// 新增商品分类数据列表
export function addGoodsCate(dataList) {
  return request({
    url: 'categories/',
    method: 'post',
    data: dataList
  })
}
// 根据 id 查询分类
export function getGoodsCate(id) {
  return request({
    url: 'categories/' + id,
    method: 'get'
  })
}
// 编辑提交分类
export function setGoodsCate(id, cate) {
  return request({
    url: 'categories/' + id,
    method: 'put',
    data: cate
  })
}
// 删除分类
export function deleteGoodsCate(id) {
  return request({
    url: 'categories/' + id,
    method: 'delete'
  })
}

// 参数页用商品分类数据列表
export function getAllGoodsCateList() {
  return request({
    url: 'categories/',
    method: 'get'
  })
}
// 参数列表
export function getGoodParams(id, type) {
  return request({
    url: 'categories/' + id + '/attributes',
    method: 'get',
    params: type
  })
}
// 添加动态参数或者静态属性
export function addGoodParams(id, dataList) {
  return request({
    url: 'categories/' + id + '/attributes',
    method: 'post',
    data: dataList
  })
}
// 查询动态参数或者静态属性
export function searchGoodParams(id, attrId, dataList) {
  return request({
    url: 'categories/' + id + '/attributes/' + attrId,
    method: 'get',
    data: dataList
  })
}
// 编辑动态参数或者静态属性
export function editorGoodParams(id, attrId, dataList) {
  return request({
    url: 'categories/' + id + '/attributes/' + attrId,
    method: 'put',
    data: dataList
  })
}
// 删除动态参数或者静态属性
export function deleteGoodParams(id, attrId) {
  return request({
    url: 'categories/' + id + '/attributes/' + attrId,
    method: 'delete'
  })
}
// 编辑提交参数
export function addEditorGoodParams(id, attrId, dataList) {
  return request({
    url: 'categories/' + id + '/attributes/' + attrId,
    method: 'put',
    data: dataList
  })
}

// 获取商品列表
export function getGoodsList(dataList) {
  return request({
    url: 'goods',
    method: 'get',
    params: dataList
  })
}
// 删除商品
export function deleteGoodsList(id) {
  return request({
    url: 'goods/' + id,
    method: 'delete'
  })
}
// 查询商品
export function getGoods(id) {
  return request({
    url: 'goods/' + id,
    method: 'get'
  })
}
// 编辑商品
export function editorGoods(id, dataInfo) {
  return request({
    url: 'goods/' + id,
    method: 'put',
    data: dataInfo
  })
}
// 编辑商品
export function addGoods(dataInfo) {
  return request({
    url: 'goods',
    method: 'post',
    data: dataInfo
  })
}

// 订单数据列表
export function getOrdersList(dataInfo) {
  return request({
    url: 'orders',
    method: 'get',
    params: dataInfo
  })
}
// 查看物流信息 BUG
export function getProgressInfo() {
  return request({
    url: '/kuaidi/1106975712662',
    method: 'get'
  })
}

// 基于时间统计的折线图
export function getTimeGraData() {
  return request({
    url: 'reports/type/1',
    method: 'get'
  })
}

