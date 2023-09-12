import express, { Router, Application } from 'express';

const FourOFourRouter: Router = express.Router();

FourOFourRouter.use((req, res) => {
  res.status(404).json({
    data: {
      message: "We can't find what you are looking for",
    },
  });
});

export default FourOFourRouter;
