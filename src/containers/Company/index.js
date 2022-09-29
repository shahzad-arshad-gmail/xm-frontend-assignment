import React, {useEffect, useMemo, useState} from 'react'
import ROUTES from '../../routes/paths'
import Table from "../../components/Table";
import {getAllHistoricalQuotes} from "../../utils/apiCall";
import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";


function Company() {
    const data01 = [
        {name: 'Open', value: 400},
        {name: 'Close', value: 300},
    ];
    const navigate = useNavigate();


    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true)
    const columns = useMemo(
        () => [
            {
                Header: "Historical Data",
                columns: [
                    {
                        Header: "Date",
                        accessor: "date"
                    },
                    {
                        Header: "Open",
                        accessor: "open"
                    },
                    {
                        Header: "High",
                        accessor: "high"
                    },
                    {
                        Header: "Low",
                        accessor: "low"
                    },
                    {
                        Header: "Close",
                        accessor: "close"
                    },
                    {
                        Header: "Volume",
                        accessor: "volume"
                    },

                ]
            },
        ],
        []
    );

    const handleClick = () => {
        navigate(ROUTES.CREATE)
    }


    useEffect(() => {
        (async () => {
            let sumOpen = 0;
            let sumClose = 0;
            const chatDataArray = []
            const result = await getAllHistoricalQuotes();
            console.log(result)
            setData(result.prices);

            for (let i = 0; i <= result.prices.length; i++) {
                // console.log(result.prices[i].open,"result.prices[i].open")
                if (isNaN(result.prices[i]?.open)) {
                } else {
                    sumOpen = sumOpen + result.prices[i]?.open
                }
                if (isNaN(result.prices[i]?.close)) {
                } else {
                    sumClose = sumOpen + result.prices[i]?.close
                }
            }

            console.log(sumOpen, "sumOpen")
            console.log(sumClose, "sumClose")

            const dataUpdated = [
                {name: 'Open', value: sumOpen},
                {name: 'Close', value: sumClose},
            ];

            setChartData(dataUpdated)
            setLoading(false)

        })();
    }, []);


    return (

        <>
            {
                loading ? 'Loading Data' : ''
            }
            {chartData &&
                <div className="App">

                    <div className={'float-right'}>
                        <Button className={"w-52 float-right"} onClick={handleClick} variant="outlined">+ Company
                            Symbol</Button>
                    </div>

                    <div className={"ml-96"}>

                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip/>
                        </PieChart>


                    </div>

                    <Table columns={columns} data={data}/>
                </div>
            }
        </>
    )
}

export default Company
