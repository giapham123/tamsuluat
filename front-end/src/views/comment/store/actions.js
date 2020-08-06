import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const getComments = async (dispatch, param) => {
  const resultCompany = await client.get('getComments/1', param)
  return resultCompany.data
}
export const getCommentsLoadMore = async (dispatch, param) => {
  const resultCompany = await client.get(`getComments/loadmore/${param.companyCd}&paging=${param.page}`, param)
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
export const getReplyOfComment = async (dispatch, param) => {
  const resultReplyOfComment = await client.post('getReplyOfComment', param)
  return resultReplyOfComment.data
}
export const updateLikeAndDislike = async (dispatch, params) => {
  const updateLikeAndDislike = await client.post('updateLikeAndDislike', params)
  return updateLikeAndDislike.data
}
