import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import { RoomPriceSearchAndAdd, BranchInfo, RoomRatesTable } from "./RoomPriceManager";

const DiscountManager = () => {
    return (
        <>
            <Container fluid>
                
                <Card>
                    <Card.Body>
                        <Row>
                            {/*Tìm kiếm và nút thêm */}
                            <RoomPriceSearchAndAdd />
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    {/*Bảng hệ thống giảm giá*/}
                    <RoomRatesTable />
                </Card>
            </Container>
        </>
    );
}

export default DiscountManager;