import DinamicButton from '@/components/Buttons';
import DividerWithText from '@/components/DividerWithText';
import InputItens from '@/components/Inputs';
import { primaryTheme, theme } from '../../theme/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { fetchRegister } from '../../api/auth/auth';
import AuthTemplate from '@/components/Templates/auth';
import DinamicSnackbar, {
  DinamicSnackbarType,
} from '@/components/DinamicSnackbar';
import { InputsContent } from '@/components/Templates/styles';

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

  const handleRegister = async () => {
    const userNameBasedOnFullName = fullName.split(' ')[0];
    try {
      setLoading(true);
      await fetchRegister({
        userName: userNameBasedOnFullName + '_user',
        fullName,
        email,
        password,
        bakeryName,
      });
      setResponseStatusMessage('success');
      setTimeout(() => {
        router.replace('/login');
      }, 1500);
    } catch (e) {
      console.error(e);
      setResponseStatusMessage('error');
    } finally {
      setLoading(false);
      setShowResponseStatus(true);
    }
  };

  return (
    <AuthTemplate subtitle="Cadastre-se e faça parte da nossa comunidade!">
      <InputsContent>
        <InputItens
          requiredField
          inputMode="text"
          theme={primaryTheme}
          placeholder="Nome"
          title="Insira seu nome"
          keyboardType="default"
          onChangeText={setFullName}
          value={fullName}
        />
        <InputItens
          requiredField
          inputMode="text"
          theme={primaryTheme}
          placeholder="Nome da Confeitaria"
          title="Insira o nome da confeitaria"
          keyboardType="default"
          onChangeText={setBakeryName}
          value={bakeryName}
        />
        <InputItens
          requiredField
          inputMode="email"
          theme={primaryTheme}
          placeholder="E-mail"
          title="Insira seu email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <InputItens
          requiredField
          inputMode="text"
          theme={primaryTheme}
          placeholder="Senha"
          title="Cadastre sua senha"
          keyboardType="default"
          securityRequired
          onChangeText={setPassword}
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
