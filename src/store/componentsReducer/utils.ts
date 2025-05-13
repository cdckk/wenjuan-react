import { ComponentInfoType } from "./index";

/**
 * 获取下一个selectedId
 * @param fe_id 当前的id
 * @param componentList 组件列表
 * @returns 
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  // 过滤掉隐藏的
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''
  // 重新计算
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度 > 1
    if (index + 1 === length) {
      // 删除最后一个
      newSelectedId = visibleComponentList[index -1].fe_id
    } else {
      // 删除的不是最后一个，删除以后，选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}