import { Modal, Box, CardMedia, IconButton, Fade, Backdrop } from '@mui/material';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  // Extract video ID if it's a YouTube URL (simple regex)
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('embed')) return url;

    // Handle standard youtube.com/watch?v=ID and youtu.be/ID
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&rel=0` : url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1024px', // max-w-5xl equivalent
    bgcolor: 'black',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: 24,
    borderRadius: '12px', // rounded-xl
    overflow: 'hidden',
    outline: 'none',
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
            backdropFilter: 'blur(8px)', // backdrop-blur-md equivalent
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // bg-black/60
          },
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s',
            }}
          >
            <X size={24} />
          </IconButton>

          {/* 16:9 Aspect Ratio Container for CardMedia */}
          <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
            {embedUrl ? (
              <CardMedia
                component="iframe"
                src={embedUrl}
                title="Project Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            ) : (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <p>No video URL provided</p>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
