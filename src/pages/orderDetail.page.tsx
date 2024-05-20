import { Alert, Box, Button, Container, Rating, Skeleton, Snackbar, Stack, Step, StepLabel, Stepper, Typography, styled } from "@mui/material";
import * as React from 'react';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import TitleAndSearch from "../component/TitleAndSearch.component";
import { searchInputs } from "../component/searchForm.component";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { orderDetail, rating } from "../service/api";
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import BackupIcon from '@mui/icons-material/Backup';
import CheckIcon from '@mui/icons-material/Check';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { mySnackbar } from "./login.page";

const OrderDetail = () => {


    const steps = ['submitted', 'processing', 'processed', 'delivering', 'completed'];

    const [order, setOrder] = useState<any>();

    const [searchParams] = useSearchParams();

    const [value, setValue] = useState<any>(0);

    const [open, setOpen] = useState(false);

    const [snack, setSnack] = useState<mySnackbar>({
        severity: 'success',
        message: '',
    });

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {

      const oid = searchParams.get('oid');

      if(oid) {
        orderDetail({oid}).then((res: any) => {
          setOrder(res);
        }).catch((err) => {
          setSnack({
            severity: 'error',
            message: err.message,
          });
          setOpen(true);
        });
      }
      
    }, [searchParams]);

    const ratingOrder = () => {
      rating({
        oid: order.oid,
        rate: value
      }).then((res) => {
        setSnack({
          severity: 'success',
          message: res.message,
        });
        setOpen(true);
      }).catch((err) => {
        setSnack({
          severity: 'error',
          message: err.message,
        });
        setOpen(true);
      });
    };

    function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    
    const icons: { [index: string]: React.ReactElement } = {
        1: <BackupIcon />,
        2: <StorefrontIcon />,
        3: <AddAlarmIcon />,
        4: <DeliveryDiningIcon />,
        5: <CheckIcon />,
    };
    
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
    }

    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
      }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
      }));
    
    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
          top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`&.${stepConnectorClasses.completed}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`& .${stepConnectorClasses.line}`]: {
          height: 3,
          border: 0,
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
          borderRadius: 1,
        },
      }));

    const onSubmit = (value: searchInputs) => {

      if (!sessionStorage.getItem('userInfo')) {
          window.location.href = '/auth/login';
          return;
      };

      window.location.href = `/search?name=${value.name}&distance=${value.distance}`;
    };

    const renderStepper = () => {
      if(order) {

        
        const list = {
          'Order ID': order.oid,
          'Customer Name': order.customer_name,
          'Customer Address': order.customer_address,
          'Customer Phone': order.customer_phone,
          'Order time': new Date(order.order_time).toLocaleString('en-AU', { timeZone: 'Australia/Sydney'}),
          'Restaurant Name': order.restaurant_title,
          'Restaurant Address': order.restaurant_address,
          'Total Price': order.total_price,
          'Delivery Person Name': order.delivery_name,
          'Delivery Person Phone': order.delivery_phone,
          'Estimate Time': `${order.estimate_time} min` ,
          'Finish Time': order.finish_time ? new Date(order.finish_time).toLocaleString('en-AU', { timeZone: 'Australia/Sydney'}) : undefined,
          'items': order.items
        }

        return <Box>
              <Stepper alternativeLabel activeStep={steps.findIndex((value: string) => value === order?.status)} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel sx={{ color: 'white' }} color="white" StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <Stack spacing={4} >
              <table style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <tbody>
                {Object.entries(list).map((row:any, key: number) => {
                  if(row[0] === 'items'){
                    return <tr key={key}>
                      <td>{row[0]}</td>
                      <td>
                          <ul>
                            {JSON.parse(row[1]).map((item:any, index:number) => {
                              return <li key={index}>{item.name} x {item.count}</li>
                            })}
                          </ul>
                        </td>
                    </tr>
                  }
                  return <tr style={{ margin: 8 }} key={key}>
                    <td>{row[0]}: </td>
                    <td>{row[1]}</td>
                  </tr>
                })}
                </tbody>
              </table>
            </Stack>
          </Box>
      }
      return <Skeleton></Skeleton>
    };

    const renderRating = () => {
      if(!order || order.status !== 'completed') return <></>;
      if(order.rate) {
        return <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5">Rate of this order</Typography>
        <Rating
          name="read-only"
          value={order.rate}
          readOnly
        />
      </Stack>
      }
      return <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5">Rating for this Order!</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Button variant='contained' onClick={() => ratingOrder()}>Submit</Button>
      </Stack>
    };
    

    return <Box sx={{ width: '100%', minHeight: '100vh',  background: 'url(./images/orderDetails.png)', backgroundSize: 'cover'}}>
        <Container maxWidth='xl'>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={snack.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    
                    {snack.message}
                </Alert>
            </Snackbar>
            <TitleAndSearch onSubmit={onSubmit}></TitleAndSearch>
            <Stack p={4} m={4} spacing={4} sx={{ background: 'white', opacity: 0.8, borderRadius: 2 } }>
              <Typography variant="h3">Order Tracking</Typography>
              {renderStepper()}
              {renderRating()}
            </Stack>
        </Container>
    </Box>
}


export default OrderDetail;