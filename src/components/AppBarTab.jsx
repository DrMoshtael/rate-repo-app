import { Pressable } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const AppBarTab = ({ path, children }) => (
  <Pressable>
    <Link to={path}>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        color="white"
        style={{ padding: 20 }}
      >
        {children}
      </Text>
    </Link>
  </Pressable>
);

export default AppBarTab;
