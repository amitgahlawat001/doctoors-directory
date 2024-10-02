/* eslint-disable no-debugger */
import React, { useState } from "react";
import { Row, Button, Form, Space, Col, Select, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;
const FilterForm = ({
    form,
    locationDropDownList,
    specialtyDropDownList,
    handleSubmit,
    handleFilterReset
}) => {
    const initialValues = {
        location: null,
        search: null,
        specialty: null
    }
    const [filterData, setFilterData] = useState(initialValues);

    const onFinish = () => {
        handleSubmit(filterData);
    };

    const handleChange = (key, value) => {
        setFilterData({ ...filterData, [key]: value })
    }

    const handleReset = () => {
        handleFilterReset()
        setFilterData(initialValues)
    }

    return (
        <Form
            form={form}
            id="filter_form"
            className="filter-form"
            onFinish={onFinish}
        >
            <Row gutter={[15, 15]} className="filterForm">
                <Col xs={{ span: 24 }} md={{ span: 6 }}>
                    <Search
                        placeholder="Search by name"
                        enterButton={<Button disabled icon={<SearchOutlined />} />}
                        allowClear
                        value={filterData.search}
                        onChange={(e) => handleChange("search", e.target.value)}
                        className="custom-search"
                    />

                </Col>
                <Col xs={{ span: 24 }} md={{ span: 6 }}>
                    <Select
                        showSearch
                        allowClear
                        onClear={() => handleChange("location", null)}
                        placeholder="Select a location"
                        optionFilterProp="children"
                        name="location"
                        value={filterData.location}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().includes(input.toLowerCase())
                        }
                        style={{ width: "100%" }}
                        onSelect={(e) => handleChange("location", e)}
                    >
                        {locationDropDownList.map(location => (
                            <Select.Option key={location.key} value={location.key}>
                                {location.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 6 }}>
                    <Select
                        showSearch
                        allowClear
                        onClear={() => handleChange("specialty", null)}
                        placeholder="Select a specialty"
                        optionFilterProp="children"
                        name="specialty"
                        onSelect={(e) => handleChange("specialty", e)}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().includes(input.toLowerCase())
                        }
                        value={filterData.specialty}
                        style={{ width: "100%" }}
                    >
                        {specialtyDropDownList.map(specialty => (
                            <Select.Option key={specialty.key} value={specialty.key}>
                                {specialty.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 6 }}>
                    <Form.Item>
                        <Space align="end">
                            <Button
                                type="primary"
                                htmlType="button"
                                className="clearBtn"
                                onClick={handleReset}
                            >
                                Clear Filter
                            </Button>
                            <Button
                                type="primary"
                                className="applyBtn"
                                htmlType="submit"
                                form="filter_form"
                            >
                                Apply Filter
                            </Button>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterForm;
