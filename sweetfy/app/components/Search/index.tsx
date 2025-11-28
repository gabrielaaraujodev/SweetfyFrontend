import { useState } from 'react';
import InputItens from '../Inputs';
import { primaryTheme } from '@/theme/theme';

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
      inputStyle={{ height: 40 }}
      containerStyle={{ flex: 1 }}
      setInputValue={setSearchTexValue}
      value={searchTextValue}
    />
  );
};

export default SearchComponent;
