import { ComponentInfoType, ComponentsStateType } from '.';

/**
 * 获取选中的组件下一个组件的 id
 * @param fe_id
 * @param componentList
 * @returns
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return '';

  let newSelectedId = '';
  const { length } = visibleComponentList;
  if (length <= 1) {
    newSelectedId = '';
  } else {
    if (index === length - 1) {
      // 选中的是最后一个组件
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}

/**
 * 插入新组件
 * @param draft - state draft
 * @param newComponent - 新组件
 */
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);
  if (index < 0) {
    // 未选中任何组件
    state.componentList.push(newComponent);
  } else {
    // 选中了组件，插入到 index 后面
    state.componentList.splice(index + 1, 0, newComponent);
  }
  state.selectedId = newComponent.fe_id;
}
