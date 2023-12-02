import ProjectDetailTable from "./commom-table";

const PoolInfo=({detail})=>{
    const key=[
        "title",
        "value"
    ]
    const data=[
        {
            [key[0]]:"Opens",
            [key[1]]:detail.startDate,
        },
        {
            [key[0]]:"FCFS Opens",
            [key[1]]: "No data",
        },
        {
            [key[0]]:"Closes",
            [key[1]]: detail.endDate,
        },
        {
            [key[0]]:"Swap Rate",
            [key[1]]: detail.swapRate,
        },
        {
            [key[0]]:"Cap",
            [key[1]]: detail.cap,
        },
        {
            [key[0]]:"Total Users Participated",
            [key[1]]:detail.participants
        },
        {
            [key[0]]:"Total Funds Swapped",
            [key[1]]:detail.totalSwapped
        },
        {
            [key[0]]:"Access Type",
            [key[1]]:detail.access
        },
    ]


   
    const header=["Pool Information"];
    return(
            <ProjectDetailTable objectKey={key} detail={data} header={header}/>
    )
}

export default PoolInfo;