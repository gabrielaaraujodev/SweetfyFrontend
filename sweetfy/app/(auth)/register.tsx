import DinamicButton from '@/components/Buttons';
import DividerWithText from '@/components/DividerWithText';
import InputItens from '@/components/Inputs';
import { primaryTheme, theme } from '@/theme/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { fetchRegister } from '../../api/auth/auth';
import { InputsContent } from '../components/Templates/auth/styles';
import AuthTemplate from '@/components/Templates/auth';
import DinamicSnackbar, {
  DinamicSnackbarType,
} from '@/components/DinamicSnackbar';

const RegisterPageComponent = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bakeryName, setBakeryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] =
    useState<DinamicSnackbarType>('error');

  const router = useRouter();

  return (
    <AuthTemplate subtitle="Cadastre-se e faça parte da nossa comunidade!">
      <InputsContent>
        <InputItens
          requiredField
          inputStyle={{ height: 40 }}
          inputMode="text"
          theme={primaryTheme}
          placeholder="Nome"
          title="Insira seu nome"
          setInputValue={setFullName}
          value={fullName}
        />
        <InputItens
          requiredField
          inputStyle={{ height: 40 }}
          inputMode="text"
          theme={primaryTheme}
          placeholder="Nome da Confeitaria"
          title="Insira o nome da confeitaria"
          setInputValue={setBakeryName}
          value={bakeryName}
        />
        <InputItens
          requiredField
          inputStyle={{ height: 40 }}
          inputMode="email"
          theme={primaryTheme}
          placeholder="E-mail"
          title="Insira seu email"
          setInputValue={setEmail}
          value={email}
        />
        <InputItens
          requiredField
          inputStyle={{ height: 40 }}
          inputMode="text"
          theme={primaryTheme}
          placeholder="Senha"
          title="Cadastre sua senha"
          securityRequired
          setInputValue={setPassword}
          value={password}
        />
      </InputsContent>

      {loading ? (
        <ActivityIndicator
          animating={true}
          color={theme.colors.yellowLight}
        />
      ) : (
        <DinamicButton
          buttonStyle={{ width: '80%' }}
          buttonText="Cadastrar"
          type="brownLight"
          onPress={handleRegister}
        />
      )}
      <DividerWithText
        text="Já tem uma conta? Clique no botão e logue-se!"
        style={{ width: '85%' }}
      />

      <DinamicButton
        buttonStyle={{ width: '80%' }}
        buttonText="Login"
        onPress={() => router.replace('/login')}
        type="outlined"
        disabled={loading}
      />
      <DinamicSnackbar
        OnDismissFunction={() => setShowResponseStatus(false)}
        isVisible={showResponseStatus}
        type={responseStatusMessage}
      />
    </AuthTemplate>
  );
};

export default RegisterPageComponent;
