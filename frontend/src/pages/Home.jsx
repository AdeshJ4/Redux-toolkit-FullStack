import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h3" component="h1">
          Home Page
        </Typography>
        <Typography variant="h6" component="p" color="textSecondary" align="center">
          Welcome to our awesome application! Explore the features and get started.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
