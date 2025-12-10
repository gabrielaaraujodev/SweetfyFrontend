import { useState } from 'react';
import InputItens from '../Inputs';
import { primaryTheme } from '../../theme/theme';

interface ISearchComponent {
  placeholderText: string;
  handleSearch?: () => void; //tornar obrigatório depois
}

const SearchComponent = ({
  handleSearch,
  placeholderText,
}: ISearchComponent) => {
  const [searchTextValue, setSearchTexValue] = useState('');
  const searchFunction = () => {
    console.log('implementar function');
  };

  return (
    <InputItens
      theme={primaryTheme}
      inputMode="text"
      placeholder={placeholderText}
      rightIcon="magnify"
      rightIconFunction={searchFunction}
      containerStyle={{ flex: 1 }}
      onChangeText={setSearchTexValue}
      value={searchTextValue}
      keyboardType="default"
    />
  );
};

export default SearchComponent;
