import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const insertCompany = async (dispatch, param) => {
  const insertComp = await client.post('insertCompany', param)
  return insertComp
}