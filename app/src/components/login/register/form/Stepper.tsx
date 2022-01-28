import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { Buttontext, PrimaryButton, WrappedView } from '../../../../../assets/styles/styles';
import Form from '../../form/Form';
import FormRegister from './FormRegister';

// const PAGES = ["Auth", "User", "Hoobies", "Sport"];
const labels = ["Identification", "Données personnelles", "Centres d'intêret", "Sport"];


const secondIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 11,
    currentStepLabelColor: '#fe7013'
};



const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
}: {
    position: number;
    stepStatus: string;
}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 15,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'vpn-key';
            break;
        }
        case 1: {
            iconConfig.name = 'person';
            break;
        }
        case 2: {
            iconConfig.name = 'theater-comedy';
            break;
        }
        case 3: {
            iconConfig.name = 'fitness-center';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};


export default function Stepper({setTitle}) {
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const stepCount = 4
    // const onStepPress = (position: number) => {
    //     setCurrentPage(position);
    // };

    const renderViewPagerPage = (pageNumber: any) => {
        switch (pageNumber) {
            case 0: {
                return (
                    <FormRegister/>
                );
            }
            case 1: {
                return (
                    <Form/>
                );
            }
            case 2: {
                return (
                    <Form/>
                );
            }
            case 3: {
                return (
                    <FormRegister/>
                );
            }
            default: {
                break;
            }
        }
    };

    const findCurrentTitle = (pageNumber: number) => {
        switch (pageNumber) {
            case 0: {
                return (
                    "Données personnelles"
                );
            }
            case 1: {
                return (
                   "Centres d'intêrets"
                );
            }
            case 2: {
                return (
                    "Sport pratiqués"
                );
            }
            default: {
                break;
            }
        }
    };

    const incrementPage = (data: any) => {
        setCurrentPage(currentPage + 1);
        setTitle(findCurrentTitle(currentPage));
    };

    const renderStepIndicator = (params: any) => (
        <MaterialIcons {...getStepIndicatorIconConfig(params)} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={secondIndicatorStyles}
                    currentPosition={currentPage}
                    // onPress={onStepPress}
                    // renderLabel={renderLabel}
                    renderStepIndicator={renderStepIndicator}
                    labels={labels}
                    stepCount={stepCount}
                />

            </View>
            {renderViewPagerPage(currentPage)}
            <WrappedView style={styles.stepIndicator}>
                <PrimaryButton onPress={() => incrementPage(currentPage + 1)} style={styles.button}>
                    <Buttontext on>Suivant</Buttontext>
                </PrimaryButton>
            </WrappedView>
        </View>
    );
}

const styles = StyleSheet.create({

    button: {
        marginTop: 16,
    },
    container: {
        flex: 1
    },
    stepIndicator: {
        marginVertical: 50,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
