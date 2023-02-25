import { useMediaQuery, useTheme } from "@mui/material";

const useScreenQuery = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return { isSmallScreen };
};

export default useScreenQuery;
