import { Box, Card, CardContent, CardMedia, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import search_bg from '../images/search_bg.jpeg';
import TitleAndSearch from "../component/TitleAndSearch.component";
import { searchInputs } from "../component/searchForm.component";
import { getHistory } from "../service/api";
import { isEmpty } from "lodash";


const History = () => {

    const [tab, setTab] = useState('all');

    const [userInfo, setUserInfo] = useState() as any;

    const [list, setList] = useState() as any[];

    const handleChange = (e: any, value: string) => {
        console.log(value);
        setTab(value);
    };

    const onSubmit = (value: searchInputs) => {

        const userInfo: any = JSON.parse(sessionStorage.getItem("userInfo") as any);

        if (!userInfo) {
            window.location.href = '/auth/login';
            return;
        };

        window.location.href = `/search?name=${value.name}&distance=${value.distance}`;
    };

    useEffect(() => {

        let newUserInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
        
        setUserInfo(newUserInfo);
        
    }, []);

    useEffect(() => {
        if(userInfo) {
            let data = {
                cid: userInfo.cid,
                status: tab
            };
            getHistory(data).then((res: any) => {
                setList(res);
            });
        }

    }, [userInfo, tab]);

    const renderList = () => {
        if(!isEmpty(list)) {
            return list.map((item: any) => {
                const img = item.image || '/images/res_default.png';
                const items = JSON.parse(item.items);
                const time = new Date(item.order_time).toLocaleString();
                return (
                    <Card sx={{ maxWidth: 1200, padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                        <CardMedia image={img} sx={{ height: '250px', width: '250px' }} />
                        <CardContent sx={{ minWidth: '200px' }}>
                            <Stack spacing={2}>
                                <Typography variant="h6" component='span'>Order ID: {item.oid}</Typography>
                                <Typography variant="h6" component='span'>Restaurant Name: {item.title}</Typography>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="subtitle1">{item.description}</Typography>
                                <Typography variant="body1">Total price: ${item.total_price}</Typography>
                                <Typography variant="body1">Time: {time}</Typography>
                            </Stack>
                        </CardContent>
                        <CardContent sx={{ minWidth: '200px' }}>
                            <Typography variant="h6">Items List:</Typography>
                            <ul>
                                {items.map((dish: any, key: number) => {
                                    return <li key={key}>
                                        <Typography variant="body2">{dish.name}</Typography>
                                        <Typography variant="body2"> x{dish.count}</Typography>
                                    </li>
                                })}
                            </ul>
                        </CardContent>
                    </Card>
                );
            });
        }
    };


    return (
        <Box sx={{ width: '100%',  background: `url(${search_bg})`, backgroundSize: 'cover'}}>
            <TitleAndSearch
                onSubmit={onSubmit}
            />
            <Container >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs sx={{ color: 'white' }}  value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{ color: 'white' }} color='white' label="All" value='all'></Tab>
                        <Tab sx={{ color: 'white' }} label="Submitted" value='submitted'></Tab>
                        <Tab sx={{ color: 'white' }} label="Processing" value='processing'></Tab>
                        <Tab sx={{ color: 'white' }} label="Finished" value='finished'></Tab>
                    </Tabs>
                </Box>
                <Stack spacing={4} mt={4} mb={4}>
                    {renderList()}
                </Stack>
            </Container>
        </Box>
    );
};

export default History;