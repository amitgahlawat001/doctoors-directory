import "./App.css";
import DoctorList from "./Component/DoctorList";
import { Form, Layout, notification } from "antd";
import { useEffect, useState } from "react";
import FilterForm from "./Component/FilterForm";
import DetailModal from "./Component/DetailModal";
import AddModal from "./Component/AddModal";
const { Content, Footer } = Layout;

function App() {
  const [locationDropDownList, setLocationDropDownList] = useState([]);
  const [specialtyDropDownList, setSpecialtyDropDownList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [form] = Form.useForm();

  const handleFilter = (data) => {
    const name = data?.search;
    const location = data?.location;
    const specialty = data?.specialty;
    let filtered = doctors;
    if (name) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((doctor) => doctor.location === location);
    }

    if (specialty) {
      filtered = filtered.filter((doctor) => doctor.specialty === specialty);
    }
    setTimeout(() => {
      setFilteredDoctors(filtered);
      setCurrentPage(1);
      setActiveFilter(data);
    }, 500);
  };

  useEffect(() => {
    handleFilter(activeFilter);
  }, [doctors, activeFilter, handleFilter]);

  const handleFilterReset = () => {
    setTimeout(() => {
      setFilteredDoctors(doctors);
      setCurrentPage(1);
    }, 500);
  };

  useEffect(() => {
    try {
      setLoader(true);
      fetch("/list.json")
        .then((response) => response.json())
        .then((data) => {
          const uniqueLocations = Array.from(
            new Set(data.map(({ location }) => location))
          );
          const uniqueSpecialty = Array.from(
            new Set(data.map(({ specialty }) => specialty))
          );
          setTimeout(() => {
            setDoctors(data);
            setFilteredDoctors(data);
            setLocationDropDownList(
              uniqueLocations.map((location) => ({
                label: location,
                key: location,
              }))
            );
            setSpecialtyDropDownList(
              uniqueSpecialty.map((specialty) => ({
                label: specialty,
                key: specialty,
              }))
            );
            setLoader(false);
          }, 500);
        });
    } catch (error) {
      notification.error(error + " Error occurred while getting data");
      setLoader(false);
    }
  }, []);

  const openViewModal = (data) => {
    setViewData(data);
  };

  const closeViewModal = () => {
    setViewData(null);
  };

  const openAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  return (
    <div className="App">
      <Layout>
        <FilterForm
          form={form}
          locationDropDownList={locationDropDownList}
          specialtyDropDownList={specialtyDropDownList}
          handleSubmit={handleFilter}
          handleFilterReset={handleFilterReset}
        />
        <Content>
          <div className="main-wrapper">
            <DoctorList
              loader={loader}
              doctors={doctors}
              filteredDoctors={filteredDoctors}
              setFilteredDoctors={setFilteredDoctors}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setLoader={setLoader}
              openViewModal={openViewModal}
              openAddModal={openAddModal}
            />
            {viewData && (
              <DetailModal viewData={viewData} close={closeViewModal} />
            )}
            {isAddModalVisible && (
              <AddModal
                visible={isAddModalVisible}
                close={closeAddModal}
                setDoctors={setDoctors}
                doctors={doctors}
              />
            )}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Amit
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
