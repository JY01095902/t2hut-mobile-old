
export let Bodleian_Service_Root;


console.log('process.env.', process.env)
const REACT_APP_ENV = process.env.REACT_APP_ENV.trim()

if (REACT_APP_ENV === 'dev') {
  Bodleian_Service_Root = "http://localhost:17175/bodleian"
} else if (REACT_APP_ENV === 'stg') {
  Bodleian_Service_Root = "https://www.t2hut.com:17175/bodleian"
} else if (REACT_APP_ENV === 'prd') {
  Bodleian_Service_Root = "https://www.t2hut.com:17175/bodleian"
} else {
  console.error('app can not run on %s environment.', REACT_APP_ENV)
}

console.log('app run on %s environment.', REACT_APP_ENV)
console.log('Bodleian_Service_Root: ', Bodleian_Service_Root)