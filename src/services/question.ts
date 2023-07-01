import axios, { ResDataType } from './ajax';

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

/**
 * 获取单个问卷信息
 * @param id - 问卷 Id
 */
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

/**
 *  创建问卷
 * @returns
 */
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

/**
 * 获取问卷列表
 * @returns
 */
export async function getQuestionListService(opt: Partial<SearchOption> = {}): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

/**
 * 更新单个问卷
 * @param id
 * @param opt
 * @returns
 */
export async function updateQuestionService(id: string, opt: { [key: string]: any }): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  // const {title} = opt;
  // // title 为空时，不允许修改
  // if (!title) {
  //   return {errno: 1, msg: '标题不能为空'};
  // }
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

/**
 * 复制问卷
 */
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

/**
 * 批量删除
 */
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const url = '/api/question';
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
  return data;
}
