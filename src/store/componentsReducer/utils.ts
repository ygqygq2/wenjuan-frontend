import { ComponentInfoType } from '.';

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
