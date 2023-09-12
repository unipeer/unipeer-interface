import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: {
    small: string;
    large: string;
  };
}

const CryptoIcon: React.FC<{ symbol: string }> = ({ symbol }) => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}`
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, [symbol]);

  if (!cryptoData) {
    return null;
  }

  return (
    <div>
      <img
        src={cryptoData.image.large}
        alt={`${cryptoData.name} (${cryptoData.symbol}) Icon`}
      />
    </div>
  );
};

export default CryptoIcon;
