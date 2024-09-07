import React from "react";
import galleryImages from "./galleryImages"
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

const Collage=()=>{
    return(
        <ResponsiveMasonry columnsCountBreakPoints={{350:1,768:3,992:4}}>
         <Masonry gutter='1rem'>
         {galleryImages.map((item, index) => (
    item ? (
        <img
            className="masonry__img"
            src={item}
            key={index}
            alt=""
            style={{
                width: "100%",
                display: "block",
                borderRadius: "10px",
            }}
        />
    ) : null
))}

         </Masonry>
        </ResponsiveMasonry>
    )
}
export default Collage;