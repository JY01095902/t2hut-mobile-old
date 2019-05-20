import axios from 'axios'

function fetchMediums(prefix, marker) {
    const url = `http://10.202.101.62:17175/bodleian/catalog/mediums?prefix=${prefix}&markder=${marker}`
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
    const url = `http://10.202.101.62:17175/bodleian/catalog/mediums?prefix=${prefix}`
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
    const url = `http://10.202.101.62:17175/bodleian/catalog/mediums/${identifier}?prefix=${prefix}&extname=${extname}`
    return axios.delete(url)   
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}

export { fetchMediums, saveMedium, deleteMedium }