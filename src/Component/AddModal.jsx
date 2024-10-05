import React, { useState } from 'react';
import { Button, Form, Input, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const AddModal = ({ close, visible, setDoctors, doctors }) => {
    const initialValues = {
        "id": "",
        "name": "",
        "specialty": "",
        "location": "",
        "rating": "",
        "phone": "",
        "email": "",
        "profile_img": [],
        "description": ""
    }
    const [formValues, setFormValues] = useState(initialValues)

    const handleChange = (file) => {
        console.log("uploaded file", file)
        setFormValues({
            ...formValues,
            profile_img: file.fileList,
        });
    };

    const handleSubmit = (values) => {
        setDoctors([...doctors, { ...values, profile_img: formValues.profile_img, id: (Number(doctors[doctors.length - 1].id) + 1) }]);
        setFormValues(initialValues)
        close()
    };

    return (
        <>
            <Modal
                title="Add new doctor"
                open={visible}
                onCancel={close}
                width={520}
                footer={null}
            >
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input
                            value={formValues.name}
                            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Specialty"
                        name="specialty"
                        rules={[{ required: true, message: 'Please enter your specialty!' }]}
                    >
                        <Input
                            value={formValues.specialty}
                            onChange={(e) => setFormValues({ ...formValues, specialty: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true, message: 'Please enter your location!' }]}
                    >
                        <Input
                            value={formValues.location}
                            onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please enter your rating!' }]}
                    >
                        <Input
                            value={formValues.rating}
                            onChange={(e) => setFormValues({ ...formValues, rating: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input
                            value={formValues.email}
                            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mobile Number"
                        name="mobile"
                        rules={[
                            { required: true, message: 'Please enter your mobile number!' },
                            {
                                pattern: /^[0-9]{10}$/,
                                message: 'Mobile number must be exactly 10 digits and contain only numbers!',
                            },
                        ]}
                    >
                        <Input
                            value={formValues.mobile}
                            onChange={(e) => setFormValues({ ...formValues, mobile: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter description!' }]}
                    >
                        <TextArea
                            rows={4}
                            value={formValues.mobile}
                            onChange={(e) => setFormValues({ ...formValues, mobile: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Profile Picture"
                        name="profile_img"
                        rules={[{ required: true, message: 'Please upload the image!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={formValues.profile_img}
                            onChange={handleChange}
                            accept="image/*"
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            {formValues.profile_img.length < 1 && (
                                <div>
                                    <UploadOutlined />
                                    <div>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddModal;