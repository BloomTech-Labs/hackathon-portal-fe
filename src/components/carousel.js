import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
   {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
         'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
   },
   {
      label: 'Bird',
      imgPath:
         'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
   },
   {
      label: 'Description: Bali, Indonesia',
      imgPath:
         'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
   }
];

function Carousel() {
   const theme = useTheme();
   const [activeStep, setActiveStep] = React.useState(0);

   const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
   };

   const handleStepChange = step => {
      setActiveStep(step);
   };

   return (
      <div className="root">
         <div square elevation={0} className="header">
            <Typography>{tutorialSteps[activeStep].label}</Typography>
         </div>

         <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            id="imageimage"
         >
            {tutorialSteps.map((step, index) => (
               <div key={step.label} className="imageContainer">
                  {Math.abs(activeStep - index) <= 2 ? (
                     <img
                        className="carouselImage"
                        src={step.imgPath}
                        alt={step.label}
                     />
                  ) : null}
               </div>
            ))}
         </AutoPlaySwipeableViews>

         <MobileStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
            id="tripledots"
            nextButton={
               <Button
                  id="button1"
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === 2}
               >
                  Next
                  {theme.direction === 'rtl' ? (
                     <KeyboardArrowLeft />
                  ) : (
                     <KeyboardArrowRight />
                  )}
               </Button>
            }
            backButton={
               <Button
                  id="button2"
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
               >
                  {theme.direction === 'rtl' ? (
                     <KeyboardArrowRight />
                  ) : (
                     <KeyboardArrowLeft />
                  )}
                  Back
               </Button>
            }
         />
      </div>
   );
}

export default Carousel;
