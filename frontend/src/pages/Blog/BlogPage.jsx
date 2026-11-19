import React from 'react'

import './BlogNews.css'
import underConstrutionGif from '../../assets/construction_paint_bg_f2f2ed.gif'


const BlogPage = () => {
  return (
    <section className='blog-page'>
        <p className='under-construction'>Blog Page Is Under Construction</p>
       <img src={underConstrutionGif} alt="Under Construction" srcset="" />        
    </section>
   
  )
}

export default BlogPage
