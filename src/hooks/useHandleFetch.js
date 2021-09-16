import { useState } from "react"

const useHandleFetch = () => {
  const [gifArray, setGifArray] = useState([{ id: 0, url: "" }])
  const [totalCount, setTotalCount] = useState(0)
  const [foundGifs, setFoundGifs] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFetch = (enteredFilter, activePage, apiKey, limit) => {
    let offset = activePage * limit - limit
    if (offset > 4999) {
      offset = 4999 //08/09/2021 the query does not accept offset>4999
    }
    const query = `?q="${enteredFilter}"&api_key=${apiKey}&limit=${limit}&offset=${offset}`
    setIsLoading(true)
    fetch("http://api.giphy.com/v1/gifs/search" + query)
      .then((response) => {
        if (response.ok) {
          setFoundGifs(true)
          return response.json()
        } else {
          setIsLoading(false)
          setFoundGifs(false)
          setGifArray([{ id: 0, url: "" }])
          setTotalCount(0)
          activePage = 1
        }
      })
      .then((response) => {
        setIsLoading(false)
        if (typeof response !== "undefined") {
          const gifAuxArray = []
          for (const key in response.data) {
            gifAuxArray.push({
              id: key,
              url: response.data[key].images.original.url,
            })
            if (response.pagination.total_count - limit >= 4999) {
              setTotalCount(4999 + limit) //08/09/2021 the query does not accept offset>4999
            } else {
              setTotalCount(response.pagination.total_count)
            }
          }
          setGifArray(gifAuxArray)
        } else {
          setGifArray([{ id: 0, url: "" }])
          setTotalCount(0)
          activePage = 1
        }
      })
    return activePage
  }

  return { gifArray, totalCount, foundGifs, isLoading, handleFetch }
}

export default useHandleFetch
