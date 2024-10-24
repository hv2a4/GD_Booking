import React from "react";
import RoomPowerComponent from "../Admin_Hotel_Ower/page_admin/chartPie";
import LineChartExample from "../Admin_Hotel_Ower/page_admin/line_chart/LineChart";
import BarChartExample from "../Admin_Hotel_Ower/page_admin/BarChartExample/BarChartExample";
import RoomTable from "../Admin_Hotel_Ower/page_admin/RoomTable/RoomTable";
import LayoutAdmin from "../../../components/layout/admin/DefaultLayout";
const HomeAdmin = () => {
    return (
        <LayoutAdmin>
            <div className="container-fluid">
                <RoomPowerComponent />
                <LineChartExample />
                <BarChartExample />
                <RoomTable/>
            </div>
        </LayoutAdmin>
    );
};

export default HomeAdmin; 