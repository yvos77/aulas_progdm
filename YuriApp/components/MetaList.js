import { StyleSheet, Text, ScrollView, Pressable, View } from "react-native";

function MetaList(props) {

    return (
    <ScrollView >
        {props.array.map((meta) => {
            return (
                <View key={meta.id}>
                <Pressable
                android_ripple={{color: 'yellow'}}
                key={meta.id}
                onPress={()=> props.onDeleteItem(meta.id)}
                >
                <Text 
                style={{padding: 8}}>{meta.texto}</Text>
                </Pressable>
                </View>
            )

            }
             )}
        </ScrollView>
    );
};

export default MetaList;

const styles = StyleSheet.create({
    item: {
        margin: 8,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'lightblue',
        borderWidth: 1,
    }
})