import { ApiClient } from '../../../http-common'
const client = new ApiClient()
export const getCompany = async () => {
  const resultCompany = await client.get('getCompany')
  return resultCompany.data
}
export const getAddress = async () => {
  const resultAddress = await client.get('getAddress')
  return resultAddress.data
}
export const getCommentsLatest = async () => {
  const resultAddress = await client.get('getCommentsLatest')
  return resultAddress.data
}
