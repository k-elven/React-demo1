import {getChannelAPI} from '@/api/artilcle'
import { useEffect, useState } from 'react';  

function useChnnels () {
    const [channelLists , setChannelLists] = useState([])
  useEffect(() => {
    const getChannelLists = async() => {
      const res = await getChannelAPI()
      setChannelLists(res.data.channels)
    }
    getChannelLists()
  },[])
  return {
    channelLists
  }
}

export {useChnnels}