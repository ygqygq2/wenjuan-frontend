import axios, { ResDataType } from './ajax';

export async function getRolesService(): Promise<ResDataType> {
  const url = `/api/roles`;
  const data: ResDataType[] = await axios.get(url);
  return data;
}
