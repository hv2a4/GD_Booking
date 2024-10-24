import React, { useState } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import '../Filter/style/customCss.css';
import { Add_Area } from '../Rom/AddAndUpdate';
function SearchBox() {
    return (
        <Card style={{ padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body>
                <Card.Title>Tìm kiếm</Card.Title>
                <Form.Group controlId="search">
                    <Form.Control type="text" placeholder="Tìm kiếm hạng phòng" />
                </Form.Group>
            </Card.Body>
        </Card>
    );
}

function StatusSelector() {
    const [status, setStatus] = useState('dangKinhDoanh');

    return (
        <Card style={{ padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Card.Body>
                <Card.Title><strong>Trạng thái</strong></Card.Title>
                <Form>
                    <Form.Check
                        type="radio"
                        label="Còn trống"
                        name="status"
                        id="activeBusiness"
                        checked={status === 'activeBusiness'}
                        onChange={() => setStatus('activeBusiness')}
                    />
                    <Form.Check
                        type="radio"
                        label="Đang sử dụng"
                        name="status"
                        id="inactiveBusiness"
                        checked={status === 'inactiveBusiness'}
                        onChange={() => setStatus('inactiveBusiness')}
                    />
                    <Form.Check
                        type="radio"
                        label="Tất cả"
                        name="status"
                        id="getAll"
                        checked={status === 'getAll'}
                        onChange={() => setStatus('getAll')}
                    />
                </Form>
            </Card.Body>
        </Card>
    );
}

function RoomTypeSelector() {
    const [searchTerm, setSearchTerm] = useState('');

    const roomTypes = [
        'Phòng 01 giường đôi cho 2 người',
        'Phòng 01 giường đôi và 1 giường đơn cho 3 người',
        'Phòng 01 giường đơn',
        'Phòng 02 giường đơn',
        'Vip',
    ];

    const filteredRoomTypes = roomTypes.filter(room =>
        room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Hạng phòng</Accordion.Header>
                <Accordion.Body>
                    <Form.Group controlId="searchRoomType">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm hạng phòng"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                    <hr />
                    <strong>Tất cả</strong>
                    <ul className="list-unstyled mt-2">
                        {filteredRoomTypes.map((room, index) => (
                            <li key={index}>{room}</li>
                        ))}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

function AreaSelector() {
    const [searchTerm, setSearchTerm] = useState('');

    const areas = ['Tất cả', 'Tầng 2', 'Tầng 3', 'Tầng 4', 'Tầng 5'];

    const filteredAreas = areas.filter(area =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    Khu vực
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Add_Area />
                </Accordion.Header>
                <Accordion.Body>
                    <Form.Group controlId="searchArea">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm khu vực"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                    <hr />
                    <ul className="list-unstyled mt-2">
                        {filteredAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export { SearchBox, StatusSelector, RoomTypeSelector, AreaSelector };