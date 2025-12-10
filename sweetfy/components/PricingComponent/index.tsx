import { H5, H6_medium, P } from '../../theme/fontsTheme';
import DinamicButton from '../Buttons';
import { useEffect, useState } from 'react';
import SpecificFormatInput from '../Inputs/SpecificFormatInput';
import { includedItemFields } from '@/pagesContent/registerItems/products';
import PricingRow from './PricingRow';
import {
  PricingContainer,
  TableContainer,
  TableHeader,
  TitleContainer,
} from './styles';

interface IPricingComponent {
  includedItemsDraft: includedItemFields[];
  totalCost: number;
  setFinalProfit(value: number): void;
}

const PricingComponent = ({
  includedItemsDraft,
  totalCost,
  setFinalProfit,
}: IPricingComponent) => {
  const [profitValue, setProfitValue] = useState<number | null>();
  const [profitOptions, setProfitOptions] = useState<number[]>([]);

  useEffect(() => {
    if (includedItemsDraft.length === 0) {
      setProfitOptions([]);
      setProfitValue(null);
    }
  }, [includedItemsDraft, totalCost]);

  const handleUpdateOption = (index: number, updatedProfitValue: number) => {
    const updatedOptions = [...profitOptions];
    updatedOptions[index] = updatedProfitValue;
    setProfitOptions(updatedOptions);
  };

  return (
    <PricingContainer>
      <H5>Precificação *</H5>
      <P>
        Pequeno texto explicativo sobre como nosso sistema de precificação
        funciona
      </P>
      <TitleContainer>
        <SpecificFormatInput
          value={Number(profitValue)}
          type="percentage"
          onChangeValue={setProfitValue}
          placeholder="ex.: 20%, 70.5%, 85%..."
        />
        <DinamicButton
          buttonText="Calcular"
          onPress={() => {
            if (
              profitValue &&
              profitValue !== 0 &&
              !profitOptions.includes(profitValue)
            ) {
              setProfitOptions([...profitOptions, profitValue]);
            }
          }}
          type="yellow"
          smallText
          disabled={totalCost === 0}
        />
      </TitleContainer>
      {profitOptions.length > 0 && totalCost > 0 && (
        <TableContainer>
          <TableHeader
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              maxWidth: '84%',
            }}
          >
            <P style={{ width: '17%' }}>Custo</P>
            <P style={{ maxWidth: '20%' }}>Preço de venda</P>
            <P style={{ width: '12%', left: 10 }}>Ação</P>
            <H6_medium style={{ width: '25%', textAlign: 'center' }}>
              %Lucro
            </H6_medium>{' '}
          </TableHeader>
          {profitOptions.map((profitOption, key) => (
            <PricingRow
              key={key}
              cost={totalCost}
              profit={profitOption}
              currentSelectedProfit={profitValue}
              setCurrentSelectedProfit={(profit) => {
                setFinalProfit(profit);
                setProfitValue(profit);
              }}
              onUpdateProfit={(updatedItem) =>
                handleUpdateOption(key, updatedItem)
              }
            />
          ))}
        </TableContainer>
      )}
    </PricingContainer>
  );
};

export default PricingComponent;
