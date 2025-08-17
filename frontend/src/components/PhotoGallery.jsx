import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { galleryImages } from '../mock';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const videoRefs = useRef({});
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Auto play videos when in view
  useEffect(() => {
    galleryImages.forEach((item, index) => {
      if (item.type === 'video') {
        const video = videoRefs.current[index];
        if (video) {
          if (inView) {
            video.play().catch(console.log);
          } else {
            video.pause();
          }
        }
      }
    });
  }, [inView]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setShowDescription(false);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setShowDescription(false);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
    setShowDescription(false);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
    setShowDescription(false);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-rose-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Nuestra Galería
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturando los hermosos momentos de nuestro viaje juntos
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer overflow-hidden rounded-xl shadow-lg relative"
              onClick={() => openLightbox(image, index)}
            >
              <div className="relative aspect-square overflow-hidden">
                {image.type === 'video' ? (
                  <video
                    ref={(el) => videoRefs.current[index] = el}
                    src={image.url}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                )}
                
                {/* Play button overlay for videos */}
                {image.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="bg-white/90 rounded-full p-3">
                      <Play className="w-6 h-6 text-rose-600" />
                    </div>
                  </div>
                )}

                {/* Caption overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium text-sm md:text-base">{image.caption}</p>
                  </div>
                </div>

                {/* Info icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-rose-600 text-sm">ℹ</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Media Content */}
                <div className="relative">
                  {selectedImage.type === 'video' ? (
                    <video
                      src={selectedImage.url}
                      className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                      controls
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.alt}
                      className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                    />
                  )}
                </div>
                
                {/* Close button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Info button */}
                <button
                  onClick={toggleDescription}
                  className="absolute bottom-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <span className="text-lg">ℹ</span>
                </button>

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-16">
                  <div className="bg-black/70 rounded-lg px-4 py-2">
                    <p className="text-white text-lg font-medium mb-1">
                      {selectedImage.caption}
                    </p>
                    <AnimatePresence>
                      {showDescription && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/90 text-sm leading-relaxed mt-2">
                            {selectedImage.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoGallery;