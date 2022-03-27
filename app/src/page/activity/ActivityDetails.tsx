import * as React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../assets/styles/colors';
import { PageTitle, SafeAreaWrapped, StyledContainer } from '../../../assets/styles/styles';


const ActivityDetails = ({route, navigation}) => {

    const { activity } = route.params

    console.log(activity);

    return (

        <SafeAreaView>            
        <LinearGradient style={styles.lineargradient} colors={['#F0BB8E', '#9494B7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <ScrollView>
                <SafeAreaWrapped>
                    <StyledContainer>
                    <PageTitle textColor={Colors.black}> {activity.activityName} </PageTitle>
                    <Text> { activity.sport } de niveau {activity.activityLevel} </Text>
                    <Text> Aura lieu le {activity.activityDate}, à { activity.address } </Text>
                    <Text> Description : </Text>
                    <Text> { activity.description } </Text>
                    <Text> Contact : { activity.contact } </Text>
                    </StyledContainer>
                </SafeAreaWrapped>
            </ScrollView>
        </LinearGradient>
    </SafeAreaView>
    )
}

export default ActivityDetails;

const styles = StyleSheet.create({
    lineargradient: {
        height: '100%'
    }
});