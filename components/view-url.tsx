import React from "react";

export const ViewUrl = (type: any, url: any, alt: any) =>{

    switch(type){
        case "video":
            return <div dangerouslySetInnerHTML={{ __html: url }} />
        case "img":
            return(
                <img
                    src={url}
                    alt={alt}
                    className="w-full h-100 object-cover rounded-lg mb-6 shadow"
                />
            )
        default:
            return(<></>)
    }

}
