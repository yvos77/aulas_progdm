import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Importando as Telas
import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';

// 1. IMPORTANDO O NOSSO NOVO BOTÃO:
import IconButton from './components/IconButton'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="DespesasRecentes" 
        component={DespesasRecentes} 
        // 2. Transforma o 'options' em função para acessar o 'navigation'
        options={({ navigation }) => ({
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          // 3. Adiciona o botão no topo à direita e configura o clique (onPress)
          headerRight: () => (
            <IconButton 
              icon="add" 
              size={24} 
              color="black" 
              onPress={() => navigation.navigate('GerenciarDespesa')} 
            />
          ),
        })}
      />
      <Tab.Screen 
        name="TodasDespesas" 
        component={TodasDespesas} 
        options={({ navigation }) => ({
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerRight: () => (
            <IconButton 
              icon="add" 
              size={24} 
              color="black" 
              onPress={() => navigation.navigate('GerenciarDespesa')} 
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen 
          name="Despesas" 
          component={BottomTabScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="GerenciarDespesa" 
          component={GerenciarDespesa}
          // Se quiser, pode colocar um título bonitinho na tela que vai abrir:
          options={{
            title: 'Adicionar Despesa' 
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}