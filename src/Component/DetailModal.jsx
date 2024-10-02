import React from 'react';
import { Button, Modal, Image, Descriptions } from 'antd';

const DetailModal = ({ close, viewData }) => {
    return (
        <>
            <Modal
                title="Doctor's Detail"
                open={viewData !== null}
                onCancel={close}
                width={720}
                footer={[
                    <Button key="ok" type="primary" style={{ display: 'block', margin: '0 auto' }} onClick={close} className="applyBtn">
                        OK
                    </Button>
                ]}
            >
                <div className="detail-wrapper">
                    <div className="img-container">
                        {typeof viewData.profile_img === "string" ? <Image src={viewData.profile_img} alt="profile_image" width={200} /> :
                            <>
                                {viewData.profile_img.map((file) => (
                                    <Image
                                        key={file.uid}
                                        src={file.url || URL.createObjectURL(file.originFileObj)}
                                        alt="Profile"
                                        width={200}
                                    />
                                ))}
                            </>
                        }
                    </div>
                    <div className="detail-container">
                        <Descriptions title="Personal info" layout="vertical" style={{ marginBottom: "10px" }}>
                            <Descriptions.Item label="Name">{viewData.name}</Descriptions.Item>
                            <Descriptions.Item label="Telephone">{viewData.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address">{viewData.location}</Descriptions.Item>
                            <Descriptions.Item label="E-mail">{viewData.email}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions title="Professional info" layout="vertical" column={2}>
                            <Descriptions.Item label="Specialty">{viewData.specialty}</Descriptions.Item>
                            <Descriptions.Item label="Rating">{viewData.rating}</Descriptions.Item>
                            <Descriptions.Item label="Description" span={2}>{viewData.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DetailModal;