import { IService } from '@/api/register/types';
import { getAbbreviationUnitType } from '@/pagesContent/registerItems/utils';
import { H6_bold, H6 } from '@/theme/fontsTheme';
import { theme } from '@/theme/theme';
import { TouchableOpacity, View } from 'react-native';

interface IServiceCard {
  serviceData: IService;
  selectCardFunction?(): void;
  selected?: boolean;
}

const ServiceCard = ({
  serviceData,
  selectCardFunction,
  selected,
}: IServiceCard) => {
  return (
    <TouchableOpacity
      onPress={selectCardFunction}
      style={{
        borderLeftWidth: 6,
        borderLeftColor: theme.colors.pinkRed,
        borderColor: theme.colors.pinkRed,
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 12,
        gap: 2,
        backgroundColor: selected
          ? theme.colors.lightBlue
          : theme.colors.inputWhite,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <H6_bold colorKey="darkBrown">{serviceData.name}</H6_bold>
        <H6 colorKey="darkBrown">
          R${serviceData.unitPrice.toFixed(2)}
          {getAbbreviationUnitType(serviceData.unit.toString()) === 'hora(s)'
            ? '/hr.'
            : '/unid.'}
        </H6>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <H6 colorKey="darkBrown">{serviceData.providerName}</H6>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
