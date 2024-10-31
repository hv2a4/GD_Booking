import React from "react";
import LayoutStaff from "../../../components/layout/staff";
import ScheduleBoard from "./ScheduleBoard";
import FillterDateHome from "./FillterDate";

const HomeStaff = () => {
    return(
        <LayoutStaff>
            <FillterDateHome/>
            <ScheduleBoard/>
        </LayoutStaff>
    )
}

export default HomeStaff;