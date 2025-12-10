import React from "react";

export const ViewUrl = (data: any) =>{

    switch(data.data.type){
        case "video":
            return(
                <video autoPlay loop muted playsInline preload="auto" id="myVideo">
                    <source src={data.data.url} type="video/mp4"/>
                </video>
            )
        case "img":
            return(
                <img
                    src={data.data?.url}
                    alt="Images Product"
                    className="w-full h-100 object-cover rounded-lg mb-6 shadow"
                />
            )
        default:
            return(<></>)
    }

}
