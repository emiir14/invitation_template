import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RSVPForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    attending: null,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAttendingChange = (value) => {
    setFormData({
      ...formData,
      attending: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Por favor ingresa tu nombre",
        variant: "destructive"
      });
      return;
    }

    if (formData.attending === null) {
      toast({
        title: "Por favor déjanos saber si vas a asistir",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit RSVP to backend
      const response = await axios.post(`${API}/rsvp`, {
        name: formData.name.trim(),
        attending: formData.attending,
        comment: formData.comment.trim() || null
      });

      if (response.status === 200) {
        // Success
        toast({
          title: "¡Confirmación Enviada!",
          description: `¡Gracias ${formData.name}! Hemos recibido tu respuesta.`,
        });
        
        // Reset form
        setFormData({
          name: '',
          attending: null,
          comment: ''
        });
      }
      
    } catch (error) {
      console.error('Error en envío de confirmación:', error);
      
      // Handle different error types
      if (error.response) {
        const errorMessage = error.response.data?.error || 'Error al enviar confirmación';
        toast({
          title: "Error en el Envío",
          description: errorMessage,
          variant: "destructive"
        });
      } else if (error.request) {
        toast({
          title: "Error de Conexión",
          description: "Por favor revisa tu conexión a internet e intenta nuevamente.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Ocurrió un error inesperado. Por favor intenta nuevamente.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Venís?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tu presencia haría que nuestro día sea aún más especial
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-rose-100">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-gray-800">Confirmación de Asistencia</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Tu Nombre *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu nombre completo"
                  className="border-gray-200 focus:border-rose-500 focus:ring-rose-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Attendance Selection */}
              <div className="space-y-4">
                <Label className="text-gray-700 font-medium">
                  ¿Vas a asistir? *
                </Label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="button"
                    onClick={() => handleAttendingChange(true)}
                    disabled={isSubmitting}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300 ${
                      formData.attending === true
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-gray-200 hover:border-rose-300 text-gray-700'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">✓</div>
                      <div className="font-medium">¡Sí, estaré ahí!</div>
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => handleAttendingChange(false)}
                    disabled={isSubmitting}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300 ${
                      formData.attending === false
                        ? 'border-gray-500 bg-gray-50 text-gray-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">✗</div>
                      <div className="font-medium">Lo siento, no podré ir</div>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Comment Field */}
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-gray-700 font-medium">
                  Comentarios Adicionales
                </Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Mensajes especiales, restricciones alimentarias, o preguntas..."
                  rows={4}
                  className="border-gray-200 focus:border-rose-500 focus:ring-rose-500 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send size={18} />
                      <span>Enviar Confirmación</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-sm">
            Por favor responde antes del <strong>15 de Marzo, 2026</strong>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Para preguntas, contáctanos en sofiandfede@wedding.com
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPForm;