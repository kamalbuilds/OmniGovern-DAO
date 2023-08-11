import React, { useContext } from 'react';
import { AssetPriceContext } from '../context/AssetPriceContext';
import { Card, Button, Divider, Text, useTheme } from '@geist-ui/core';
import ethusd from '../assets/ethusd.png';
import btc from '../assets/btc.png';
import eur from '../assets/eur.png';

const BALANCE_ETH = 1;
const BALANCE_BTC = 1;
const BALANCE_EUR = 1;

export const EthBalance: React.FC = () => {
  const { ethConversionRate, ethConversionDate, btcConversionRate, btcConversionDate, eurConversionDate, eurConversionRate } = useContext(
    AssetPriceContext
  );

  const ethBalanceUSD = ethConversionRate ? BALANCE_ETH * ethConversionRate : '...';
  const btcBalanceETH = btcConversionRate ? BALANCE_BTC / btcConversionRate : '...';
  const eurBalanceETH = eurConversionRate ? BALANCE_EUR / eurConversionRate : '...';

  const updatedAt = ethConversionDate
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(ethConversionDate))
    : '...';

  const updatedAtbtc = btcConversionDate
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(btcConversionDate))
    : '...';

  const updatedAteur = eurConversionDate
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(eurConversionDate))
    : '...';

  const theme = useTheme();

  return (
    <>
      <h1 className="text-xl text-center text-color-sky my-3">
        Price Feed Data from Chainlink to easily compare cryptos for supporting the campaigns
      </h1>
      <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 my-6">
        <div className="flex items-center justify-center">
          <Card shadow className={`rounded-lg ${theme.type === 'dark' ? 'dark' : ''}`} style={{ height: '100%' }}>
            <div className="flex items-center justify-center">
              <img src={ethusd} alt="ETH / USD" className="p-2" style={{ width: '200px', height: '200px' }} />
            </div>
            <Text h4 className="text-center">
              ETH / USD
            </Text>
            <Divider />
            <Text>
              The Current Price of {BALANCE_ETH} ETH is {ethBalanceUSD} USD
            </Text>
            <Text className="text-gray-500 text-sm">Updated at {updatedAt}</Text>
            <Divider />
            <Button type="secondary" auto>
              Refresh
            </Button>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Card shadow className={`rounded-lg ${theme.type === 'dark' ? 'dark' : ''}`} style={{ height: '100%' }}>
            <div className="flex items-center justify-center">
              <img src={btc} alt="BTC / USD" className="p-2" style={{ width: '200px', height: '200px' }} />
            </div>
            <Text h4 className="text-center">
              BTC / USD
            </Text>
            <Divider />
            <Text>
              The Current Price of {BALANCE_BTC} BTC is {btcBalanceETH} USD
            </Text>
            <Text className="text-gray-500 text-sm">Updated at {updatedAtbtc}</Text>
            <Divider />
            <Button type="secondary" auto>
              Refresh
            </Button>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Card shadow className={`rounded-lg ${theme.type === 'dark' ? 'dark' : ''}`} style={{ height: '100%' }}>
            <div className="flex items-center justify-center">
              <img src={eur} alt="EUR / USD" className="p-2" style={{ width: '200px', height: '200px' }} />
            </div>
            <Text h4 className="text-center">
              EUR / USD
            </Text>
            <Divider />
            <Text>
              The Current Price of {BALANCE_EUR} EUR is {eurBalanceETH} USD
            </Text>
            <Text className="text-gray-500 text-sm">Updated at {updatedAteur}</Text>
            <Divider />
            <Button type="secondary" auto>
              Refresh
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};
