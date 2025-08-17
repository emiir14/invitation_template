// Datos mock para la invitación de boda

export const weddingData = {
  couple: {
    bride: "Sofi",
    groom: "Criss"
  },
  date: {
    raw: new Date(2026, 3, 15), // 15 de abril, 2026
    formatted: "15 de Abril, 2026",
    day: "Sábado"
  },
  venue: {
    name: "Por anunciar",
    address: "Detalles de ubicación próximamente"
  }
};

export const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    alt: "Foto romántica de pareja",
    caption: "El día de nuestro compromiso",
    description: "Esta foto fue tomada el día que nos comprometimos. Estábamos en nuestro lugar favorito, el parque donde tuvimos nuestra primera cita. El momento fue mágico y lleno de amor."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    alt: "Anillos de boda",
    caption: "El comienzo del para siempre",
    description: "Nuestros anillos de compromiso representan la promesa eterna de amor y compromiso. Fueron diseñados especialmente para nosotros con detalles que simbolizan nuestra historia juntos."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    alt: "Flores de boda",
    caption: "Amor en flor",
    description: "Las flores que elegimos para nuestra boda tienen un significado especial. Las rosas representan el amor eterno, y las peonías simbolizan el honor y la riqueza en el matrimonio."
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    alt: "Lugar de la boda",
    caption: "Donde los sueños se hacen realidad",
    description: "Aunque aún no hemos revelado el lugar exacto, este será el escenario perfecto para celebrar nuestro amor rodeados de familiares y amigos más queridos."
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    alt: "Pastel de boda",
    caption: "Momentos dulces",
    description: "Nuestro pastel de boda será una obra de arte culinaria, diseñada para reflejar nuestro amor y personalidad. Cada capa tiene un sabor especial que representa una etapa de nuestra relación."
  },
  {
    id: 6,
    url: "https://assets.mixkit.co/videos/preview/mixkit-couple-dancing-in-nature-4564-large.mp4",
    alt: "Baile de pareja",
    caption: "Bailando juntos por la vida",
    description: "Este video captura la esencia de nuestra relación. Bailar juntos es una de nuestras actividades favoritas, y simboliza cómo nos movemos en armonía por la vida.",
    type: "video"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
    alt: "Baile de boda",
    caption: "Nuestro primer baile",
    description: "Esta imagen representa nuestro primer baile como pareja comprometida. Será un momento mágico que recordaremos para siempre, rodeados del amor de nuestros seres queridos."
  }
];

export const rsvpResponses = [
  {
    id: 1,
    name: "María Santos",
    attending: true,
    comment: "¡Muy emocionada de celebrar con ustedes dos!"
  },
  {
    id: 2,
    name: "Juan Pérez",
    attending: true,
    comment: "¡No me lo perdería por nada del mundo!"
  },
  {
    id: 3,
    name: "Ana García",
    attending: false,
    comment: "Ojalá pudiera estar ahí. ¡Envío mi amor!"
  }
];