import React from "react";

const Card = ({ data, openViewModal }) => {
    return (
        <>
            <div className="card" onClick={() => openViewModal(data)}>
                <div className="best">
                    {data.rating}
                </div>
                <div className="img">
                    {typeof data.profile_img === "string" ? <img src={data.profile_img} alt="profile_image" /> :
                        <>
                            {data.profile_img.map((file) => (
                                <img
                                    key={file.uid}
                                    src={file.url || URL.createObjectURL(file.originFileObj)}
                                    alt="Profile"
                                // style={{ width: '50px', height: '50px' }}
                                />
                            ))}
                        </>
                    }
                </div>
                <h1>{data.name}</h1>
                <div className="action">
                    <p>{data.specialty}</p>
                    <p>{data.location}</p>
                </div>
            </div>
        </>
    )
}

export default Card