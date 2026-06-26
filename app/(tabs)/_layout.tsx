import { Tabs } from 'expo-router';
import { TabBarPersonnalisee } from '../../components/ui/navigation/TabBarPersonnalisee';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBarPersonnalisee {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="programme"
        options={{
          title: 'Programme',
          tabBarLabel: 'Programme',
        }}
      />
      <Tabs.Screen
        name="activites"
        options={{
          title: 'Activités',
          tabBarLabel: 'Activités',
        }}
      />
      <Tabs.Screen
        name="carte"
        options={{
          title: 'Carte',
          tabBarLabel: 'Carte',
        }}
      />
      <Tabs.Screen
        name="infos"
        options={{
          title: 'Infos',
          tabBarLabel: 'Infos',
        }}
      />
    </Tabs>
  );
}
