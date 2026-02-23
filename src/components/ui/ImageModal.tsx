import { Modal, Box, IconButton, Fade, Backdrop } from '@mui/material';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export const ImageModal = ({ isOpen, onClose, images, currentIndex, onIndexChange }: ImageModalProps) => {
  const imageUrl = images[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1200px', // Larger max width for images
    maxHeight: '90vh',
    bgcolor: 'black',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: 24,
    borderRadius: '12px',
    overflow: 'hidden',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker background for images
          },
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {/* Controls Container (Top Right) */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              display: 'flex',
              gap: 1,
            }}
          >
            {/* Prev Button */}
            <IconButton
              onClick={handlePrev}
              disabled={currentIndex === 0}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.1)',
                },
                '&.Mui-disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.2s',
              }}
            >
              <ChevronLeft size={24} />
            </IconButton>

            {/* Next Button */}
            <IconButton
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.1)',
                },
                '&.Mui-disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.2s',
              }}
            >
              <ChevronRight size={24} />
            </IconButton>

            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.1)',
                  color: '#FF4D4D', // Red on hover for close
                },
                transition: 'all 0.2s',
              }}
            >
              <X size={24} />
            </IconButton>
          </Box>

          {/* Image Container */}
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Project Full View"
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <p>No image provided</p>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
