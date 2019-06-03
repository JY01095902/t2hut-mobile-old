import axios from 'axios'
import { Bodleian_Service_Root } from '../../config'

function fetchMediums(prefix, marker) {
  const url = `${Bodleian_Service_Root}/catalog/mediums?prefix=${prefix}&markder=${marker}`
  return axios.get(url)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(err => {
      return err
    })
}

function saveMedium(prefix, formData) {
  const url = `${Bodleian_Service_Root}/catalog/mediums?prefix=${prefix}`
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: formData,
    url,
  };
  return axios(options)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}

function deleteMedium(prefix, identifier, extname) {
  const url = `${Bodleian_Service_Root}/catalog/mediums/${identifier}?prefix=${prefix}&extname=${extname}`
  return axios.delete(url)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}

export { fetchMediums, saveMedium, deleteMedium }