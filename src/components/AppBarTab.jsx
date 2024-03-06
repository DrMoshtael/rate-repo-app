import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({children}) => (
    <Pressable>
        <Text 
          fontSize='subheading' 
          fontWeight='bold' 
          color='white'
          style={{ padding: 20 }}>
            {children}</Text>
    </Pressable>
);

export default AppBarTab;