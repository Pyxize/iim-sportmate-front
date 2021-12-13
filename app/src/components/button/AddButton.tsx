import * as React from 'react';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import {Colors} from '../../../assets/styles/colors'

 const AddButton = () => (
     <Icon
         name="plus-circle"
         size={45} 
         color={Colors.primary}
     >
     </Icon>
 );

 export default AddButton; 