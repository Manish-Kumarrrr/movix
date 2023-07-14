import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
    const [endpoint,setEndpoint]=useState("movie");
    const {data,loading}=useFetch(`/${endpoint}/top_rated`)
    const onTabChange=(tab)=>{
        console.log(tab);
        setEndpoint(tab==='Movies'? "movie":"tv");
        // console.log(data.results);
    }


  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span> 
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}
            ></SwitchTabs>   
        </ContentWrapper>  
        <Carousel data={data?.results} loading={loading} endpoint={endpoint}></Carousel>  
    </div>
    
  )
}

export default TopRated