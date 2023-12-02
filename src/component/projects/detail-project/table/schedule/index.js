import ProjectDetailTable from "../project-detail/commom-table";

const ScheduleTable=()=>{
    const header=[
        "Round",
        "Opens",
        "Closes"
    ];

    const detail=[
        {
            [header[0]]:"Allocation",
            [header[1]]:"2022-01-11 08:00:00 UTC",
            [header[2]]:"2022-01-11 12:45:00 UTC"
        },
        {
            [header[0]]:"FCFS - Prepare",
            [header[1]]:"2022-01-11 12:45:00 UTC",
            [header[2]]:"2022-01-11 13:00:00 UTC"
        },
        {
            [header[0]]:"FCFS - Start",
            [header[1]]:"2022-01-11 13:00:00 UTC",
            [header[2]]:"2022-01-11 14:00:00 UTC"
        },
    ]
    
        return (
            <ProjectDetailTable header={header} detail={detail} objectKey={header}/>
        )
}   

export default ScheduleTable;