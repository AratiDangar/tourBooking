import React from 'react'
import galleryImage from './galleryimages'

import Masonry,{ResponsiveMasonry} from 'react-responsive-masonry'
import img from './galleryimages'
const Gallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350:1,768:3,992:4}}>
<Masonry gutter='2rem'>
{
    galleryImage.map((item,index)=>(
        <img className='masonry_img'
        
        src={item} key={index} style={{'width':'100%','display':'block','borderRadius':'10px'}}/>
    ))
}
</Masonry>
    </ResponsiveMasonry>
  )
}

export default Gallery
