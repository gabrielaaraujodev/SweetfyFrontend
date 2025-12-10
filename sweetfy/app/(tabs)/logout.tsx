import { useAuth } from '../../context/AuthContext';

export default function Logout() {
  const { signOut } = useAuth(); // implementar modal de confirmação aqui
  return signOut();
}
