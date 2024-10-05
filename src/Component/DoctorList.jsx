import { Col, Row, Spin, Button } from 'antd';
import React, { useState } from 'react';
import Card from './Card';
import { PlusOutlined } from '@ant-design/icons';

const DoctorList = ({
    filteredDoctors,
    currentPage,
    setCurrentPage,
    loader,
    setLoader,
    openViewModal,
    openAddModal
}) => {
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    const paginate = (pageNumber) => {
        setLoader(true)
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setLoader(false)
        }, 500);
    }

    return (
        <div>
            <div className="pageHeading">
                <h1 style={{ marginLeft: "45%" }}>Doctors List</h1>
                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => openAddModal()} />
            </div>
            {loader ? <Spin tip="Loading" size="large" /> :
                <>
                    <Row gutter={[15, 15]}>
                        {currentItems.map((doctor) => (
                            <Col md={{ span: 8 }} lg={{ span: 6 }}>
                                <Card data={doctor} openViewModal={openViewModal} />
                            </Col>
                        ))}
                    </Row>

                    <div className='paginationBtn'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <span
                                key={index}
                                onClick={() => paginate(index + 1)}
                                disabled={currentPage === index + 1}
                                className={currentPage === index + 1 ? 'disabled' : ''}
                            >
                                {index + 1}
                            </span>
                        ))}
                    </div>
                </>}
        </div>
    );
};

export default DoctorList;
