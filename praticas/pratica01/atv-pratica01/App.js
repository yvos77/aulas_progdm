import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DespesasContextProvider from './store/despesas-context';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';

import IconButton from './components/IconButton'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="DespesasRecentes" 
        component={DespesasRecentes} 

        options={({ navigation }) => ({
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
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
    <DespesasContextProvider>
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
            options={{ title: 'Adicionar Despesa' }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </DespesasContextProvider>
  );
}