import { Box, Typography } from "@mui/material";

const ErrorMessage: React.FC = () => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h5">
        Что-то пошло не так, не получилось загрузить данные о погоде
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
