import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }


  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  const deleteName = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log("requesti", request)
    return
  }

  const update = (id, newObject) => {
    console.log("id", id)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  export default { getAll, create, deleteName, update }