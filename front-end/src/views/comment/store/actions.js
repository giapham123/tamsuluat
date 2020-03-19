import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const getComments = async () => {
  const resultCompany = await client.get('getComments/1')
  return resultCompany.data
}
export const saveComments = async (dispatch, param) => {
  const saveCompany = await client.post('saveComments', param)
  return saveCompany.data
}
export const saveReplyCompany = async (dispatch, param) => {
  const saveReplyCompany = await client.post('saveReplyComments', param)
  return saveReplyCompany.data
}
