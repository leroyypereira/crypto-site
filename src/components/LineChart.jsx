import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;

// import React, { useState } from 'react';
// import HTMLReactParser from 'html-react-parser';
// import { useParams } from 'react-router-dom';
// import millify from 'millify';
// import { Col, Row, Typography, Select } from 'antd';
// import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

// import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
// import Loader from './Loader';
// import LineChart from './LineChart';

// const { Title, Text } = Typography;
// const { Option } = Select;

// const CryptoDetails = () => {
//   const { coinId } = useParams();
//   const [ timePeriod, setTimperiod ] = useState('7d')
//   const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
//   const cryptoDetails = data?.data?.coin;

//   if (isFetching) return <Loader />;

//   const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

//   const stats = [
//     { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
//     { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
//     { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
//     { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
//     { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
//   ];

//   const genericStats = [
//     { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
//     { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
//     { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
//     { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
//     { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
//   ];

//   return (
//     <Col className="coin-detail-container">
//       <Col className="coin-heading-container">
//         <Title level={2} className="coin-name">
//           {cryptoDetails.name} ({cryptoDetails.slug}) Price
//         </Title>
//         <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
//       </Col>
//       <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimperiod(value)}>
//         {time.map((date) => <Option key={date}>{date}</Option>)}
//       </Select>
      
//       <Col className="stats-container">
//         <Col className="coin-value-statistics">
//           <Col className="coin-value-statistics-heading">
//             <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
//             <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
//           </Col>
//           {stats.map(({ icon, title, value }) => (
//             <Col className="coin-stats">
//               <Col className="coin-stats-name">
//                 <Text>{icon}</Text>
//                 <Text>{title}</Text>
//               </Col>
//               <Text className="stats">{value}</Text>
//             </Col>
//           ))}
//         </Col>
//       </Col>
//     </Col>
//   )
// }

// export default CryptoDetails;