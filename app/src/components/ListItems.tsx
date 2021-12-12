import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

export default class ListItems extends React.Component {
    state = {
        activities: []
    }


    componentDidMount() {
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoic3lsdmllQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MzkzNDk3NjEsImV4cCI6MTYzOTM1MDM2MX0.47j0aTBYpuRnvG-1xwKaXj08lP2E--TmV2YeRFAGb7oPRV_v_bX9oRDFIU5aq6tCizMm26KcgobPOep5TnQ4wA` }
        };
        axios.get(`https://sportmate-develop.herokuapp.com/api/activity/all`, config)
            .then(res => {
                console.log(res.data)
                const activities = res.data;
                console.log(activities)
                this.setState({ activities });
            })
    }

    // const list = [
    //     {
    //         name: 'Amy Farha',
    //         subtitle: 'Vice President'
    //     },
    //     {
    //         name: 'Chris Jackson',
    //         subtitle: 'Vice Chairman'
    //     },
    // ];

    render() {
        const {
            activities
        } = this.state;

        return (
            <View>
                {
                    activities.map((item, i) => (
                        <ListItem style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                            key={i}
                            bottomDivider
                            chevron
                            Component={TouchableScale}
                            friction={90} //
                            tension={100} // These props are passed to the parent component (here TouchableScale)
                            activeScale={0.95} //
                            linearGradientProps={{
                                colors: ['#FF9800', '#F44336'],
                                start: { x: 1, y: 0 },
                                end: { x: 0.2, y: 0 },
                            }}
                            ViewComponent={LinearGradient} // Only if no expo
                        >
                            <ListItem.Content>
                                <ListItem.Title>{item.activityName}</ListItem.Title>
                                <ListItem.Subtitle>{item.sport} niveau {item.activityLevel}</ListItem.Subtitle>
                                <ListItem.Subtitle>Le {item.activityDate}</ListItem.Subtitle>
                                <ListItem.Subtitle>A {item.address}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>)
    };
}