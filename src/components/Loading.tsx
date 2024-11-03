import { Box, LinearProgress, Typography } from "@mui/material/";

const Loading: React.FC = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h5">Загрузка</Typography>
      <LinearProgress sx={{ marginTop: 1 }} />
    </Box>
  );
};

export default Loading;
