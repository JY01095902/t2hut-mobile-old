import axios from 'axios'

function fetchCatalog(url) {
    // const url = `http://10.202.101.62:17175/bodleian/catalog?path=/shiyanxun`
    // const url = `http://10.202.101.62:17175/bodleian/catalog`
    return axios.get(url)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}

function uploadPicture(url, formData) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: formData,
        url,
        onUploadProgress: function (progressEvent) {
            console.log("progressEvent", progressEvent)
        },
    };
    return axios(options)   
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}

export { fetchCatalog, uploadPicture }