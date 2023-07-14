import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
    const [endpoint,setEndpoint]=useState("day");
    const {data,loading}=useFetch(`/trending/movie/${endpoint}`)
    const onTabChange=(tab)=>{
        console.log(tab);
        setEndpoint(tab==='Day'? "day":"week");
        // console.log(data.results);
    }


  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Trending</span> 
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}
            ></SwitchTabs>   
        </ContentWrapper>  
        <Carousel data={data?.results} loading={loading}></Carousel>  
    </div>
    
  )
}

export default Trending