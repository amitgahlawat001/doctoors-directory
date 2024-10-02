import React from "react";

const Card = ({ data, openViewModal }) => {
    // console.log("data?.profile_img", URL.createObjectURL(data?.profile_img))
    const imageUrl = typeof data?.profile_img === "string" ? data?.profile_img : data.profile_img.map(file => {
        return {
            uid: file.uid,
            name: file.name,
            status: file.status,
            url: file.url || (file.originFileObj ? URL.createObjectURL(file.originFileObj) : null),
        };
    });
    return (
        <>
            <div className="card" onClick={() => openViewModal(data)}>
                <div class="best">
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