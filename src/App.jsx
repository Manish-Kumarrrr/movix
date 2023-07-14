import { useState,useEffect } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'; 
import {fetchDataFromApi} from "./utils/api"
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import Header from './components/header/Header';
import PageNotFound from './pages/404/PageNotFound';



function App() {
  const dispatch =useDispatch();
  const url=useSelector((state)=>state.home.url );
  // const {url}=useSelector((state)=>state.home);
  console.log(url);

    useEffect(()=>{
      fetchApiConfig();
      genresCall();
    },[]);


  const fetchApiConfig=() => {
    fetchDataFromApi('/configuration')
    .then((res) =>{
      console.log(res);
      const url ={
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall=async ()=>{
    let promises=[]
    let endPoints=['tv','movie']
    let allGenres={}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));

    })
    const data =await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
    // console.log(allGenres);
    dispatch(getGenres(allGenres));
  }


  return (
    <BrowserRouter> 
    <Header />
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/:mediaType/:id' element={<Details></Details>}></Route>
      <Route path='/search/:query' element={<SearchResult></SearchResult>}></Route>
      <Route path='/explore/:mediaType' element={<Explore/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App;
