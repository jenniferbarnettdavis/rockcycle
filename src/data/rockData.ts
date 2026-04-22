import { QuizQuestion, RealWorldExample } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which energy source primarily drives the weathering and erosion of rocks on Earth's surface?",
    options: ["Earth's internal heat", "Energy from the Sun", "Geothermal vents", "Magnetic fields"],
    correctAnswer: 1,
    explanation: "Energy from the Sun drives the water cycle and weather patterns (wind, rain, ice), which break down rocks into sediment."
  },
  {
    id: 2,
    question: "What form of energy is responsible for melting rocks deep underground into magma?",
    options: [
      "Solar radiation",
      "Friction from wind",
      "Earth's internal heat",
      "Gravitational pull of the moon"
    ],
    correctAnswer: 2,
    explanation: "Earth's internal heat (from its core and radioactive decay) drives the melting of rocks and mantle convection."
  },
  {
    id: 3,
    question: "How does gravity contribute to the rock cycle?",
    options: [
      "It melts rocks by pulling them closer to the sun",
      "It pulls weathering agents like water downhill and settles sediment",
      "It turns magma into igneous rock instantly",
      "It reflects solar energy back into space"
    ],
    correctAnswer: 1,
    explanation: "Gravity forces water to flow downhill (driving erosion) and causes sediments to settle out of water to form sedimentary layers."
  },
  {
    id: 4,
    question: "Which type of rock requires BOTH extreme internal heat and pressure to form?",
    options: [
      "Igneous Rocks",
      "Sedimentary Rocks",
      "Metamorphic Rocks",
      "Meteorites"
    ],
    correctAnswer: 2,
    explanation: "Metamorphic rocks are formed when existing rocks are squeezed and heated deep within the Earth without fully melting."
  },
  {
    id: 5,
    question: "If solar energy was completely blocked from Earth, which rock cycle process would slow down the most?",
    options: [
      "Volcanic eruptions",
      "Weathering and erosion",
      "Mantle convection",
      "Formation of metamorphic rocks"
    ],
    correctAnswer: 1,
    explanation: "Without the Sun's energy, the water cycle would stop. There would be no rain, flowing rivers, or wind to erode existing rocks into sediment."
  }
];

export const ROCK_STATE_IMAGES: Record<string, string> = {
  'Igneous Rock': 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Basalt_12_%2848674276333%29.jpg',
  'Sedimentary Rock': 'https://upload.wikimedia.org/wikipedia/commons/2/24/Channel-StellartonFm-CoalburnPit.JPG',
  'Metamorphic Rock': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Quartzite.jpg',
  'Magma': 'https://upload.wikimedia.org/wikipedia/commons/0/04/001_Volcano_eruption_of_Litli-Hr%C3%BAtur_in_Iceland_in_2023_Photo_by_Giles_Laurent.jpg',
  'Sediment': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Libya_4608_Idehan_Ubari_Dunes_Luca_Galuzzi_2007.jpg'
};

export const REAL_WORLD_EXAMPLES: RealWorldExample[] = [
  {
    id: 'granite',
    name: 'Granite',
    type: 'Igneous',
    description: 'Found in many mountains and often used for buildings. Notice the large crystals that formed as it cooled slowly deep underground, insulated by the earth crust.',
    energySource: "Driven by Earth's Internal Heat (Melting) & Heat Loss (Cooling)",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Bianco_Sardo_Granit_mit_polierter_Oberfl%C3%A4che.jpg'
  },
  {
    id: 'sandstone',
    name: 'Antelope Canyon Sandstone',
    type: 'Sedimentary',
    description: 'Made of tiny sand grains glued together over millions of years. Look at the smooth, wavy walls carved rapidly by flash floods.',
    energySource: "Driven by Solar Energy (Wind/Water weathering) & Gravity",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/USA_Antelope-Canyon.jpg'
  },
  {
    id: 'marble',
    name: 'Marble',
    type: 'Metamorphic',
    description: 'When limestone is pressed and cooked deep underground, it turns into marble. Prized by sculptors for its smooth, workable texture.',
    energySource: "Driven by Earth's Internal Heat & Extreme Tectonic Pressure",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Marmo_z17.JPG'
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    type: 'Igneous',
    description: 'A black, glassy rock formed when lava from a volcano cools extremely fast above ground, leaving no time for crystals to grow.',
    energySource: "Driven by Earth's Internal Heat (Eruption) & Rapid Heat Loss to Atmosphere",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Lipari-Obsidienne_%285%29.jpg'
  },
  {
    id: 'limestone',
    name: 'Limestone Caves',
    type: 'Sedimentary',
    description: 'Forms from the shells and skeletons of tiny sea creatures settling at the bottom of ancient oceans. Rainwater slowly dissolves it to form caves.',
    energySource: "Driven by Gravity (Sediment settling) & Solar Energy (Life/Water)",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/ElTorcal0408.jpg'
  },
  {
    id: 'slate',
    name: 'Slate',
    type: 'Metamorphic',
    description: 'Created when soft mud-rock (shale) is squeezed hard between colliding tectonic plates. It breaks into perfect flat sheets.',
    energySource: "Driven by Earth's Internal Heat & Tectonic Plate Pressure",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Slate_%28Knife_Lake_Formation%2C_metamorphism_at_2.7_Ga%2C_Neoarchean%3B_Rt._135_roadcut%2C_Gilbert%2C_Minnesota%2C_USA%29_3_%2823140002749%29.jpg'
  }
];
