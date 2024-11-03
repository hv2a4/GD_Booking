import React, { useState } from "react";
import LayoutAdmin from "../../../../components/layout/admin/DefaultLayout";
import { Container, Tabs, Tab } from "react-bootstrap";
import ListService from "./list-service";
import ServiceRoomInfo from "./service-room-info";

const ServiceRoom = () => {
    return (
        <LayoutAdmin>
            <Container>
                <Tabs
                    defaultActiveKey="dichvu"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="dichvu" title="Dịch vụ">
                        <ServiceRoomInfo/>
                    </Tab>
                    <Tab eventKey="profile" title="Danh sách dịch vụ">
                        <ListService/>
                    </Tab>
                </Tabs>
            </Container>
        </LayoutAdmin>
    );
};

export default ServiceRoom;
